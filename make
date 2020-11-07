#!/bin/node
const prefixPath = 'template/';
const inputs = ['index.html', 'sw.js', 'site.webmanifest'];
const configPath = 'relPath';
const fs = require('fs');

let relPath = fs.readFileSync(configPath).toString().trim();

/* Replacing ${relPath} */
for(const i in inputs) {
	let content = fs.readFileSync(prefixPath+inputs[i]).toString();
	content = content.replace(/\$\{relPath\}/g, relPath);
	fs.writeFileSync(inputs[i], content);
	console.log(`'${inputs[i]}' made successfully.`);
}

/* Copy 'back.jpg' to '/' */
fs.copyFile('app/back.jpg', 'back.jpg', err => {
	if(err) throw err;
	console.log("'back.jpg' copied.");
});
