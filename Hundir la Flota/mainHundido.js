const {app, BrowserWindow, dialog} = require('electron')
require('@electron/remote/main').initialize()
const electron = require("electron");
const Menu = electron.Menu;



function createWindow(){
// Crea la ventana del navegador.
let win= new BrowserWindow({
width: 650,
height: 650,
webPreferences: {
nodeIntegration: true,
      contextIsolation: false,



}
})

childWindow = new BrowserWindow({
    width: 500,
    height: 500,
    parent: win,
    modal: true, //Hasta que no se cierre no se puede interactuar con parentWindow
    title: 'Child',
    show: false,
  });
  childWindow.loadFile('Hundir_Sobre_Programa.html');






require("@electron/remote/main").enable(win.webContents)

// y carga el  index.html de la aplicación.
win.loadFile('hundir.html')
win.setMenu(null); 
//para mostrar en la ventana la herramientas de desarrollo de chrome:
//win.webContents.openDevTools()
}
//cuando la aplicación electron está lista (todos los procesos generados)
//mediante app.on llamamos a la función que se va ha encargar de lanzar las
//ventanas:
app.on('ready', function(){
    createWindow()

    const template = [{label: "Opciones",
                       submenu: [
                        {label: 'Sobre el programa',
                            click: () => {
                                childWindow.show();
                            }       
                    
                    
                    },
                        {label: 'Sobre el juego',
                        click: () => {
                            electron.shell.openExternal('https://es.wikipedia.org/wiki/Batalla_naval_(juego)')
                        }   }

                    ] 
                        }]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


}





)