const {app, BrowserWindow, dialog} = require('electron')

function createWindow(){
// Crea la ventana del navegador.
let win= new BrowserWindow({
width: 500,
height: 500,
webPreferences: {
nodeIntegration: true,
      contextIsolation: false
}
})


// y carga el  index.html de la aplicación.
win.loadFile('indexAhorcado.html')
win.setMenu(null); 
//para mostrar en la ventana la herramientas de desarrollo de chrome:
//win.webContents.openDevTools()
}
//cuando la aplicación electron está lista (todos los procesos generados)
//mediante app.on llamamos a la función que se va ha encargar de lanzar las
//ventanas:
app.on('ready', createWindow)