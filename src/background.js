const { app } = require('electron');
const contextMenu = require('electron-context-menu');
const { isProd, enableDevTools } = require('./constants.js');
const { initIPCMain } = require('./helpers/ipc.js');
const { createWindow } = require('./helpers/browser-window.js');

app.commandLine.appendSwitch('--no-sandbox');

contextMenu({
  showSearchWithGoogle: false,
  showCopyImage: false,
  showInspectElement: enableDevTools,
});

let mainWindow;

/**
 *
 * @param {string[]?}ipcAllowedChannels
 */
function createMainWindow(ipcAllowedChannels = []) {
  mainWindow = createWindow({}, ipcAllowedChannels);
  mainWindow.once('close', () => {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  if (!isProd) {
    const port = process.env.PORT || 3000;
    mainWindow.loadURL(`http://localhost:${port}`);
    // do it again as the vite build can take a bit longer the first time
    setTimeout(() => mainWindow.loadURL(`http://localhost:${port}`), 1500);
  } else {
    mainWindow.loadFile('dist/index.html');
  }
}

app.once('ready', () => {
  initIPCMain();
  createMainWindow();
});

app.on('activate', () => {
  if (!mainWindow) {
    createMainWindow();
  }
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
