const { app } = require('electron');

const appDir = app.getAppPath();

const isProd = app.isPackaged;

const enableDevTools = !isProd || process.env.ENABLE_DEVTOOLS === 'true';

module.exports = {
  appDir,
  isProd,
  enableDevTools,
};
