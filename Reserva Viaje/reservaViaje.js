const { dialog } = require('@electron/remote')
let fs = require('fs'); 



let btnConf = document.getElementById('confirmar'); 
let btnCanc = document.getElementById('cancelar'); 
let rightPane = document.getElementById('right')


let des = fs.readFileSync('./destinos.json')
let jsonDestinos = JSON.parse(des);


let rightText = "<ul class=list-group>"; 

for(let i = 0; i<jsonDestinos.length; i++){
    rightText+= `<li>
    <input type="radio" name="destino" id="${jsonDestinos[i].destino}">
    ${jsonDestinos[i].destino}
    </li>`

}

rightText+="</ul>"; 

rightPane.innerHTML = rightText



btnCanc.addEventListener('click', () => {

    

    dialog.showErrorBox("Cancelado", "Cancelado correctamente")

})

btnConf.addEventListener('click', () => {
    rightPane.innerHTML = "rightText"; 
    dialog.showErrorBox("Confirmado", "Confirmado correctamente")

})

