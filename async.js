'use strict';

const fsp = require('fs-promise');

async function uploadFolder(source) {

	let res = await fsp.readdir(source)
		.then(async files => {
			return await uploadFile(source, files)
		})
		.catch(err => { return err })

	return res
}

async function uploadFile(source, files) {

	if (arguments.length === 0) return Promise.reject('No parameters passed')

	let sum = 0
	await Promise.all(files.map(async filename => {
		const filePath = [source, '/', filename].join('')
		await uploadFileContents(filePath).then(value => {
			sum += value
		})
	}))
	return sum
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