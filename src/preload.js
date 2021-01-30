const { contextBridge, ipcRenderer } = require('electron');

let processArgs = undefined;
try {
  processArgs = JSON.parse(process.argv[process.argv.length - 1]);
} catch (e) {
  processArgs = {};
}

let supportedChannels = processArgs.supportedChannels || [];

const sendMessage = (channel, mode = 'invoke', ...args) => {
  if (!supportedChannels.includes(channel)) {
    return Promise.reject(`Channel '${channel}'not supported`);
  }
  if (mode === 'send') {
    return ipcRenderer.send(channel, ...args);
  } else {
    return ipcRenderer.invoke(channel, ...args);
  }
};

contextBridge.exposeInMainWorld('electron', {
  sendMessage,
});
