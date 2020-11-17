const electron = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    height: 600,
    width: 800,
  });
  mainWindow.loadFile(path.resolve("./public/index.html"));
  mainWindow.removeMenu()
}

electron.app.on("ready", () => {
  createWindow();

  electron.app.on("activate", function () {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
