const {app, BrowserWindow, dialog} = require('electron')
const electron = require("electron");
require('@electron/remote/main').initialize()
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
let win; 

function createWindow(){
// Crea la ventana del navegador.
win= new BrowserWindow({
width: 500,
height: 500,
maxWidth: 600,
maxHeight: 600,
// frame: false,
// backgroundColor: '#228b22',
webPreferences: {
nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
      nodeIntegration: true,
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
    childWindow.loadURL('https://github.com');

    childWindow.once('ready-to-show', () => {
      childWindow.show()
    });
    
    childWindow.once('maximize', () => {
        dialog.showErrorBox("Maximizado", "Ventana Maximizada")
      });


child1Window = new BrowserWindow({
      width: 500,
      height: 500,
      parent: win,
      modal: true, //Hasta que no se cierre no se puede interactuar con parentWindow
      title: 'Child1',
      show: false,
    });
    child1Window.loadFile('nuevaVentana.html');
    
    child1Window.once('maximize', () => {
        dialog.showErrorBox("Maximizado", "Ventana Maximizada")
      });

    

require("@electron/remote/main").enable(win.webContents)

// y carga el  index.html de la aplicación.
win.loadFile('encuesta2.html')
win.setMenu(null); 
//para mostrar en la ventana la herramientas de desarrollo de chrome:
//win.webContents.openDevTools()
}
//cuando la aplicación electron está lista (todos los procesos generados)
//mediante app.on llamamos a la función que se va ha encargar de lanzar las
//ventanas:
app.on('ready', function() {
    createWindow(); 
    const template = [{ label: 'Edit' }, 
    { label: 'Demo',
    submenu: [
        { label: 'Submenu1',
        click: () => { 

            child1Window.show();

              }
        },

        { type: 'separator' }, //Introduce una línea de separación
        { label: 'Submenu2', 
        click: function () {
            dialog.showErrorBox('Click sobre Submenu2', "Submenu 2")
          }}] },

        {label: "Abrir YouTube",
        click: function() {
            childWindow.loadURL('https://www.youtube.com')
        }

    
    },

{role: "close"}];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

  const ctxMenu = new Menu()
  ctxMenu.append(new MenuItem(
    {
      label: 'Hello',
      click: function () {
        console.log('ctx menu clicked')
      }
    }
  ))

  childWindow.webContents.on('context-menu', function (e, params) {
    ctxMenu.popup(child1Window, params.x, params.y)
  })

}


)