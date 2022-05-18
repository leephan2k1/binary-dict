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
const writeWord = require("./src/main/electron/writeFile");
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
      preload: path.join(__dirname, "./src/preload"),
    },
  });

  // Không cần menu (production)
  // mainWindow.removeMenu();

  // Tải file html và hiển thị
  // mainWindow.loadURL("file:///src/renderer/index.html");
  mainWindow.loadFile(path.join(__dirname, "src", "renderer", "index.html"));

  mainWin.webContents.openDevTools();
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
let count = 0;
app.on("ready", () => {
  for (let i = 0; i < 26; i++) {
    const { tree, length } = Model.init("av", (i + 10).toString(36));
    count += length;
    forestWords.push(tree);
  }
});

ipcMain.on("get-total-word", (event, payload) => {
  if (count) {
    mainWindow.webContents.send("total-word", count);
  }
});

//Lắng nghe search action
ipcMain.on("search-value", (event, payload) => {
  const searchValue = payload.trim().toLowerCase();

  const idx = +searchValue.charCodeAt(0) - 97;

  if (searchValue.length) {
    const resultNode = forestWords[idx].search({ word: searchValue });
    mainWindow.webContents.send("search-value-result", resultNode?.value);
  }
});
//Lắng nghe add word
ipcMain.on("add-word", (event, payload) => {
  const idx = +payload?.word.charCodeAt(0) - 97;
  const wordNode = forestWords[idx].search({ word: payload.word });
  let success = false;

  const dialogOptions = {
    type: "info",
    buttons: ["Thôi khỏi, cảm ơn", "Tra luôn!"],
    defaultId: 1,
    title: " Thêm từ thành công!",
    message: "Người anh (chị) em đã thêm từ thành công",
    detail: "Vào tra từ đã thêm luôn chứ chờ gì nữa! :)",
  };

  if (!wordNode) {
    forestWords[idx].insert(payload);
    writeWord("av", payload.word.charAt(0), payload, "add");
    success = true;
    count++;
    mainWindow.webContents.send("total-word", count);
  } else {
    //select next or cancel
    const dialogOptions = {
      title: " Từ đã tồn tại!",
      message: "Từ đã tồn tại, bạn muốn tiếp tục thêm không?",
      type: "question",
      buttons: ["Tiếp tục thêm", "Thôi không thêm"],
      defaultId: 1,
    };
    const choiceIdx = dialog.showMessageBoxSync(mainWindow, dialogOptions);

    //select override or merge
    if (choiceIdx === 0) {
      const dialogOptions = {
        title: "Lựa chọn cách thêm",
        message: "Thêm ghi đè hoặc nối tiếp? CẨN THẬN với thêm ghi đè!",
        type: "question",
        buttons: ["Ghi đè", "Nối tiếp", "Thôi nghỉ"],
        defaultId: 2,
      };
      const choiceIdx = dialog.showMessageBoxSync(mainWindow, dialogOptions);
      if (choiceIdx === 0) {
        //override
        wordNode.value = payload;
        writeWord("av", payload.word.charAt(0), wordNode.value, "override");
        success = true;
      } else if (choiceIdx === 1) {
        //remove <h1>
        const regex = /<s*h1[^>]*>(.*?)<s*\/s*h1>/;
        payload.html = payload.html.replace(regex, "");
        //merge:
        wordNode.value.html += payload.html;
        writeWord("av", payload.word.charAt(0), wordNode.value, "merge");
        success = true;
      }
    }
  }

  //show success dialog
  if (success) {
    const choiceIdx = dialog.showMessageBoxSync(mainWindow, dialogOptions);
    if (choiceIdx === 1) {
      mainWindow.webContents.send("add-word-success");
    }
  }
});
