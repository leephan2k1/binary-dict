const { ipcRenderer } = require("electron");
const Store = require("electron-store");

const store = new Store();

process.on("loaded", () => {
  global.ipcRenderer = ipcRenderer;
  global.storage = store;
});
