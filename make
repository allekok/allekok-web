#!/bin/node
const prefixPath = 'template/'
const inputs = ['index.html', 'sw.js', 'site.webmanifest']
const configPath = 'relPath'
const fs = require('fs')

const relPath = fs.readFileSync(configPath).toString().trim()

/* Replacing ${relPath} */
for(const i in inputs) {
	const content = fs.readFileSync(prefixPath + inputs[i]).
	      toString().replace(/\$\{relPath\}/g, relPath)
	fs.writeFileSync(inputs[i], content)
	console.log(`'${inputs[i]}' made successfully.`)
}

/* Copy 'back.png' to '/' */
fs.copyFile('app/back.png', 'back.png', err => {
	if(err)
		throw err
	console.log("'back.png' copied.")
})
