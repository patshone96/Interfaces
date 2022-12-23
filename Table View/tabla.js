const { dialog } = require('@electron/remote'); 
let fs = require('fs');

//Capturamos la tabla
let tabla = document.getElementById('table')

//botones
let btnEdit = document.getElementById('edit')
let btnCancel = document.getElementById('cancel')
let btnSave = document.getElementById('save')
let btnNew = document.getElementById('new')

//Abrir archivos de tipo JSON
fileNames = dialog.showOpenDialogSync({
     title: "Abriendo archivos JSON",
     defaultPath: "F:\\DAM 2\\DI\\Tema 4",
     filters: [
     { name: 'alumnos', extensions: ['json'] }
     ]
     });



//Leer archivo
let lectura = fs.readFileSync(fileNames[0]);
let alumnos = new Array();
alumnos = JSON.parse(lectura); 

let tab = ``; 
let cont = 0;

//Mostramos el contenido del JSON
for(let i=0; i < alumnos.length; i++){
    tab+=  `<tr>` +  
    `<td>${alumnos[i].grupo}</td>` +
    `<td>${alumnos[i].nombre}</td>`  +
    `<td>${alumnos[i].nota}</td>`  +
    `</tr>`; 
}

tabla.innerHTML = tab



//Boton new
btnNew.addEventListener('click', () => {

    if(btnNew.className === "btn btn-default"){
        btnNew.className = "btn btn-negative"

        tab = "";

        for(let i=0; i < alumnos.length; i++){
            tab += 
        `<tr>` +  
        `<td>${alumnos[i].grupo}</td>` +
        `<td>${alumnos[i].nombre}</td>`  +
        `<td>${alumnos[i].nota}</td>`  +
        `</tr>`; 
        }
    
        tab+= `<tr>` +  
        `<td><input type="text" placeholder="grupo" id="grupo"></td>` +
        `<td><input type="text" placeholder="nombre" id="nombre"></td>`  +
        `<td><input type="text" placeholder="nota" id="nota"></td>`  +
        `</tr>`; 
    
        tabla.innerHTML = tab

    }else{

        let nuevoAlumno = document.querySelectorAll('input[type="text"]');
        let addNuevo = {
            "grupo": nuevoAlumno[0].value,
            "nombre":nuevoAlumno[1].value,
            "nota":nuevoAlumno[2].value
        }

        alumnos.push(addNuevo); 

        tab = "";

        for(let i=0; i < alumnos.length; i++){
            tab += 
        `<tr>` +  
        `<td>${alumnos[i].grupo}</td>` +
        `<td>${alumnos[i].nombre}</td>`  +
        `<td>${alumnos[i].nota}</td>`  +
        `</tr>`; 
        }

        tabla.innerHTML = tab

        fs.writeFileSync('./alumnos.json', JSON.stringify(alumnos)); 



        btnNew.className = "btn btn-default"

    }

   


})

//Boton Guardar

btnSave.addEventListener('click', () => {
    let notas = document.querySelectorAll('input[type="text"]');

    for(let i = 0; i<notas.length; i++){
        if(notas[i].value === ''){
            notas[i].value = alumnos[i].nota
        }
    }

    let tab = ``; 

    for(let i=0; i < alumnos.length; i++){
        tab+=  `<tr>` +  
        `<td>${alumnos[i].grupo}</td>` +
        `<td>${alumnos[i].nombre}</td>`  +
        `<td>${notas[i].value}</td>`  +
        `</tr>`; 
    }
    
    tabla.innerHTML = tab









})



//BOTON CANCELAR
btnCancel.addEventListener('click', () => {
    tab = "";

    for(let i=0; i < alumnos.length; i++){
        tab += 
    `<tr>` +  
    `<td>${alumnos[i].grupo}</td>` +
    `<td>${alumnos[i].nombre}</td>`  +
    `<td>${alumnos[i].nota}</td>`  +
    `</tr>`; 
    }

    tabla.innerHTML = tab

})

//BOTON EDITAR
btnEdit.addEventListener('click', () => {

    tab = "";

    for(let i=0; i < alumnos.length; i++){
        tab += 
    `<tr>` +  
    `<td>${alumnos[i].grupo}</td>` +
    `<td>${alumnos[i].nombre}</td>`  +
    `<td><input type='text' id='in${i}'></td>`  +
    `</tr>`; 

    }
    

    tabla.innerHTML = tab
})



