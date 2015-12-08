const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
electron.crashReporter.start();

// メインウィンドウの参照をグローバルに持っておく。
var mainWindow = null;

// メニューの定義
var menu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [
      {label: 'Exit', click: onExit}
    ]
  },
  {
    label: 'View',
    submenu: [
      {label: 'simple flow', click: () => navigate('view/simple_flow.html')},
      {label: 'flow direction', click: () => navigate('view/flow_direction.html')},
      {label: 'grid placement sample', click: () => navigate('view/grid_placement.html')},
      {label: 'z-index sample', click: () => navigate('view/z_index.html')},
      {label: 'holy grail layout', click: () => navigate('view/holy_grail.html')},
      {label: 'grid-template-areas sample', click: () => navigate('view/grid_template_areas.html')},
      {label: 'responsive layout sample', click: () => navigate('view/responsive.html')},
      {type: "separator"},
      {label: 'Reload', accelerator: 'CmdOrCtrl+R', click: () => mainWindow.restart()},
      {label: 'Toggle Developper Tools', accelerator: 'CmdOrCtrl+Shift+I', click: () => mainWindow.toggleDevTools() },
    ]
  },
]);

app.commandLine.appendSwitch("--enable-experimental-web-platform-features");

Menu.setApplicationMenu(menu);

// すべてのウィンドウが閉じられた際の動作
app.on('window-all-closed', function() {
  // OS X では、ウィンドウを閉じても一般的にアプリ終了はしないので除外。
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  // 新規ウィンドウ作成
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // sample1.htmlを開く
  navigate('view/simple_flow.html');

  // ウィンドウが閉じられたら、ウィンドウへの参照を破棄する。
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


function onExit(){
  app.quit();
}

function navigate(page){
  mainWindow.loadURL('file://' + __dirname + '/' + page);
}