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
const Model = require("./src/main/electron/model");
const storage = require("./src/main/electron/store");
const search = require("./src/core/binarySearch");
const comparator = require("./src/main/electron/constants");
const writeWord = require("./src/main/electron/writeFile");
require("electron-reload")(path.join(__dirname, "./src/renderer/index.html"));

let mainWindow;

const createWindow = () => {
  // Tạo Window mới với
  mainWindow = new BrowserWindow({
    width: 1000,
    minWidth: 850,
    maxWidth: 1000,
    height: 750,
    minHeight: 700,
    maxHeight: 750,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "./src/preload"),
    },
  });

  // Không cần menu (production)
  mainWindow.removeMenu();

  mainWindow.loadFile(path.join(__dirname, "src", "renderer", "index.html"));

  mainWindow.webContents.openDevTools();
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

const forestWordEV = [];
const forestWordVE = [];
let wordsRef;
app.on("ready", () => {
  //EV
  for (let i = 0; i < 26; i++) {
    forestWordEV.push(Model.init("av", (i + 10).toString(36)));
  }
  //VE
  for (let i = 0; i < 26; i++) {
    if (["f", "w", "j", "z"].includes((i + 10).toString(36))) {
      continue;
    }
    forestWordVE.push(Model.init("va", (i + 10).toString(36)));
  }
  //default: EV
  wordsRef = forestWordEV;
});

// listen search type (ev - ve)
ipcMain.on("trans-type", (event, payload) => {
  if (payload === "ev") {
    wordsRef = forestWordEV;
  }
  if (payload === "ve") {
    wordsRef = forestWordVE;
  }
});

// listen search action
ipcMain.on("search-value", (event, payload) => {
  const searchValue = payload.trim();
  const idx = +searchValue.charCodeAt(0) - 97;

  if (searchValue.length) {
    const words = wordsRef[idx];
    const resultNode = search(words, { word: searchValue }, comparator);
    mainWindow.webContents.send("search-value-result", resultNode);
  }
});

// //Lắng nghe add word
// ipcMain.on("add-word", (event, payload) => {
//   const idx = +payload?.word.charCodeAt(0) - 97;
//   const exist = forestWordEVs[idx].search({ word: payload.word });
//   if (!exist) {
//     forestWordEVs[idx].insert(payload);
//     writeWord("av", payload.word.charAt(0), payload);
//   }
// });
