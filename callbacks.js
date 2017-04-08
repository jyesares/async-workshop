'use strict';

const fs = require('fs');

function uploadFolder(source, cb) {
  fs.readdir(source, function (err, files) {
    if (err) {
      cb('Error finding files: ' + err)
    } else {
      uploadFile(source, files, cb)
    }
  })
}

function uploadFile(source, files, cb) {
  let fileQueue = [];

  files.forEach(function (filename, fileIndex) {
    const filePath = source + '/' + filename
    // Uploading the file
    fileQueue.push(filePath)
    fs.readFile(filePath, function (err, data) {
      if (err) {
        console.log('Error reading file: ' + err)
      } else {
        uploadFileContents(fileQueue, filePath, files, cb)
      }
    })
  })
}

function uploadFileContents(fileQueue, filePath, files, cb) {
  // Simulating file upload
  setTimeout(() => {
    fileQueue.splice(fileQueue.indexOf(filePath), 1);
    if (fileQueue.length === 0) {
      cb(null, files.length)
    }
  }, 1000)
}

module.exports = {
  uploadFolder,
  uploadFile,
  uploadFileContents
}