const { app, BrowserWindow } = require("electron");
const path = require("path");
require("electron-reload")(path.join(__dirname, "../renderer"));

let mainWindow;

const createWindow = () => {
  // Tạo Window mới với
  mainWin = new BrowserWindow({
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
  // mainWin.removeMenu();

  // Tải file html và hiển thị
  mainWin.loadURL("file:///src/renderer/index.html");

  // mainWin.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

//Xử lý khi windows đóng
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Xử lý khi app ở trạng thái active, ví dụ click vào icon
app.on("activate", () => {});
