"use strict"

const { utilityProcess } = require('electron')
const { Task } = require('./Database/tasks')
const task = require('./Database/tasks')

let btnNueva = document.getElementById('btnNuevaTarea')
let btnBorrar = document.getElementById('btnBorrarTarea')
let btnActualizar = document.getElementById('btnActualizarTarea')


let txtUpdate = document.getElementById('txtUpdate')
let txtTarea = document.getElementById('txtNuevaTarea')
let txtBorrar = document.getElementById('txtBorrarTarea')


let list = document.getElementById('list')

function onStart(){

    task.Task.find().then(resultado => {
        resultado.forEach( p => {
            
            list.insertAdjacentHTML('beforeend', `<li class="list-group-item mt-3 mb-3">${p.name}</li>`)

        })
    })

}

onStart(); 

btnNueva.addEventListener('click', () => {
    let ts = new task.Task(
        {
            name: txtTarea.value
        }
    );

    if(txtTarea.value == "Error al insertar tarea" || txtTarea.value == "No se puede insertar esta tarea"){
        txtTarea.value = "No se puede insertar esta tarea"
    
    }else{
        ts.save().then(resultado => {
        
        
            list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${txtTarea.value}</li>`)
            txtTarea.value = ""
        
        
    }).catch(error => {
        txtTarea.value = "Error al insertar tarea"
    })

    }

  
})

btnBorrar.addEventListener('click', () => {
    

    task.Task.findOneAndDelete({name: txtBorrar.value}).then(resultado => {
        txtBorrar.value = "";
        list.innerHTML = ""
        onStart()

    }).catch(error => {
        txtBorrar.value = "Error al borrar"
    })

  
})

    let del
    let up; 
// //Atualizar lista
btnActualizar.addEventListener('click', () => {
    

    if(btnActualizar.className == 'btn btn-primary'){
        btnActualizar.className = 'btn btn-danger'
        del = txtUpdate.value
        txtUpdate.value = ""
    }else{
        up = txtUpdate.value
        task.Task.findOneAndUpdate({name: del}, {name: up}, {new: true}).then( () =>
            {
                list.innerHTML = ""
                onStart(); 
                txtUpdate.value = ""
        del = "";
        up = ""}
        ).catch(err => {
            txtUpdate.value = "Error al actualizar"
        })

        btnActualizar.className = 'btn btn-primary'

    }

})