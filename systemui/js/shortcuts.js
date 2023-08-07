const { Menu } = require('@electron/remote');
//Dil Bağlantısı
//Language Connection
var i18n = new(require('./../../translations/i18n-ex'));

var keyboardShortcut, switchTab;

exports.init = function (keyboardShortcutB, switchTabB) {
keyboardShortcut = keyboardShortcutB;
switchTab = switchTabB;
}

const menuTemplate = [
{
label: 'Window',
submenu: [/*
{
label: 'Geliştirme Araçlarını Aç',
accelerator: 'CmdOrCtrl+Alt+I',
click: async () => {
keyboardShortcut('browserDevTools');
}
},*/
{
label: i18n.__('BLOCK Yeniden Başlatın'),
accelerator: 'CmdOrCtrl+Alt+R',
click: async () => {
keyboardShortcut('restart');
}
},
{
label: i18n.__('Arama Çubuğuna Odaklan'),
accelerator: 'CmdOrCtrl+E',
click: async () => {
keyboardShortcut('focusSearchbar');
}
},
{
label: i18n.__('Geçmişi Aç'),
accelerator: 'CmdOrCtrl+H',
click: async () => keyboardShortcut('openHistory')
},
{
label: i18n.__('Yer imlerini Aç'),
accelerator: 'CmdOrCtrl+B',
click: async () => keyboardShortcut('openBookmarks')
},
{
label: i18n.__('Ayarları Aç'),
accelerator: 'CmdOrCtrl+Shift+S',
click: async () => keyboardShortcut('openSettings')
}
]
},
{
label: 'Web Site',
submenu: [
{
label: i18n.__('Geliştirme Araçlarını Aç'),
accelerator: 'CmdOrCtrl+Shift+I',
click: async () => {
keyboardShortcut('devTools');
}
},
{
label: i18n.__('Yakınlaştır'),
accelerator: 'CmdOrCtrl++',
click: async () => {
keyboardShortcut('zoomIn');
}
},
{
label: i18n.__('Uzaklaştır'),
accelerator: 'CmdOrCtrl+-',
click: async () => {
keyboardShortcut('zoomOut');
}
},
{
label: i18n.__('Yakınlaştırmayı Sıfırla'),
accelerator: 'CmdOrCtrl+0',
click: async () => {
keyboardShortcut('resetZoom');
}
},
{
label: i18n.__('Geri'),
accelerator: 'Alt+Left',
click: async () => {
keyboardShortcut('backPage');
}
},
{
label: i18n.__('İleri'),
accelerator: 'Alt+Right',
click: async () => {
keyboardShortcut('forwardPage');
}
},
{
label: i18n.__('Sayfayı Yeniden Yüklemek'),
accelerator: 'F5',
click: async () => {
keyboardShortcut('refreshPage');
}
},
{
label: i18n.__('Sayfayı Yeniden Yüklemek'),
accelerator: 'CmdOrCtrl+R',
click: async () => {
keyboardShortcut('refreshPage');
}
},
{
label: i18n.__('Sayfayı Yeniden Yüklemeye Zorla'),
accelerator: 'CmdOrCtrl+F5',
click: async () => {
keyboardShortcut('forceReload');
}
},
{
label: i18n.__('Farklı kaydet...'),
accelerator: 'CmdOrCtrl+S',
click: async () => {
keyboardShortcut('savePage');
}
},
{
label: i18n.__('Yukarı Kaydır'),
accelerator: 'CmdOrCtrl+Up',
click: async () => {
keyboardShortcut('scrollToTop');
}
}
]
},
{
label: i18n.__('Sekmeler'),
submenu: [
{
label: i18n.__('Sonraki Sekme'),
accelerator: 'CmdOrCtrl+Tab',
click: async () => {
keyboardShortcut('nextTab');
}
},
{
label: i18n.__('Önceki Sekme'),
accelerator: 'CmdOrCtrl+Shift+Tab',
click: async () => {
keyboardShortcut('backTab');
}
},
{
label: i18n.__('Yeni Sekme'),
accelerator: 'CmdOrCtrl+T',
click: async () => {
keyboardShortcut('newTab');
}
},
{
label: i18n.__('Yeni Pencere'),
accelerator: 'CmdOrCtrl+n',
click: async () => {
keyboardShortcut('newWindow');
}
},
{
label: i18n.__('Yeni Gizli Pencere'),
accelerator: 'CmdOrCtrl+Shift+n',
click: async () => {
keyboardShortcut('newWindowGizli');
}
},
{
label: i18n.__('Sekmeyi Kapat'),
accelerator: 'CmdOrCtrl+W',
click: async () => {
keyboardShortcut('closeTab');
}
},
{
label: i18n.__('Kapalı Sekmeyi Aç'),
accelerator: 'CmdOrCtrl+Shift+T',
click: async () => {
keyboardShortcut('openClosedTab');
}
},
{
label: i18n.__('Hızlı Anahtar'),
submenu: [
{ label: i18n.__('Sekmeye git')+' 1', accelerator: 'CmdOrCtrl+1', click: async () => switchTab(1) },
{ label: i18n.__('Sekmeye git')+' 2', accelerator: 'CmdOrCtrl+2', click: async () => switchTab(2) },
{ label: i18n.__('Sekmeye git')+' 3', accelerator: 'CmdOrCtrl+3', click: async () => switchTab(3) },
{ label: i18n.__('Sekmeye git')+' 4', accelerator: 'CmdOrCtrl+4', click: async () => switchTab(4) }
]
}
]
}
];

Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
