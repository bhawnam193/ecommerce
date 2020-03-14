//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'uploads/products');
const sharp = require('sharp');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function(err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function(file) {
        // Do whatever you want to do with the file

        if (file.indexOf('.png') !== -1) {
            console.log(directoryPath + '/' + file);
            sharp(directoryPath + '/' + file).resize(250, 300)
                .toFile(directoryPath + '/' + file.split('.')[0] + '.webp', (err, info) => { console.log(info);
                    console.log(err) });
        }
    });
});