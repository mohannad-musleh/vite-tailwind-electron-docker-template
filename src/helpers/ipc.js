const { ipcMain } = require('electron');

/**
 * Initialize IPCMain events handlers
 *
 * @param {{[key: string]: {listener: ((event: Electron.IpcMainInvokeEvent, ...args: any[]) => (Promise<void>) | (any)) | ((event: Electron.IpcMainEvent, ...args: any[]) => void); methodName?: string;}}} ipcChannelsMap
 */
function initIPCMain(ipcChannelsMap = null) {
  if (!ipcChannelsMap || Object.keys(ipcChannelsMap || {}).length === 0) {
    return;
  }

  for (const channelName in ipcChannelsMap) {
    const { listener, methodName } = ipcChannelsMap[channelName];
    ipcMain[methodName || 'on'](channelName, listener);
  }
}

module.exports = {
  initIPCMain,
};
