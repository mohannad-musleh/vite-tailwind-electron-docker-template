# vite-tailwind-electron-docker-template

Vite + Vue + Tailwind + Electron + Docker template

# Features

- [Vite](https://vitejs.dev/) + [Vue 3](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- Alias to `<project_root>/src` with `@`
- `Dockerfile` included to run the electron app in docker container (using [x11docker](https://github.com/mviereck/x11docker))
- Using [electron security](https://www.electronjs.org/docs/tutorial/security) best practices by default

# Project structure

```bash
.
├── public  # project static assets (These assets will simply be copied and not go through vite)
│   └── favicon.ico
├── src
│   ├── App.vue  # vue application main component
│   ├── assets   # vue application assets (will be handled by vite)
│   │   ├── docker.svg
│   │   ├── electronjs.svg
│   │   ├── lightning-solid.svg
│   │   ├── tailwind.svg
│   │   └── vuejs.svg
│   ├── background.js         # electron js background process logic
│   ├── components            # vue application components
│   │   └── Brands.vue        # example vue component
│   ├── constants.js          # project Constants
│   ├── helpers               # electron js helpers
│   │   └── browser-window.js  # BrowserWindow helpers (e.g create BrowserWindow helper)
│   │   └── ipc.js            # IPCMain helpers
│   ├── index.css             # project main styles (include tailwind css styles)
│   ├── main.js               # vue application entry point
│   └── preload.js            # a script that will be loaded before other scripts run in the page. (used to expose ipcRender without enabling node integration -better security-)
```

# Setup

- Update application name/title in `index.html`
- Update application details in `package.json` file
  - update `name` to you're application name
  - update `description` to describe you're project
  - update `author` details (name + email)
  - update `keywords` attribute
  - update `appId` in `build` object to you're application id
  - Customize build options (optional) like set the build targets, set application icon, set application category, ...
    - for more details, read `electron-builder` documentation [here](https://www.electron.build)

# Installation

## Without docker

### install project dependencies

```shell
yarn # or: npm install
```

### Development

```shell
yarn dev  # or: npm run dev
```

### Build

```shell
yarn build  # or: npm run build
```

## With Docker

### Build docker image

```shell
docker build -t {IMAGE_NAME}:{TAG} .
```

### Run a container with a mount to project directory

```shell
x11docker --dbus --init --user=RETAIN -i \
          --desktop --wm=x11docker/fvwm -- \
          -v {FULL_PATH_TO_PROJECT_DIR}:/usr/src/app \
          -v {CONTAINER_NAME}-note_modules:/usr/src/app/node_modules \
          -v yarn-cache:/usr/src/app-cache/.yarn --rm -- \
          {IMAGE_NAME} /bin/bash
```

**note**: replace `{FULL_PATH_TO_PROJECT_DIR}` with the full path to the project root directory

**note**: replace `{IMAGE_NAME}` with the image name used in the previous step

**note**: replace `{CONTAINER_NAME}` with the container or project name

**note**: remove `--rm` flag if you want to keep the created container

**note**: add `--pulseaudio` flag if the application play audio

**note**: uncomment the last two lines in `Dockerfile` (and re build docker image) if the application show notifications

### install project dependencies

```shell
yarn # or: npm install
```

### Development

```shell
yarn dev:docker  # or: npm run dev:docker
```

### Build

```shell
yarn build  # or: npm run build
```

# FAQ

## how to use IPCMain/IPCRender?

in `background.js`

```js
// ...
app.once('ready', () => {  // <- this line already exists
    const ipcAllowedChannelsHandlersMap = {
    "CHANNEL_NAME": {
      listener: () => console.log("handler called!"),
      methodName: "on" // IPCMain method name ("on", "handle", "handleOnce", ...) (default: "on")
    },
    "ANOTHER_CHANNEL_NAME": {
      listener: () => console.log("handler called!"),
      methodName: "handle" // IPCMain method name ("on", "handle", "handleOnce", ...) (default: "on")
    }
  }
  initIPCMain(ipcAllowedChannelsHandlersMap);
  createMainWindow(Object.keys(ipcAllowedChannelsHandlersMap));
}
// ...
```

in Vue logic

```js
window.electron.sendMessage('CHANNEL_NAME', 'send');
// or if the channel is handled by ipcMain.handle (when a response expected from the handler)
let result = await window.electron.sendMessage(
  'ANOTHER_CHANNEL_NAME',
  'invoke',
);
```

## how to use expose electron functionalities to Vue

in `src/preload.js`

```js
// ...

function wrapperFunction(...args) {
  // call electron API(s) here with any extra logic
}
// ...

contextBridge.exposeInMainWorld('electron', {
  sendMessage,
  wrapperFunction, // <- add the wrapper function here
});
```

in Vue logic

```js
// call the exposed function
window.electron.wrapperFunction();
```

# LICENSE

MIT
