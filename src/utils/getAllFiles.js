const fs = require('fs');
const path = require('path');
module.exports = (directory, folders = false) => {
    let fileNames = [];

    const files = fs.readdirSync(directory, { withFileTypes: true});

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        // check if its a file or a folder
        if (folders) {
            if(file.isDirectory()) {
                fileNames.push(filePath);
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }

    return fileNames;
}