const fs = require('fs')
let ReadDir = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, { withFileTypes: true, encoding: "utf8" }, (err, FODList) => {
            if (err) {
                console.log("error in dirctory read");
            }
            else {
                let files = [], dirs = [];
                FODList.forEach((fod, index) => {
                    if (fod.name.includes("."))
                        files.push(fod)
                    else
                        dirs.push(fod)
                })
                resolve([...dirs,...files])
            }
        })
    })
}

let isDirectory = (path) => {
    return fs.lstatSync(path).isDirectory()
}

let rp = "X:/Music 2020/"
let list = []
let sublist = []
function dirCycle(path, currentDir) {
    ReadDir(path).then((FODList) => {
        debugger;
        if (!FODList.length) {
            console.log(list, "LIST");
        }
        FODList.forEach((fod, index) => {
            console.log(fod.name);
            let childPath = path + fod.name
            if (isDirectory(childPath)) {
                console.log(childPath);
                dirCycle(childPath + "/", fod.name)
            }
            else {
                console.log(fod.name);
                sublist.push(fod.name)
                if (index == FODList.length - 1) {
                    list.push({
                        title: currentDir,
                        content: [...sublist]
                    })
                    sublist = []
                    console.log(list, "23213");
                    fs.writeFileSync('./music.json',JSON.stringify(list))
                }

            }
        });

    })
}



dirCycle(rp, "root")
