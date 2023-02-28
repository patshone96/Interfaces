const { app, BrowserWindow } = require('electron')

function openWindow() {
  let newwin = new BrowserWindow({
    width: 800,
    height: 630,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  newwin.setMenu(null);
  newwin.loadFile('index.html')
  newwin.setAutoHideMenuBar(true)
  newwin.webContents.openDevTools()
}

app.on('ready', openWindow)