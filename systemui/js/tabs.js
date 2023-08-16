const { BrowserView, BrowserWindow, ipcMain, Menu, dialog, session, app } = require('@electron/remote');
const remote = require('@electron/remote');

const { contextBridge, ipcRenderer } = require('electron');
const shell = require('electron').shell;

const { resolve, basename, parse, extname  } = require('path');
const { promises, existsSync } = require('fs');
const fsss = require('fs') ;

const parseCrx = require('./module/crx');
const extractZip = require('./module/zip');

const win = remote.getCurrentWindow(); // Grabs the BLOCK window

const { v1 } = require('uuid'); // Şifrele Method 1
//const base64KeysTo = require('./base64.min.js'); // Şifrele Method 2

var i18n = new(require('./../../translations/i18n-ex'));

if(store.get('--incognitotab') == '--incognitotab'){
var newtabBased = 'incognito-new-tab';
} else {
var newtabBased = 'new-tab';
}

let oppayancar = "";
if(store.get('settings.generalViews') == "OPERA"){ 
oppayancar = '-opera';
}

let windowxview = 0;
let windowxviewW = 0;
let cachetabid = 0;
let cachetabview;


if(store.get('settings.leftbarmenu')){
windowxview = store.get('settings.leftbarmenuSize');
windowxviewW = -store.get('settings.leftbarmenuSize');
}

let opraidus = 0; let opraidusalt = 0;
if(store.get('settings.generalViews') == "OPERA"){
opraidus = -8; opraidusalt = -6

if(!store.get('settings.leftbarmenu')){
opraidus = 0; opraidusalt = 0;
}


win.on("resized", function () {
if(cachetabview){
cachetabview.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW+opraidus, height:win.getContentBounds().height - topbarHeight+opraidusalt});
}
});

win.on("moved", function () {
if(cachetabview){
cachetabview.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW+opraidus, height:win.getContentBounds().height - topbarHeight+opraidusalt});
}
});

win.on("maximize", function () {
if(cachetabview){
cachetabview.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW+opraidus, height:win.getContentBounds().height - topbarHeight+opraidusalt});
}
});

win.on("unmaximize", function () {
if(cachetabview){
cachetabview.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW+opraidus, height:win.getContentBounds().height - topbarHeight+opraidusalt});
}
});

win.on("restore", function () {
if(cachetabview){
cachetabview.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW+opraidus, height:win.getContentBounds().height - topbarHeight+opraidusalt});
}
});
}



// INITIALIZE LOCAL SCRIPTS:
const web = require('./web'); // Used for managing webpage loading and websites
const storage = require('./store'); // Manages bookmark and history storage

const { join } = require('path'); // Helps create full paths to local files

//const fs = require('fs');
const tabs = require('./tabs.js');



function realNowtopbarHeight() {
if(store.get('settings.leftbarmenu')){
windowxview = store.get('settings.leftbarmenuSize'); 
windowxviewW = -store.get('settings.leftbarmenuSize');
} else {
windowxview = 0;
windowxviewW = 0;
}

let topBarOlcus = 0;
if(store.get('settings.topbarHeight')){ topBarOlcus = store.get('settings.topbarHeight'); }
return topBarOlcus;
}

let topbarHeight = realNowtopbarHeight();

let Sortable = require('sortablejs'); // Library for draggable/sortable elements
var el_ssort = document.getElementById("tabs");
new Sortable(el_ssort, {
sort: true, 
group: 'nested',
animation: 150,
fallbackOnBody: true,
swapThreshold: 0.65,
ghostClass: 'blue-background-class',
direction: 'horizontal',
filter: ".tab-pins",  // Selectors that do not lead to dragging (String or Function)
preventOnFilter: false, // Call `event.preventDefault()` when triggered `filter`
draggable: '.tab-drag',
});

var tabsgrops = document.getElementById("tabsgrops");
new Sortable(tabsgrops, {
sort: true,  // sorting inside list
group: 'nested',
//animation: 150,
fallbackOnBody: true,
swapThreshold: 0.65,
direction: 'horizontal',
filter: ".tab-pins",  // Selectors that do not lead to dragging (String or Function)
preventOnFilter: false, // Call `event.preventDefault()` when triggered `filter`
draggable: '.tab-drag',
});
var tabsgrops2 = document.getElementById("tabsgrops2");
new Sortable(tabsgrops2, {
sort: true,  // sorting inside list
group: 'nested',
animation: 150,
fallbackOnBody: true,
swapThreshold: 0.65,
direction: 'horizontal',
filter: ".tab-pins",  // Selectors that do not lead to dragging (String or Function)
preventOnFilter: false, // Call `event.preventDefault()` when triggered `filter`
draggable: '.tab-drag',
});
var tabsgrops3 = document.getElementById("tabsgrops3");
new Sortable(tabsgrops3, {
sort: true,  // sorting inside list
group: 'nested',
animation: 150,
fallbackOnBody: true,
swapThreshold: 0.65,
direction: 'horizontal',
filter: ".tab-pins",  // Selectors that do not lead to dragging (String or Function)
preventOnFilter: false, // Call `event.preventDefault()` when triggered `filter`
draggable: '.tab-drag',
});
var tabsgrops4 = document.getElementById("tabsgrops4");
new Sortable(tabsgrops4, {
sort: true,  // sorting inside list
group: 'nested',
animation: 150,
fallbackOnBody: true,
swapThreshold: 0.65,
direction: 'horizontal',
filter: ".tab-pins",  // Selectors that do not lead to dragging (String or Function)
preventOnFilter: false, // Call `event.preventDefault()` when triggered `filter`
draggable: '.tab-drag',
});


var el_ssort_pin = document.getElementById("npin-tab");
var sortablepin = new Sortable(el_ssort_pin, {
sort: true,  // sorting inside list
animation: 150,
ghostClass: 'blue-background-class',
direction: 'horizontal',
draggable: '.tab-pins',
});

var el_ssort_sidebar = document.getElementById("sidebarAdds");
var sortablesidebar = new Sortable(el_ssort_sidebar, {
sort: true,  // sorting inside list
animation: 150,
ghostClass: 'blue-background-class',
direction: 'vertical',
draggable: '.draggledsidebar',
});

exports.tabs = []; // Array of all open tabs
var closedTabs = []; // Array of previously closed tabs, used in the Reopen Closed Tab shortcut
var activeTab; // Currently selected tab
var downloadWindow; // Stores the downloads window globall

// Initialize the downloads window:
exports.initDownloads = async () => {
let win = remote.getCurrentWindow();
let topbasrhe = 90; //store.get('settings.topbarHeight');
downloadWindow = new BrowserWindow({
frame: false,
transparent: true,
resizable: false,
width: win.getContentBounds().width,
height: topbasrhe,
x: Math.ceil(window.screenX),
y: Math.ceil(window.screenY + win.getContentBounds().height - topbasrhe),
parent: remote.getCurrentWindow(),
show: false,
hasShadow: false,
webPreferences: {
nodeIntegration: true,
enableRemoteModule: true
,worldSafeExecuteJavaScript: true, contextIsolation: false
}
});

win.on("resize", function () {
downloadWindow.setBounds({width: win.getContentBounds().width, height:topbasrhe, x: Math.ceil(window.screenX), y: Math.ceil(window.screenY + win.getContentBounds().height - topbasrhe)});
});

win.on("move", function () {
downloadWindow.setBounds({width: win.getContentBounds().width, height:topbasrhe, x: Math.ceil(window.screenX), y: Math.ceil(window.screenY + win.getContentBounds().height - topbasrhe)});
});

downloadWindow.loadURL(require('url').format({
pathname: join(__dirname, '../../layout/pages/dialogs/download.html'),
protocol: 'file:',
slashes: true
}));

//downloadWindow.openDevTools({ mode: "detach" });
}

// Decide whether file should be viewer (pdf) or downloaded:
exports.handleDownload = async (event, item) => {

if(!store.get('setDowloandLoads')){
store.set('setDowloandLoads', true);
setTimeout(function(){ store.set('setDowloandLoads', false); }, 200);


//item.setSavePath(store.get('appGetPath'));
item.setSavePath(store.get('appGetPath')+'\\'+item.getFilename());
item.pause();
this.resumeOnLives = false;
this.downloadWindowShows = false;


let itemAddress = item.getURL();
/*
if(item.getMimeType() === 'application/pdf' && itemAddress.indexOf('blob:') !== 0 && itemAddress.indexOf('#pdfjs.action=download') === -1) {
event.preventDefault();
let query = '?file=' + encodeURIComponent(itemAddress);
this.current().webContents.loadURL(join(__dirname, '..', 'static', 'pdf', 'index.html') + query);
} else {}
*/
var savePath;

if(!this.downloadWindowShows){
if (store.get('settings.dowloadnAltPencere')) { downloadWindow.show(); }
this.downloadWindowShows = true;
}

//let id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
let id = v1();
downloadWindow.webContents.send('newDownload', id, item.getFilename(), itemAddress, item.getTotalBytes(), item.getMimeType());
storage.addDownloads(id, item.getFilename(), '', item.getURL(), item.getTotalBytes(), item.getMimeType(), 'wait');

item.on('updated', (event, state) => {
if(!this.resumeOnLives){ 
item.resume(); 
this.resumeOnLives = true; 
}


if (state === 'interrupted') { 
if (store.get('settings.dowloadnAltPencere')) { downloadWindow.webContents.send('stoppedDownload', id, state); }
} else if (state === 'progressing') { 
savePath = item.savePath;
if (item.isPaused()) {  
if (store.get('settings.dowloadnAltPencere')) { downloadWindow.webContents.send('stoppedDownload', id, 'paused'); }
} else {  
let percentage = (item.getReceivedBytes() / item.getTotalBytes()) * 100;
if (store.get('settings.dowloadnAltPencere')) { downloadWindow.webContents.send('updateDownload', id, percentage, item.getReceivedBytes(), item.getTotalBytes()); }
if(tabs.current().webContents.getURL() == 'block://downloads'){
tabs.current().webContents.send('updateDownload', id, percentage, item.getReceivedBytes(), item.getTotalBytes());
}
}
}


});

ipcMain.once('cancel-download-' + id, () => { 
item.cancel();  
storage.StatusDownloads(id, 'cancel-download');

/*
if (fs.existsSync(savePath)) {
fs.unlink(savePath, (err) => {
if (err) {
console.log("An error ocurred updating the file" + err.message);
console.log(err);
} else { console.log("File succesfully deleted"); }
});
} else {
console.log("This file doesn't exist, cannot delete");
}
*/

});

ipcMain.once('getCurrentWindowHides', () => { 
this.downloadWindowShows = false;
downloadWindow.reload();
downloadWindow.hide();
});


item.once('done', async (event, state) => {
if (state === 'completed') {
//console.log(savePath);
if (store.get('settings.dowloadnAltPencere')) { downloadWindow.webContents.send('completeDownload', id, savePath); }
storage.SavePathDownloads(id, savePath.replace(/\\/g, "/"));
storage.StatusDownloads(id, 'completed');
if(tabs.current().webContents.getURL() == 'block://downloads'){
tabs.current().webContents.send('completeDownload', id, savePath.replace(/\\/g, "/"));
}
this.resumeOnLives = false; 

/* CRX Install */
if (extname(item.getFilename()) === '.crx') {
if (store.get('settings.dowloadnAltPencere')) { downloadWindow.webContents.send('InstallCRX', id, savePath); }

const crxBuf = await promises.readFile(item.savePath);
const crxInfo = parseCrx(crxBuf);

if (!crxInfo.id) { crxInfo.id = makeId(32); }

const extensionsPath = remote.app.getPath('userData')+'/extensions';
const path = resolve(extensionsPath, crxInfo.id);
const manifestPath = resolve(path, 'manifest.json');

if (await fsss.existsSync(path)){
console.log('Extension is already installed');
if (store.get('settings.dowloadnAltPencere')) { downloadWindow.webContents.send('NotInstallCRX', id, savePath); }
return;
}

await extractZip(crxInfo.zip, path);
const extension = await session.defaultSession.loadExtension(path);

if (crxInfo.publicKey) {
const manifest = JSON.parse(
await promises.readFile(manifestPath, 'utf8'),
);

manifest.key = crxInfo.publicKey.toString('base64');
manifest.idkey = crxInfo.id;
manifest.idkeyprimary = extension.id;

await promises.writeFile(
manifestPath,
JSON.stringify(manifest, null, 2),
);
}

//window.send('load-browserAction', extension);
if (store.get('settings.dowloadnAltPencere')) { downloadWindow.webContents.send('CompleteInstallCRX', id, savePath); }
setTimeout(() => { ipcRenderer.send('loadextaks', cachetabid, path); }, 650);
}
/* CRX Install END */

} else {
if (store.get('settings.dowloadnAltPencere')) { downloadWindow.webContents.send('failedDownload', id); }
storage.StatusDownloads(id, 'failed');
if(tabs.current().webContents.getURL() == 'block://downloads'){
tabs.current().webContents.send('failedDownload', id);
}
this.resumeOnLives = false; 
}
});


}
}

// Opens a recently closed tab:
exports.openClosedTab = function () {
if(closedTabs.length == 0) return;
let item = closedTabs[closedTabs.length-1];
this.newView(item);

const index = closedTabs.indexOf(item);
if (index > -1) closedTabs.splice(index, 1);
}

// Returns the current tab:
exports.current = function () {
return activeTab;
}


// Initializes a view with bindings from web.js:
exports.initBrowserView = async (view) => {

view.webContents.on('did-start-loading', async () => { 
web.loadStart(view);
});

view.webContents.on('did-stop-loading', async () => { web.loadStop(view) });
view.webContents.on('did-fail-load', async (e, ec, ed, vu) => {web.failLoad(e, view, ec, ed, vu); });

view.webContents.on('enter-html-full-screen', async () => { 
web.enterFllscrn(view, remote.screen);
});

view.webContents.on('leave-html-full-screen', async () => {  
setTimeout(() => {
web.leaveFllscrn(view, win.getBounds().height) ;
}, 5);

});
view.webContents.on('dom-ready', async () => { web.domReady(view, storage) });

view.webContents.on('did-finish-load', () => {
//view.webContents.executeJavaScript(``);
});


/* eski sürüm
view.webContents.on('new-window', async (e, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
e.preventDefault();
if(disposition){
if(disposition == 'foreground-tab' || disposition == 'background-tab'){
this.newView(url);
//options.webContents.destroy();
} else {
if(disposition == 'new-window'){
}
}
}
});*/


view.webContents.setWindowOpenHandler((details) => {
if (details.disposition === 'new-window') { } 
else if (details.disposition === 'foreground-tab') {
//addtabs(details.url);
this.newView(details.url);
} else if (details.disposition === 'background-tab') {
//addtabs(details.url);
this.newView(details.url);
}
return { action: 'deny' }
});

view.webContents.on('did-create-window', async (window,details) => {
//console.log('did-create-window');
});

view.webContents.on('will-prevent-unload', async (e) => { 
//e.preventDefault();
var cacheurlsxx = store.get('cacheURLClicks');
const choice = dialog.showMessageBoxSync(win, {
type: 'question',
buttons: [i18n.__('Leave'), i18n.__('Stay')],   
title: i18n.__('Do you want to leave this site?'),
message: i18n.__('Changes you made may not be saved.'),
defaultId: 0,
cancelId: 1
})
const leave = (choice === 0)
if (leave) {
e.preventDefault();

setTimeout(() => {
view.webContents.forcefullyCrashRenderer();

setTimeout(() => {
if(cacheurlsxx){
view.webContents.loadURL(cacheurlsxx);
} else {
view.webContents.reload();
}
}, 120);
}, 50);

} else {
}
});




view.webContents.on('media-started-playing', async (e) => { 
setTimeout(() => {
if(view.webContents.isAudioMuted()){
view.tab.setIcon('systemui/images/volume_off.svg');
} else {
view.tab.setIcon('systemui/images/volume_on.svg');
}
}, 150); 
});

view.webContents.on('media-paused', async (e) => { 
setTimeout(() => {
if(view.webContents.getURL()){
let origin = new URL(view.webContents.getURL()).origin;
if(!view.webContents.getURL().includes('block://') && !view.webContents.getURL().includes('file://')){
var icons = `https://www.google.com/s2/favicons?sz=64&domain_url=${origin}`;
view.tab.setIcon(icons);
} else { 
view.tab.setIcon('//:0'); 
}
}
}, 100); 
});


// view.webContents.on('page-favicon-updated', async (e) => { web.faviconUpdated(view, e.favicons) });
view.webContents.on('page-title-updated', async (e, t) => { web.titleUpdated(view, e, t) });
view.webContents.on('did-navigate', async (e, url) => { web.didNavigate(url, view, storage) });
view.webContents.on('did-navigate-in-page', async (e, url) => { web.didNavigate(url, view, storage) });
view.webContents.on('preload-error', async (e, path, err) => { console.error("PRELOAD ERROR", err); });

//bekle
view.webContents.on('login', async (e, path, err) => { console.log('ok'); });

//view.webContents.session.on('before-download', (event, item, webContents) => {});
view.webContents.session.on('will-download', this.handleDownload);
//view.webContents.session.on('will-download', async (event, item, webContents) => { willDowloandss(event, item, webContents); });

view.webContents.on('certificate-error', async (e, url, err) => {
e.preventDefault();
console.log(err);
});


view.webContents.on('crashed', async (e) => {
console.log('crashed', e);
});
}

// Saves an HTML page:
exports.savePage = function(contents) {
let filters = [
{ name: i18n.__('Web Sayfası, Tamamı'), extensions: ['htm', 'html'] },
{ name: i18n.__('Web Sayfası, Yalnızca HTML'), extensions: ['html', 'htm'] },
{ name: i18n.__('Web Sayfası, Tek Dosya'), extensions: ['mhtml'] }
];

let options = {
title: i18n.__('Farklı Kaydet'),
defaultPath: this.current().webContents.getTitle(),
filters: filters
};

dialog.showSaveDialog(options).then((det) => {
if(!det.cancelled){
let path = det.filePath;
let saveType;
if(path.endsWith('htm')) saveType = 'HTMLComplete';
if(path.endsWith('html')) saveType = 'HTMLOnly';
if(path.endsWith('mhtml')) saveType = 'MHTML';

contents.savePage(path, saveType).then(() => {
let input = { message: i18n.__('Sayfa başarıyla kaydedildi.'), type: 'alert',	url: 'BLOCK' };
//ipcRenderer.send('alert',input);
alert(input);
}).catch(err => { console.error(err) });
}
});
}

// Activate (select) a certain tab:
exports.activate = function (view) {
if(view?.webContents?.id){
cachetabid = view.webContents.id;
cachetabview = view;

let win = remote.getCurrentWindow();
win.setBrowserView(view);

//win.extensions.selectTab(view.webContents);
//ipcRenderer.send('addTabselectTab', 'selectTab', view.webContents.id);


document.getElementById('url').value = '';
this.viewActivated(view);
if(document.getElementsByClassName('selected')[0]) {
document.getElementsByClassName('selected')[0].classList.remove('selected');
}
view.tab.element.classList.add('selected');
activeTab = view;
// Synchronize view size with parent window size:
//Code in Mac, Makes pages appear when navigating between tabs 
topbarHeight = realNowtopbarHeight();
view.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW+opraidus, height:win.getContentBounds().height - topbarHeight+opraidusalt });

/*
let win = remote.getCurrentWindow();
let views = win.getBrowserViews();
for (let i = 0; i < views.length; i++) {
if(views[i].type == 'tab') win.removeBrowserView(views[i]);
}
win.addBrowserView(view);
document.getElementById('url').value = '';

this.viewActivated(view);

if(document.getElementsByClassName('selected')[0]) {
document.getElementsByClassName('selected')[0].classList.remove('selected');
}

view.tab.element.classList.add('selected');
activeTab = view;

// Synchronize view size with parent window size:
//Code in Mac, Makes pages appear when navigating between tabs 
topbarHeight = realNowtopbarHeight();
view.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW, height:win.getContentBounds().height - topbarHeight });
*/
    }
}


// Close a tab:
exports.close = async (view) => { 
view = view || this.current();

if(activeTab == view) { 
let id = this.tabs.indexOf(view);
let length = this.tabs.length;

ipcRenderer.send('removetabsPins', view.tab.element.id); 

//let nextTab = (id != 0) ? this.tabs[id - 1] : this.tabs[id + 1];

let uidnes;
let tabgendis = document.getElementById(view.tab.element.id);
if(tabgendis.previousElementSibling?.classList?.contains('tab')){
uidnes = tabgendis.previousElementSibling.id; 
} else {
if(tabgendis.nextElementSibling?.classList?.contains('tab')){
uidnes = tabgendis.nextElementSibling.id; 
} else {
uidnes = (id != 0) ? this.tabs[id - 1] : this.tabs[id + 1];  
}
}

for (let tabs of this.tabs) {
if(uidnes == tabs.tab.id){ 
this.activate(tabs); 
}
}  

//if(nextTab) { this.activate(nextTab); }
}



view.tab.element.remove();

closedTabs.push(view.webContents.getURL());

this.viewClosed(view);
view.webContents.destroy();

let win = remote.getCurrentWindow();
win.removeBrowserView(view);


setTimeout(() => {
if (!this.tabs.length) { remote.app.quit(); return; }
}, 280); 
}





var oSessionsXGT;
if(store.get('--incognitotab') == '--incognitotab'){
let cids = v1();
oSessionsXGT = 'persist:'+cids+cids;
} else { oSessionsXGT=''; }

// Create a new tab:
exports.newView = async function (url, active=true, pinsid, ggezmode_babe) {


let view;
if(url.startsWith('block:') || url.startsWith('file:')){ 
view = new BrowserView({
frame: false,
//transparent: true,
//backgroundColor: '#D0DBE3',
//x:windowxview,
//width:window.outerWidth+windowxviewW,
webPreferences: {
partition: oSessionsXGT,

plugins: true,
webSecurity: true,
javascript: true,
spellcheck: true,

nodeIntegration: true, enableRemoteModule: true, contextIsolation: false,
preload: join(__dirname, 'preload.js')
}
});
} else {
view = new BrowserView({
frame: false,
//transparent: true,
//backgroundColor: '#D0DBE3',
webPreferences: {
partition: oSessionsXGT,

plugins: true,
contextIsolation: true,
webSecurity: true,
javascript: true,
spellcheck: true,

nodeIntegration: true, enableRemoteModule: true, 
preload: join(__dirname, 'preload.js')
}
});
}


let win = remote.getCurrentWindow();
//ipcRenderer.send('addTabselectTab', 'addTab', JSON.stringify(view.webContents));
//ipcRenderer.send('addTabselectTab', 'addTab', view.webContents.id);

let tabSession = view.webContents.session;

//view.webContents.session.setPreloads([join(__dirname, 'preload-get-display-media-polyfill.js')]);

/* VPN - Proxy */
var proxyList;
if(store.get('vpn-proxy-opend')){ proxyList = store.get('vpn-proxy-ip'); } else {proxyList = ''; }

view.webContents.session.setProxy({
proxyRules: proxyList,
//proxyRules:`http=foopy,direct://${proxyList}`,  
pacScript: undefined,
proxyBypassRules: 'localhost'
}, () => {
});


// We remove electron and application name because the sequence is wrong. The electron definition is not required.
view.webContents.userAgent = view.webContents.userAgent
.replace(/\sElectron\/\S+/, '')
.replace(new RegExp(`\\s${remote.app.getName()}/\\S+`), '');
//I'm converting it to the original without impersonating the UserAgent. It should be in a new browser and the application name and version should be at the end.
view.webContents.userAgent = view.webContents.userAgent+' '+ remote.app.name+'/'+remote.app.getVersion();

view.webContents.setZoomFactor(1.0); 
view.webContents.zoomFactor = 1.0;

// WEBRTC IP HANDLING POLICY
//view.webContents.setWebRTCIPHandlingPolicy('disable_non_proxied_udp');
topbarHeight = realNowtopbarHeight();

// Synchronize view size with parent window size:
view.setBounds({x:windowxview, y:topbarHeight, width:win.getContentBounds().width+windowxviewW+opraidus, height:win.getContentBounds().height - topbarHeight+opraidusalt});





/*
// consider all urls for integrated authentication. '*googleapis.com, *google.com, *google'
tabSession.allowNTLMCredentialsForDomains('*');

// HEADER CONFIGURATION
const filter = { 
urls: [
'*://*.google.com/*', 
'*://*.google.com.tr/*', 
'*://*.googleapis.com/*',
'*://*.gstatic.com/*',
'*://*.spotify.com/*',
'*://*.scdn.com/*',
'*://*.cookielaw.org/*',
'*://*.onetrust.com/*',
'*://*.google-analytics.com/*'
] 
}; 

tabSession.webRequest.onBeforeSendHeaders(filter, (det, callback) => {
let headers = det.requestHeaders;
//if(store.get('flags').includes('--no-referrers')) headers['Referer'] = ''; // Omit 'Referer' header when 'no-referrers' flag is enabled
if(store.get('flags').includes('--do-not-track')) headers['DNT'] = '1'; // Enable DNT for 'do-not-track' flag

headers['Access-Control-Allow-Headers'] = '*';
headers['Access-Control-Allow-Origin'] = '*';
headers['Access-Control-Allow-Credentials'] = true;
headers['Accept-Language'] = store.get('settings.langs')+', tr-TR;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5'; 


var url = new URL(det.url); 
if(url.hostname == 'web.whatsapp.com'){
headers['User-Agent'] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0";
} 


callback({ cancel: false, requestHeaders: headers }); // Don't cancel the request but use these modified headers instead
});
*/



/* It's a temporary solution as whatsapp doesn't accept new browser useragents yet.
It's not good to impersonate useragent.
It is set to be valid only on whatsapp.
Whatsapp this problem has been reported and help is awaited.*/

tabSession.webRequest.onBeforeSendHeaders((details, callback) => {



if(details.url){
    if(new URL(details.url).hostname == 'dexscreener.com'){
    details.requestHeaders['User-Agent'] = view.webContents.userAgent;
} 
} else {
    details.requestHeaders['User-Agent'] = view.webContents.userAgent;
}


//if (settings.globalPrivacyControl) details.requestHeaders['Sec-GPC'] = '1';

//if(store.get('flags').includes('--no-referrers')) details.requestHeaders['Referer'] = ''; // Omit 'Referer' header when 'no-referrers' flag is enabled
if(store.get('flags').includes('--do-not-track')) details.requestHeaders['DNT'] = '1'; // Enable DNT for 'do-not-track' flag

callback({ requestHeaders: details.requestHeaders });
});



// THIRD-PARTY COOKIE BLOCKING - Geliştirilicek, google.com, google.com.tr oturum açma çerez engelli
tabSession.cookies.on('changed', async (e, cookie, cause, rem) => {
if(!rem) {
let split = cookie.domain.split('.');
let domain = split[split.length - 2] + '.' + split[split.length - 1];
try {
split = (new URL(view.webContents.getURL())).host.split('.');
let host = split[split.length - 2] + '.' + split[split.length - 1];
if(domain != host) {
if(host == 'google.com' || host == 'youtube.com'){} else {
if(store.get('settings.auto_clear_cookies')){
tabSession.cookies.remove(view.webContents.getURL(), cookie.name);
//console.log('COOKIE Passive '+domain);
} else { /*console.log('bu özellik kapalı');*/ }
}

}
} catch (error) {
//console.log('### COOKIE OOF')
}
}
});


// CUSTOM PROTOCOLS
tabSession.protocol.registerHttpProtocol('ipfs', (req, cb) => {
var hash = req.url.substr(7);
cb({ url: 'https://ipfs.io/ipfs/' + hash });
}, () => {});

// PDF READER , JSON VİEWWER
//https://github.com/mozilla/pdf.js/ wait
tabSession.webRequest.onResponseStarted(async (det) => {

let type = det.responseHeaders['Content-Type'] || det.responseHeaders['content-type'];
let resource = det.resourceType;

if(!resource || !type) return;
let query = '?url=' + encodeURIComponent(det.url);
if(resource == 'mainFrame' && type[0].includes('application/json')) {
if(store.get('settings.json_viewer')){ 
view.webContents.loadURL(join(__dirname, '..', 'module', 'json-viewer', 'index.html') + query);
}
} else if (resource == 'mainFrame' && type[0].includes('application/pdf')) {
//view.webContents.loadURL(join(__dirname, '..', 'static', 'pdf', 'index.html') + query);
//wait //view.webContents.loadURL(join(__dirname, '..', 'module', 'pdfjs', 'web/viewer.html?file='+encodeURIComponent(det.url)));
view.webContents.downloadURL(det.url);
this.close(view); 
//shell.openExternal(det.url);
} 
});

tabSession.protocol.registerFileProtocol('assets', (req, cb) => {
var url = req.url.replace(new URL(req.url).protocol, ''); 
if(url.includes('..')) {
cb(join(__dirname, '../css/favicon.png'));
} else {
cb(join(__dirname, '../css/', url));
}
}, () => {});


/*
tabSession.protocol.registerFileProtocol('view-source', (req, cb) => {
var url = new URL(req.url); 
cb(join(__dirname, '../../layout/pages/', 'view-source.html?url='+url));
}, () => {});
/*/


tabSession.protocol.registerFileProtocol('block', (req, cb) => {
    
var url = new URL(req.url); 

if(url.pathname == '//network-error') {
cb(join(__dirname, '../../layout/pages/', `network-error.html`));
} else {

if(url.pathname == '//incognito-new-tab') {

if(newtabBased == 'incognito-new-tab'){ 
if(url.pathname == '//new-tab') {
cb(join(__dirname, '../../layout/pages/', `incognito-new-tab.html`));
} else {
url = req.url.replace(url.protocol, '');
cb(join(__dirname, '../../layout/pages/', `${ url }.html`));
}

} else {
cb(join(__dirname, '../../layout/pages/', 'new-tab'+oppayancar+'.html'));
}

} else {        
url = req.url.replace(url.protocol, '');
cb(join(__dirname, '../../layout/pages/', `${ url }.html`));
}

}



}, () => {});




// CLOSE HANDLING
ipcMain.on('closeCurrentTab', async (e, id) => { 
if(id == view.webContents.id) this.close(view);
});

ipcMain.on('closeCurrentTab2', async (e) => { 
this.close(view);
});


//burası tab html oluşturma yeri
var tabEl = document.createElement('div');
tabEl.classList.add('tab');
tabEl.classList.add('tab-drag');

let v1ids;

if(pinsid){
v1ids = pinsid;
} else {
v1ids = v1();   
}
tabEl.id = v1ids;

let tone = window.theme === 'dark' ? 'dark' : 'light';
tabEl.innerHTML = `<img id="${v1ids}" class="tab-icon" src="systemui/images/loading-${tone}.gif">
<p id="${v1ids}" class="tab-label">${ i18n.__('Yükleniyor...') }</p>
<img id="${v1ids}" class="tab-close" src="systemui/images/close.svg">`.trim();
//view.tab.setIcon(); 

if(ggezmode_babe){

if(ggezmode_babe == "tabs"){
document.getElementById('new-tab').insertAdjacentElement('beforebegin', tabEl);
} else {
document.getElementById(ggezmode_babe).appendChild(tabEl);
}

} else {


if(document.getElementsByClassName("tab selected")[0]?.id){ 
document.getElementById(document.getElementsByClassName("tab selected")[0].id).insertAdjacentElement('afterend', tabEl);
} else {
document.getElementById('new-tab').insertAdjacentElement('beforebegin', tabEl);
}

}


view.tab = {
id: v1ids,
element: v1ids ? document.getElementById(v1ids) : document.getElementById('new-tab').previousElementSibling,
//element: document.getElementById('new-tab').previousElementSibling,
setIcon: async (icon) => {
//view.tab.icon.addEventListener("error", () => { view.tab.icon.src = '//:0' });
if(icon && icon != 'null/favicon.ico') { view.tab.icon.src = icon; }
},
setTitle: async (title) => { view.tab.title.innerText = title; },
close: async () => { view.tab.element.remove(); }
};


view.tab.element.style.opacity = '1';
view.tab.element.style.width = '180px';
view.tab.element.id =  v1ids;
view.tab.icon = view.tab.element.children[0];

if(pinsid){ 
if(url.includes('block://')){ 
view.tab.setIcon('systemui/images/public.svg');
}
}

view.tab.title = view.tab.element.children[1];
view.tab.button = view.tab.element.children[2];


if(pinsid){
var anatabssx = document.getElementById(pinsid);

var parentx = document.getElementById('npin-tab');
var parentsx = document.getElementById('tabs');

if(!anatabssx.classList.contains('tab-pins')){
parentx.append(anatabssx);
}
parentsx.prepend(parentx);

anatabssx.classList.add('tab-pins');
anatabssx.classList.add('tab-drag');
}


//async function xnewView(view){this.newView(view.webContents.getURL());}

async function tabmenuss(view,xid){
// TAB MENU
let tabMenuTemp = [
{ label: i18n.__('Yeniden Yükle'), click: async() => view.webContents.reload() },
{ label: i18n.__('Yenile'), click: async() => { ipcRenderer.send('openPage', view.webContents.getURL()); } },

{ 
label: view.webContents.isAudioMuted() ? i18n.__('Sitenin Sesini Aç') : i18n.__('Sitenin Sesini Kapat'), 
click: async() => {
if(!view.webContents.isAudioMuted()){
view.webContents.setAudioMuted(true);
if(view.webContents.isCurrentlyAudible()){
view.tab.setIcon('systemui/images/volume_off.svg');
} 

} else { 
view.webContents.setAudioMuted(false);
if(view.webContents.isCurrentlyAudible()){
view.tab.setIcon('systemui/images/volume_on.svg');
}
}

} 
},

{ 
label: document.getElementById(xid).classList.contains('tab-pins') ? i18n.__('Sabitlemeyi Kaldır') : i18n.__('Sabitle'), 
click: async() => {
//alert(i18n.__('Geliştirme aşamasında !'))
var anatabss = document.getElementById(xid);

var parent = document.getElementById('npin-tab');
var parents = document.getElementById('tabs');

if(!anatabss.classList.contains('tab-pins')){
//view.webContents.session.tabpinid = xid;
parent.append(anatabss);
} else {
//view.webContents.session.tabpinid = "";
parents.prepend(anatabss);
}

parents.prepend(parent);

anatabss.classList.toggle('tab-pins');
anatabss.classList.toggle('tab-drag');
if(view.webContents.getURL().includes('block://') || view.webContents.getURL().includes('file://')){
if(!anatabss.classList.contains('tab-pins')){view.tab.setIcon('//:0');} else {view.tab.setIcon('systemui/images/public.svg');}
}
ipcRenderer.send('logtabsPins', view.webContents.getURL(), xid); 
}
},

{ type: 'separator' },

{ 
label: i18n.__('Kapat'), 
click: async() => {
// this.close(view); 
var closed = document.getElementById(xid);
var cloedimg = closed.querySelector(".tab-close");
cloedimg.click();
} 
}
];

Menu.buildFromTemplate(tabMenuTemp).popup();
}

view.tab.element.addEventListener('mousedown', async (e) => {
switch (e.which) {
case 1:
this.activate(view);
break;
case 2:
this.close(view);
break;
case 3:
//console.log(e.path[0].id);
tabmenuss(view,e.target.id); 
break;
default:
break;
}
});

view.tab.button.addEventListener('click', async (e) => {
e.stopPropagation();
this.close(view);
});

view.type = 'tab';




if(url == 'block://new-tab' || url == 'block://new-tab-opera'){
//view.webContents.loadURL(join(__dirname, '..', 'static', 'pages', 'new-tab.html'));

if(store.get('settings.newtabmode') == "block"){
view.webContents.loadURL(require('url').format({
pathname: join(__dirname, '../../layout/pages/new-tab'+oppayancar+'.html'),
protocol: 'file:',
slashes: true
}));
}

if(store.get('settings.newtabmode') == "bing"){
view.webContents.loadURL("https://www.bing.com");
}


} else {
if(url == 'block://bird'){
view.webContents.loadURL(require('url').format({
pathname: join(__dirname, '../../layout/pages/bird.html'),
protocol: 'file:',
slashes: true
}));
} else {    
view.webContents.loadURL(url);
}
}

//view.webContents.loadURL(url);



//view.webContents.tabsid = view.webContents.id;

win.addBrowserView(view);
win.setBrowserView(view);

win.extensions.addTab(view.webContents, win);
win.extensions.selectTab(view.webContents);

//ipcRenderer.send('addTabselectTab', 'addTab', view.webContents.id);
this.initBrowserView(view);
this.viewAdded(view);
if(active) { this.activate(view); }

return view;
}

// Navigate to the next tab relative to the active one:
exports.nextTab = async () => {
let length = this.tabs.length;
let index = this.tabs.indexOf(activeTab);

if (length == 1) return;

if (index == length - 1) { this.activate(this.tabs[0]); }
else { this.activate(this.tabs[index + 1]); }
}

// Navigate to the previous tab relative to the active one:
exports.backTab = async () => {
let length = this.tabs.length;
let index = this.tabs.indexOf(activeTab);

if (length == 1) return;

if (index == 0) { this.activate(this.tabs[length - 1]); }
else { this.activate(this.tabs[index - 1]); }
}

exports.viewActivated = function (view) { web.changeTab(view, storage); }
exports.viewAdded = function (view) { this.tabs.push(view); ipcRenderer.send('viewAdded'); }
exports.viewClosed = function (view, tabs=this.tabs) {
const index = tabs.indexOf(view);
if (index > -1) tabs.splice(index, 1);
}

exports.showDialog = async (text) => {
let { BrowserView } = remote;
let view = new BrowserView();
view.webContents.loadURL('data:,' + encodeURIComponent(text));
remote.getCurrentWindow().addBrowserView(view);
}

document.getElementById('new-tab').addEventListener('click', async () => this.newView('block://'+newtabBased+oppayancar));
/*
document.getElementById('new-tab-group').addEventListener('click', async () => {
});*/

document.getElementById('tabsgrops').addEventListener('click', async (e) => {
if(document.getElementById('tabsgrops').innerHTML.length > 60){
let xtabsgrops=document.getElementById('tabsgrops');
if(e.target.id == "tabsgropsbtn"){
if(xtabsgrops.classList.contains("omukttas")){
setTimeout(() => {  xtabsgrops.style.width = 'auto'; }, 180);
xtabsgrops.classList.remove("omukttas");
} else {
xtabsgrops.style.width = xtabsgrops.offsetWidth+'px';
setTimeout(() => { xtabsgrops.classList.add("omukttas"); }, 5);
}
} else {
if(e.target.classList.contains("omukttas")){
setTimeout(() => {  xtabsgrops.style.width = 'auto'; }, 180);
xtabsgrops.classList.remove("omukttas");
}
}
}
});
document.getElementById('tabsgrops2').addEventListener('click', async (e) => {
if(document.getElementById('tabsgrops2').innerHTML.length > 60){
let xtabsgrops=document.getElementById('tabsgrops2');
if(e.target.id == "tabsgrops2btn"){
if(xtabsgrops.classList.contains("omukttas")){
setTimeout(() => {  xtabsgrops.style.width = 'auto'; }, 180);
xtabsgrops.classList.remove("omukttas");
} else {
xtabsgrops.style.width = xtabsgrops.offsetWidth+'px';
setTimeout(() => { xtabsgrops.classList.add("omukttas"); }, 5);
}
} else {
if(e.target.classList.contains("omukttas")){
setTimeout(() => {  xtabsgrops.style.width = 'auto'; }, 180);
xtabsgrops.classList.remove("omukttas");
}
}
}
});
document.getElementById('tabsgrops3').addEventListener('click', async (e) => {
if(document.getElementById('tabsgrops3').innerHTML.length > 60){
let xtabsgrops=document.getElementById('tabsgrops3');
if(e.target.id == "tabsgrops3btn"){
if(xtabsgrops.classList.contains("omukttas")){
setTimeout(() => {  xtabsgrops.style.width = 'auto'; }, 180);
xtabsgrops.classList.remove("omukttas");
} else {
xtabsgrops.style.width = xtabsgrops.offsetWidth+'px';
setTimeout(() => { xtabsgrops.classList.add("omukttas"); }, 5);
}
} else {
if(e.target.classList.contains("omukttas")){
setTimeout(() => {  xtabsgrops.style.width = 'auto'; }, 180);
xtabsgrops.classList.remove("omukttas");
}
}
}
});
document.getElementById('tabsgrops4').addEventListener('click', async (e) => {
if(document.getElementById('tabsgrops4').innerHTML.length > 60){
let xtabsgrops=document.getElementById('tabsgrops4');
if(e.target.id == "tabsgrops4btn"){
if(xtabsgrops.classList.contains("omukttas")){
setTimeout(() => {  xtabsgrops.style.width = 'auto'; }, 180);
xtabsgrops.classList.remove("omukttas");
} else {
xtabsgrops.style.width = xtabsgrops.offsetWidth+'px';
setTimeout(() => { xtabsgrops.classList.add("omukttas"); }, 5);
}
} else {
if(e.target.classList.contains("omukttas")){
setTimeout(() => {  xtabsgrops.style.width = 'auto'; }, 180);
xtabsgrops.classList.remove("omukttas");
}
}
}
});


remote.app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
console.log(certificate, error);
event.preventDefault();
callback(true);
});

setTimeout(() => {
this.initDownloads();
}, 2500);


function makeid(length) {
let result = '';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
let counter = 0;
while (counter < length) {
result += characters.charAt(Math.floor(Math.random() * charactersLength));
counter += 1;
}
return result;
}



// CONTEXT (RIGHT-CLICK) MENU
ipcMain.on('show-context-menu', async (e, rightClickPosition,selectionText,mediaType,srcURL,linkURL) => { 
let view = cachetabview;

let clbckvides;

if(view.webContents.getURL().startsWith('block:')){
clbckvides = false;
}
if(view.webContents.getURL().startsWith('file:')){
clbckvides = false;
}

const template = [
{
label: i18n.__('Geri'),
accelerator: 'Alt+Left',
//visible: selectionText.length == 0,
enabled: view.webContents.canGoBack(),
click: async () => { view.webContents.goBack(); }
},
{
label: i18n.__('İleri'),
accelerator: 'Alt+Right',
//visible: selectionText.length == 0,
enabled: view.webContents.canGoForward(),
click: async () => { view.webContents.goForward(); }
},
{
label: i18n.__('Yeniden Yükle'),
accelerator: 'CmdOrCtrl+R',
//visible: selectionText.length == 0,
click: async () => { view.webContents.reload(); }
},
{
type: 'separator'
},
{
label: i18n.__('Farklı Kaydet'),
accelerator: 'CmdOrCtrl+S',
//visible: selectionText.length == 0,
click: async () => { this.savePage(view.webContents); }
},
{
type: 'separator'
},
{
label: i18n.__('Resmi Yeni Sekmede Aç'),
visible: mediaType === 'img',
click: async () => { this.newView(srcURL); }
},
{
label: i18n.__('Resmi Farklı Kaydet'),
visible: mediaType === 'img',
click: async () => { view.webContents.downloadURL(srcURL); }
},
{
label: i18n.__('Bağlantıyı Yeni Sekmede Aç'),
visible: linkURL?.length > 0,
click: async () => { this.newView(linkURL); }
},
{
label: i18n.__('Google İle Ara')+' “'+abbrev_name(selectionText)+'”',
visible: selectionText.trim().length > 0,
click: async () => { this.newView(`https://www.google.com/search?q=${encodeURIComponent(selectionText)}`); }
},
{
label: i18n.__('Sayfa Kaynağını Görüntüle'),
visible: clbckvides,
click: async () => { 
let currentURL = view.webContents.getURL();
this.newView('view-source:'+currentURL);
/*
$.get(currentURL, async (data,status,xhr) => {
store.set('viewSourceMAINCode', data);
store.set('viewSourceURL', currentURL);
this.newView('block://view-source');
});
*/
}
},
{
label: i18n.__('İncele'),
visible: clbckvides,
click: async () => { 
//view.webContents.openDevTools({ mode: 'detach' }); 
view.webContents.inspectElement(rightClickPosition.x, rightClickPosition.y);
}
},
{
label: i18n.__('Görünüm'),
submenu: [
{ 
label: i18n.__('resetZoom'), 
//role: 'resetZoom' 
click: async () => { 
view.webContents.setZoomFactor(1.0); 
view.webContents.zoomFactor = 1.0;
}
},
{ 
label: i18n.__('zoomIn'), 
//role: 'zoomIn' 
click: async () => { 
var currentZoom = view.webContents.getZoomFactor(); 
view.webContents.zoomFactor = currentZoom + 0.2; 
}
},
{ 
label: i18n.__('zoomOut'), 
//role: 'zoomOut' 
click: async () => { 
var currentZoom = view.webContents.getZoomFactor(); 
view.webContents.zoomFactor = currentZoom - 0.2; 
}
},
{ type: 'separator' },
{ label: i18n.__('togglefullscreen'), role: 'togglefullscreen' }
]
}
/*
{
label: 'Menu Item 1',
click: () => { e.sender.send('context-menu-command', 'menu-item-1') }
}*/
]
const menu = Menu.buildFromTemplate(template)
menu.popup({ window: BrowserWindow.fromWebContents(e.sender) });
});

function abbrev_name(str1) {
var split_names = str1.trim().split(" ");
if (split_names.length > 1) {
return (split_names[0] + " " + split_names[1].charAt(0) + ".");
}
return split_names[0];
}


