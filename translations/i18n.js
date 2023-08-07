const path = require("path");

const {	ipcRenderer, remote } = require('electron');
const fs = require('fs');
let loadedLanguage;

var locaLangCode = ipcRenderer.sendSync('langCodeCache');

module.exports = i18n;

function i18n() {
if(fs.existsSync(path.join(__dirname, 'lang/' + locaLangCode + '.js'))) {
loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang/' + locaLangCode + '.js'), 'utf8'))
}
else {
loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'lang/en.js'), 'utf8'))
}
}

i18n.prototype.__ = function(phrase) {
let translation = loadedLanguage[phrase]
if(translation === undefined) {
translation = phrase
}
return translation
}