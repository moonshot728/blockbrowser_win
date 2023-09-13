if (window.location.protocol != 'chrome-extension:') {


// PACKAGES
const {	ipcRenderer, remote } = require('electron');

//Dil Bağlantısı
//Language Connection
var i18n = new(require('../../translations/i18n'));



if (window.location.host === 'chrome.google.com') {
const baseUrl =
'https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&prodversion=%VERSION&x=id%3D%ID%26installsource%3Dondemand%26uc';
const ibText = 'Add to '+'BLOCK';
const ibTemplate =
'<div role="button" class="dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-Oc-td-jb-oa g-c" aria-label="' +
ibText +
'" tabindex="0" style="user-select: none;"><div class="g-c-Hf"><div class="g-c-x"><div class="g-c-R  webstore-test-button-label">' +
ibText +
'</div></div></div></div>';

function waitForCreation(selector, callback) {
const element = document.querySelector(selector);
if (element != null) {
callback(element);
} else {
setTimeout(() => {
waitForCreation(selector, callback);
}, 50);
}
}

waitForCreation('.h-F-f-k.F-f-k', (element) => {
element.addEventListener('DOMNodeInserted', (event) => {
if (event.relatedNode != element) return;

setTimeout(() => {
// eslint-disable-next-line @typescript-eslint/no-use-before-define
/*
new (InstallButton)( console.log('ss'),
event.target.querySelector('.h-e-f-Ra-c.e-f-oh-Md-zb-k'),
);
*/
//h-e-f-Ra-c e-f-oh-Md-zb-k
InstallButton(event.target.querySelector('.h-e-f-Ra-c.e-f-oh-Md-zb-k'));
}, 10);
});
});

document.addEventListener('DOMNodeInserted', () => {
setTimeout(() => {
// eslint-disable-next-line @typescript-eslint/no-use-before-define
Array.from(document.getElementsByClassName('a-na-d-K-ea')).forEach(
(el) => {
el.parentNode.removeChild(el);
},
);
}, 10);
});

function installPlugin(id, version = navigator.userAgent.match(/(?<=Chrom(e|ium)\/)\d+\.\d+/)[0]) {
window.location.href = baseUrl
.replace('%VERSION', version)
.replace('%ID', id);
}

function InstallButton(wrapper) {
let id = document.URL.match(/(?<=\/)(\w+)(\?|$)/)[1];

if (wrapper == null) return;
//wrapper.innerHTML += ibTemplate;

escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
createHTML: (to_escape) => to_escape
});
wrapper.innerHTML = escapeHTMLPolicy.createHTML(ibTemplate);


this.DOM = wrapper.children[0];

/* Styling */
this.DOM.addEventListener('mouseover', () => {
this.DOM.className =
'dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-0c-td-jb-oa g-c g-c-l';
});
this.DOM.addEventListener('mouseout', () => {
this.DOM.className = 'dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-Oc-td-jb-oa g-c';
});
this.DOM.addEventListener('mousedown', () => {
this.DOM.className =
'dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-Oc-td-jb-oa g-c g-c-Xc g-c-Sc-ci g-c-l g-c-Bd';
});
this.DOM.addEventListener('mouseup', () => {
this.DOM.className =
'dd-Va g-c-wb g-eg-ua-Uc-c-za g-c-0c-td-jb-oa g-c g-c-l';
});
this.DOM.addEventListener('click', () => {
installPlugin(id);
});
}

}



// ANTI-FINGERPRINTING
async function modifyDefault (defaultVar, name, value) {
if (Object.defineProperty) {
Object.defineProperty(defaultVar, name, {
get: () => { return value }
});
} else if (Object.prototype.__defineGetter__) {
defaultVar.__defineGetter__(name, () => { return value });
}
}

modifyDefault(document, 'referrer', '');
modifyDefault(navigator, 'doNotTrack', '1');
//modifyDefault(navigator, 'deviceMemory', undefined);
modifyDefault(navigator, 'hardwareConcurrency', Math.round(Math.random()) == 0 ? 4 : 8);
modifyDefault(navigator, 'appCodeName', Math.round(Math.random()) == 0 ? 'Mozilla' : 'BLOCK');
modifyDefault(navigator, 'appName', Math.round(Math.random()) == 0 ? 'Netscape' : 'BLOCK');
modifyDefault(navigator, 'mimeTypes', Math.round(Math.random()) == 0 ? {} : navigator.mimeTypes);
modifyDefault(navigator, 'plugins', Math.round(Math.random()) == 0 ? {} : navigator.plugins);
modifyDefault(screen, 'colorDepth', Math.round(Math.random()) == 0 ? 24 : 32);
//remote.getCurrentWebContents().id
window.close = e => { ipcRenderer.send('closeCurrentTab2'); };


// CONTEXT (RIGHT-CLICK) MENU
window.addEventListener('contextmenu', (e) => {
e.preventDefault(); 
let rightClickPosition = {x: e.x, y: e.y};
ipcRenderer.send('show-context-menu',rightClickPosition,e.target.outerText,e.target.localName,e.target.src,e.target.href);
});
ipcRenderer.on('context-menu-command', (e, command) => {
});



/*
navigator.getBattery = () => {};
if(navigator.mediaDevices) navigator.mediaDevices.enumerateDevices = ()=>{return new Promise((r)=>{r(undefined)})}
*/

// DIALOG HANDLERS
global.alert = window.alert = (message) => {
let url = (window.location.href.startsWith('block')) ? 'block' : window.location.href;
ipcRenderer.send('alert', {
message: message,
type: 'alert',
url: url
});
}

global.confirm = window.confirm = (message) => {
let url = (window.location.href.startsWith('block')) ? 'block' : window.location.href;
return ipcRenderer.sendSync('alert', {
message: message,
type: 'confirm',
url: url
});
}

global.prompt = window.prompt = (message) => {
let url = (window.location.href.startsWith('block')) ? 'block' : window.location.href;
return ipcRenderer.sendSync('alert', {
message: message,
type: 'prompt',
url: url
});
}

// FULLSCREEN HANDLERS
let esc_pointer = event => { if (event.keyCode === 27) { document.exitPointerLock(); } };
let esc_fullscreen = event => { if (event.keyCode === 27) { document.exitFullscreen(); } };

let pointerlockchange = async (e) => {
if (document.pointerLockElement) {
alertNewPopups(i18n.__('Çıkmak İçin ESC Basın'),'fullScreenYaanis','col-fullscren-yaani',i18n.__('İmlecinizi göstermek için ESC ye basın'),2000);
document.addEventListener("keydown", esc_pointer);
} else {
document.removeEventListener("keydown", esc_pointer);
}
};
let fullscreenchange = async (e) => {
if (document.fullscreenElement) {
//ipcRenderer.send('fullscreenchange');
alertNewPopups(i18n.__('Çıkmak İçin ESC Basın'),'fullScreenYaanis','col-fullscren-yaani',i18n.__('Tam ekrandan çıkmak için ESC tuşuna basın'),2000);
document.addEventListener("keydown", esc_fullscreen);
} else {
document.removeEventListener("keydown", esc_fullscreen);
}
}

document.addEventListener('pointerlockchange', pointerlockchange, false);
document.addEventListener('fullscreenchange', fullscreenchange);
document.addEventListener('webkitfullscreenchange', fullscreenchange);


// IPC FEATURES
if (window.location.protocol == 'block:' || window.location.protocol == 'file:') {
ipcRenderer.once('setError', (event, details) => {
setError(details);
});

global.sendSync = ipcRenderer.sendSync;
global.send = ipcRenderer.send;
global.on = ipcRenderer.on;
global.ipcRenderer = ipcRenderer;
global.fs = require('fs');
global.dirname = __dirname;
global.i18n = i18n;
global.randomkey = "4as9das1dsa4d5sa";
}

async function alertNewPopups(xtitle,xid,xclass,xmessage,xduration) {
var itemEl = document.createElement('div');
itemEl.title = xtitle;
itemEl.id = xid;
itemEl.className = xclass;
itemEl.innerHTML = `
<style>.esc{font-size: 11px;display: inline-flex;border: solid 1px white;border-radius: 5px;padding: 8px;margin: 0 10px;color: white;}</style>
<div player-fullscreen fullscreen class="full-card-yaani" style="font-family: verdana;position: fixed;top: 60px;margin: 0 auto;z-index: 999999999;left: 0;right: 0;width: 100%;text-align: center;max-width: 330px;padding: 10px 3px;background: rgb(7 20 31 / 42%);color: white;font-size: 12px;border-radius: 5px;    backdrop-filter: blur(1px); ">
${xmessage}
</div>
`.trim();
document.body.appendChild(itemEl);

var hvideos = document.getElementsByTagName("video")[0];
if(hvideos){
var s = document.getElementById("fullScreenYaanis");
hvideos.insertAdjacentElement("afterend", s);
}

setTimeout(function(){ document.getElementById(xid).remove(); }, xduration);
}


/* Sayfa Yüklendi */
window.addEventListener('load', async e => {

setTimeout(() => {

/* şifre ve bilgieri kaydetme */
[].forEach.call(document.getElementsByTagName("form"),(el) =>{
var siteurl = window.location.hostname;
var loginurl = window.location.href;

if(!siteurl){siteurl='localhost'}
if(!loginurl){loginurl='localhost'}

var xinputs = el.getElementsByTagName("input");

var history = ipcRenderer.sendSync('getSaveInfoXcont');
let itemCaches = [];
Object.values(history).forEach((historyItem, i) => {
if(historyItem.url == siteurl){
itemCaches.push(historyItem);
}
});
var datasitems = itemCaches;


for (items of xinputs){

if(items.type == 'password' || items.name == 'password' || items.name == 'pass' || items.name == 'sifre' 
|| items.name == 'session[password]' || items.name == 'session_password'){
var password = items; 
}


if(items.type == 'email' || items.name == 'email' || items.name == 'mail' || items.name == 'eposta' || items.name == 'username' || items.name == 'kullaniciadi' 
|| items.name == 'session[username_or_email]' || items.name == 'session_key'){
var usernameormail = items; 

if(datasitems.length){ 

usernameormail.addEventListener("focus",function(e){ 
if(!usernameormail.id){usernameormail.id="username_auto_idcreates"}
var h = document.getElementById(usernameormail.id);
/*
usernameormail.insertAdjacentHTML('afterbegin',`
<div id="getSaveInfoXcont"></div>
`.trim());*/
document.body.insertAdjacentHTML('afterbegin',`
<div id="getSaveInfoXcont"></div>
`.trim());

var s = document.getElementById("getSaveInfoXcont");
//h.insertAdjacentElement("afterend", s);

var left = Math.ceil(h.getBoundingClientRect().left + window.screenX);
var top = Math.ceil(h.getBoundingClientRect().top + window.screenY
+ parseFloat(getComputedStyle(h, null).height.replace("px", "")))+5;

s.innerHTML = `
<style>
.xsubmainproslo, #btnreas{
padding: 10px 10px;
cursor: pointer;
font-family: system-ui;
font-size: 14px;
margin: 1px 0;    text-align: left; color: black;
border-bottom: solid 1px rgb(243 243 243 / 49%);
}
.xsubmainproslo:hover, #btnreas:hover { background:#f7f7f7; }
#btnreas input{cursor: pointer;}
</style>
<div id="getSaveInfoXcont2" 
style="position: absolute;top: ${top}px;left: ${left}px;min-width: ${h.clientWidth}px;max-width: ${h.clientWidth}px;max-height: 260px;background: white;border: solid 1px #e4e4e4;overflow: auto;z-index: 999999;">
<div style="padding: 5px 0px;" id="addDataAutoFill">
</div>
</div>
`.trim();

for (item of datasitems){
var addDataAutoFill = document.getElementById("addDataAutoFill");
addDataAutoFill.innerHTML+= ` <div id="btnreas" class="${item.title},${item.pass}">
<input class="${item.title},${item.pass}" disabled style="opacity: 1;width: 50%;border: none;background: transparent;" type="text" value="${item.title}">
<input class="${item.title},${item.pass}" disabled style="opacity: 1;width: 50%;border: none;background: transparent;" type="password" value="${item.pass}">
</div>`;
}


});
usernameormail.addEventListener("blur",function(e){
if(document.getElementById("getSaveInfoXcont2")){
document.getElementById("getSaveInfoXcont2").addEventListener('click', async e => { 
var key = e.path[0].className.split(","); 
if(key[0] && key[1]){
usernameormail.value = key[0];
password.value = key[1];
}
});
}
setTimeout(() => {
if(document.getElementById("getSaveInfoXcont")){document.getElementById("getSaveInfoXcont").remove();}
}, 90);
});



}

}

}


window.onbeforeunload = function(e){ 
if(siteurl == 'www.twitter.com' || siteurl == 'twitter.com' || siteurl == 'accounts.google.com'){
e.preventDefault();
if(usernameormail && password){
if(usernameormail.value && password.value){
ipcRenderer.send('logSaveInfoXcont', siteurl, usernameormail.value, password.value, loginurl);
}}
}
};


el.addEventListener('submit', function(evt){ 
//evt.preventDefault(); 
if(usernameormail && password){
if(usernameormail.value && password.value){
ipcRenderer.send('logSaveInfoXcont', siteurl, usernameormail.value, password.value, loginurl);
}
}
});

});

}, 1000);

//Dil Çeviri Yap
var i18nTitle = document.getElementById("i18n");
if(i18nTitle){ i18nTitle.innerHTML = i18n.__(i18nTitle.innerHTML); }

[].forEach.call(document.getElementsByClassName("i18n"),function(el){ 
if(el.placeholder){ el.placeholder = i18n.__(el.placeholder); }
if(el.title){ el.title = i18n.__(el.title); }
});

[].forEach.call(document.getElementsByTagName("i18n"),function(el){ 
var keyslo = el.innerHTML;
el.innerHTML = i18n.__(keyslo);
el.style.display = 'block';
});


});




/*
//Sayfa Yüklendi 
window.addEventListener('load', async e => {
if(window.location.href.includes('block:') || window.location.href.includes('file:')) {



//new-tab
if(window.location.href.includes('new-tab')) {
const dosya = require('./page/new-tab');
dosya.getyenisekme(); 
}
//new-tab son 


//ayarlar 
if(window.location.href.includes('ayarlar')) {
const dosyaleftmenu = require('./page/settings/left-menu'); dosyaleftmenu.getleftmenu(); 
const dosya = require('./page/settings/genel'); dosya.getayarlargenel(); 
}
//ayarlar



}
});
*/




const Store = require('electron-store');
const store = new Store();

if(store.get('settings.generalViews') == "BlockTheme2"){
setTimeout(() => {
//document.head.innerHTML += "<style>html {width: auto !important; overflow: hidden !important; border-radius: 10px !important; contain: content !important; background: #D0DBE3 !important; margin: 5px 5px !important; margin-left: 0px !important; margin-right: 8px !important; margin-top: 2px !important; height: -webkit-fill-available !important;}</style>";
//document.head.innerHTML += "<style>body {overflow: auto !important; height: inherit !important;}</style>";

//document.head.innerHTML += "<style>html {background: #D0DBE3 !important; border-radius: 8px !important;}</style>";
//document.head.innerHTML += "<style>body {border-radius: 8px; margin: 0px 7px 0px 0px !important; contain: content; height: 99.5vh;}</style>";
}, 40);
}

if(store.get('settings.newtabmode') == "bing"){
if (window.location.hostname == 'bing.com' || window.location.hostname == 'www.bing.com') {

loadlogo();
window.addEventListener('load', async e => {
document.title = i18n.__('Yeni Sekme');

for(var i = 1; i < 2200; i++){
setTimeout(() => { loadlogo(); }, i);
}
});



function loadlogo(){ 
if(document.getElementsByClassName("logo_cont")[0]){
document.getElementsByClassName("logo_cont")[0].innerHTML = '<style>.logo{display:none}</style> <div><img src="assets://images/bing/logo.png" style="width: 100%;margin-top: 9px;"></div>';
}

if(document.getElementsByClassName("b_logo")[0]){
document.getElementsByClassName("b_logo")[0].innerHTML = '<style>.b_logo{width: 120px;height: 33px;}.b_logo:after{display:none;}</style> <img src="assets://images/bing/logo-black.png" style="width: 100%;">';
}
}
}
}


}