const path = require('path');
const { BrowserWindow } = require('electron');

const { enableDevTools, appDir } = require('../constants');

/**
 * Create new BrowserWindow object
 *
 * @param {Electron.BrowserWindowConstructorOptions} options browser window options
 * @param {string[]?} channelsNames list of allowed IPC event names allowed to be sent from IPC Renderer
 */
function createWindow(options = {}, channelsNames = []) {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      devTools: enableDevTools,
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      preload: path.join(appDir, 'preload.js'),
      additionalArguments: [
        JSON.stringify({ supportedChannels: channelsNames }),
      ],
      ...(options.webPreferences || {}),
    },
    ...options,
  });

  return win;
}

module.exports = {
  createWindow,
};
