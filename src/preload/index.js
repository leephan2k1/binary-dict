const { ipcRenderer } = require("electron");

process.on("loaded", () => {
  global.ipcRenderer = ipcRenderer;
 
});
