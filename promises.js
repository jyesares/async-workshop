'use strict';

const fs = require('fs');

function uploadFolder(source) {
	return new Promise((resolve, reject) => {

		if (arguments.length === 0) reject('No arguments')

		fs.readdir(source, function (err, files) {
			if (err) {
				reject('Error finding files: ' + err)
			} else {
				uploadFile(source, files)
					.then(resolve)
					.catch(reject)
			}
		})
	})
}

function uploadFile(source, files) {
	return new Promise((resolve, reject) => {
		let fileQueue = [];

		if (arguments.length === 0) reject('No arguments')

		files.forEach(function (filename, fileIndex) {
			const filePath = source + '/' + filename
			// Uploading the file
			fileQueue.push(filePath)
			fs.readFile(filePath, function (err, data) {
				if (err) {
					reject('Error reading file: ' + err)
				} else {
					uploadFileContents(fileQueue, filePath, files)
						.then(resolve)
						.catch(reject)
				}
			})
		})
	})
}

function uploadFileContents(fileQueue, filePath, files) {
	return new Promise((resolve, reject) => {

		if (arguments.length === 0) reject('No arguments')

		// Simulating file upload
		setTimeout(() => {
			fileQueue.splice(fileQueue.indexOf(filePath), 1);
			if (fileQueue.length === 0) {
				resolve(files.length)
			} 
		}, 1000)

	})
}

module.exports = {
	uploadFolder,
	uploadFile,
	uploadFileContents
}