const { app, BrowserWindow } = require('electron')
const path = require('path')
const { start } = require('repl')
const url = require('url')
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Electron",
    width: 1000,
    height: 600
  })
  mainWindow.webContents.openDevTools()
  const startUrl = url.format({
    pathname: path.join(__dirname, './admin-dashboard/build/index.html'),
    protocol: 'file',

  })
  // mainWindow.loadURL(`http://localhost:3000`)
  mainWindow.loadURL(startUrl)
}
app.whenReady().then(createMainWindow)