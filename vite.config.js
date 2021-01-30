const path = require('path');
const vue = require('@vitejs/plugin-vue');
const svgLoader = require('vite-svg-loader');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  open: false, // do not open the browser as we use electron
  alias: {
    // setup aliases for cleaner imports
    '@': srcPath,
  },
  optimizeDeps: {
    // exclude path  as we are using the node runtime inside the browser
    // and don't wont vite to complain. If you have any issues importing node packages and vite complains,
    // add them here
    exclude: ['path'],
  },
  // @ts-ignore
  plugins: [vue(), svgLoader()],
};
