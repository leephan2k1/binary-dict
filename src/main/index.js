/////////////////////////////////////////////////////////
//                                                     //
//                       _oo0oo_                       //
//                      o8888888o                      //
//                      88" . "88                      //
//                      (| -_- |)                      //
//                      0\  =  /0                      //
//                    ___/`---'\___                    //
//                  .' \\|     |// '.                  //
//                 / \\|||  :  |||// \                 //
//                / _||||| -:- |||||- \                //
//               |   | \\\  -  /// |   |               //
//               | \_|  ''\---/''  |_/ |               //
//               \  .-\__  '-'  ___/-. /               //
//             ___'. .'  /--.--\  `. .'___             //
//          ."" '<  `.___\_<|>_/___.' >' "".           //
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |         //
//         \  \ `_.   \_ __\ /__ _/   .-` /  /         //
//     =====`-.____`.___ \_____/___.-`___.-'=====      //
//                       `=---='                       //
//                                                     //
//                                                     //
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     //
//                                                     //
//  KHÔNG BUG                            KHÔNG CRASH   //
//                                                     //
//                   A DI ĐÀ PHẬT!                     //
//                                                     //
/////////////////////////////////////////////////////////
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Model = require("./electron/model.js");
require("electron-reload")(path.join(__dirname, "../renderer"));

let mainWindow;

const createWindow = () => {
  // Tạo Window mới với
  mainWindow = new BrowserWindow({
    width: 1000,
    minWidth: 850,
    maxWidth: 1000,
    height: 750,
    minHeight: 650,
    maxHeight: 750,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "../preload"),
    },
  });

  // Không cần menu (production)
  // mainWindow.removeMenu();

  // Tải file html và hiển thị
  mainWindow.loadURL("file:///src/renderer/index.html");

  // mainWin.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const forestWords = [];
app.on("ready", () => {
  for (let i = 0; i < 26; i++) {
    const tree = Model.init("av", (i + 10).toString(36));
    forestWords.push(tree);
  }
});
//Lắng nghe search action
ipcMain.on("search-value", (event, payload) => {
  const searchValue = payload.trim();
  const idx = +searchValue.charCodeAt(0) - 97;

  if (searchValue.length) {
    const resultNode = forestWords[idx].search({ word: searchValue });
    mainWindow.webContents.send("search-value-result", resultNode?.value);
  }
});

