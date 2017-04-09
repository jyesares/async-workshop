'use strict';

const fsp = require('fs-promise');

function uploadFolder(source) {
	return fsp.readdir(source)
		.then(files => {
			return uploadFile(source, files)
		})
		.catch(err => { return err })
}

function uploadFile(source, files) {

	if(arguments.length === 0) return Promise.reject('No parameters passed')

	let arrayPromises = []
	files.forEach((filename, fileIndex) => {
		const filePath = [source, '/', filename].join('')
		arrayPromises.push(uploadFileContents(filePath))
	})

	return Promise.all(arrayPromises)
		.then(value => {
			return value.reduce((acc, val) => { return acc + val }, 0)
		})
		.then(value => Promise.resolve(value))
}

function uploadFileContents(filePath) {
	return new Promise((resolve, reject) => {
		// Simulating file upload
		setTimeout(() => {
			resolve(1)
		}, 1000)
	})
}

module.exports = {
	uploadFolder,
	uploadFile,
	uploadFileContents
}