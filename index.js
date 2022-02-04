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
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const Model = require("./src/main/electron/model");
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

let forestWordEV = [];
let forestWordVE = [];
let wordsRef;
app.on("ready", () => {
  //EV
  for (let i = 0; i < 26; i++) {
    forestWordEV.push(Model.init("av", (i + 10).toString(36)));
  }
  //VE
  for (let i = 0; i < 26; i++) {
    //vietnamese hasn't these words
    if (["f", "w", "j", "z"].includes((i + 10).toString(36))) {
      forestWordVE.push([]);
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
    if (words && words.length) {
      const resultIndex = search(words, { word: searchValue }, comparator);
      mainWindow.webContents.send("search-value-result", words[resultIndex]);
    }
  }
});

//listen get list
ipcMain.on("get-list", (event, payload) => {
  const { character } = payload;
  const idx = +character.charCodeAt(0) - 97;
  if (payload.request) {
    mainWindow.webContents.send("get-list-result", wordsRef[idx]);
  }
});

// add word
function addWord(arr, idxWords, obj, forestWords) {
  if (arr.length) {
    let index;
    for (let i = 0; i < arr.length; i++) {
      if (obj.word < arr[i].word) {
        index = i;
        break;
      }
    }
    const halfBefore = arr.slice(0, index + 1);
    const halfRemain = arr.slice(index, arr.length);
    halfBefore[index] = obj;
    forestWords[idxWords] = [...halfBefore, ...halfRemain];
  } else {
    forestWords[idxWords].push(obj);
  }
}
ipcMain.on("add-word", (event, payload) => {
  const { objEV, objVE } = payload;
  const idxEV = +objEV.word.charCodeAt(0) - 97;
  const evWords = forestWordEV[idxEV];

  const idxVE = +objVE.word.charCodeAt(0) - 97;
  const veWords = forestWordVE[idxVE];

  const existEV = search(evWords, { word: objEV.word }, comparator);
  const existVE = search(veWords, { word: objVE.word }, comparator);

  const optionsSuccess = {
    type: "info",
    buttons: ["Thôi khỏi, cảm ơn", "Tra luôn!"],
    defaultId: 1,
    title: " Thêm từ thành công!",
    message: "Người anh (chị) em đã thêm từ thành công",
    detail: "Vào tra từ đã thêm luôn chứ chờ gì nữa! :)",
  };
  let success = false;

  if (existEV === -1) {
    addWord(evWords, idxEV, objEV, forestWordEV);
    writeWord("av", objEV.word.charAt(0), forestWordEV[idxEV]);
    success = true;
  } else {
    const options = {
      type: "warning",
      buttons: ["Đồng ý", "Không"],
      defaultId: 2,
      title: " Từ đã tồn tại trong dữ liệu Anh - Việt!",
      message: "Bạn có muốn ghi đè lại từ này?",
      detail: "Việc ghi đè sẽ mất thông tin của từ cũ, chắc chắn chứ??",
    };
    const idxSelect = dialog.showMessageBoxSync(mainWindow, options);
    if (idxSelect === 0) {
      evWords[existEV] = objEV;
      forestWordEV[idxEV] = evWords;
      writeWord("av", objEV.word.charAt(0), forestWordEV[idxEV]);
      success = true;
    } else {
      success = false;
    }
  }

  if (existVE === -1) {
    addWord(veWords, idxVE, objVE, forestWordVE);
    writeWord("va", objVE.word.charAt(0), forestWordVE[idxVE]);
    success = true;
  } else {
    const options = {
      type: "warning",
      buttons: ["Đồng ý", "Không"],
      defaultId: 2,
      title: " Từ đã tồn tại trong dữ liệu Việt - Anh",
      message: "Bạn có muốn ghi đè lại từ này?",
      detail: "Việc ghi đè sẽ mất thông tin của từ cũ, chắc chắn chứ??",
    };
    const idxSelect = dialog.showMessageBoxSync(mainWindow, options);
    if (idxSelect === 0) {
      veWords[existVE] = objVE;
      forestWordVE[idxVE] = veWords;
      writeWord("va", objVE.word.charAt(0), forestWordVE[idxVE]);
      success = true;
    } else {
      success = false;
    }
  }

  //show success info dialog
  if (success) {
    const choiceIdx = dialog.showMessageBoxSync(mainWindow, optionsSuccess);
    if (choiceIdx === 1) {
      mainWindow.webContents.send("add-word-success");
    }
  }
});

ipcMain.on("error-add-word", () => {
  const options = {
    type: "error",
    buttons: ["ok"],
    defaultId: 1,
    title: " CÓ GÌ ĐÓ KHUM ỔN?",
    message: "Thêm từ thất bại",
    detail: "Có lẽ bạn đã bỏ sót trường (*) nào đó, hãy kiểm tra lại!",
  };
  dialog.showMessageBox(mainWindow, options);
});
