"use strict"

const fetch = require('node-fetch');
const recurso = "http://127.0.0.1:8080";



let listaPelis = document.getElementById('lista-pelis');

//Elementos para introducir una nueva peli
let titulo = document.getElementById('title');
let  anio =  document.getElementById('year');
let desc = document.getElementById('description'); 

//Botones 
let btnCancel = document.getElementById('cancel');
let btnSend = document.getElementById('send');



btnCancel.addEventListener('click', () => {

  titulo.value = ""
  anio.value = ""
  desc.value = ""


})

btnSend.addEventListener('click', () => {

  if(validar()){

    let nuevaPeli = {
      "title": titulo.value,
      "description": desc.value,
      "year": anio.value,
      "image": "default.jpg"
     }

     //Enviar la peli
     fetch(recurso + '/films', {
      method: 'post',
      body: JSON.stringify(nuevaPeli),
      headers: { 'Content-Type': 'application/json' },
     })
      .then(res => res.json());

      listaPelis.innerHTML += 
      `<li class="list-group-item">
      <img class="img-circle media-object pull-left" src="${recurso}/films/default.jpg" width="100" height="100">
      <div class="media-body">
        <strong>${titulo.value}</strong>
        <p>${anio.value}</p>
      </div>
    </li>
`

      

   
    
  }

  titulo.value = ""
  anio.value = ""
  desc.value = ""

  

  //dialog.showErrorBox("Guardado", "Guardad")
 
  



})

function validar(){

  if(titulo.value.length !=0 &&
    anio.value.length != 0 &&
    desc.value.length !=0){

      return true; 

    }

    return false; 
}


//Get para todos las pelis en formato json:
fetch(recurso + '/pelis')
    .then(res => res.json())
    .then(res => 
      {
        pintar(res);
        jsonGuardado = res; 
    });

//Función para pintar una lista de películas
    function pintar(json){

        let cad = `<ul class="list-group">
        <li class="list-group-header">
                      <input class="form-control" type="text" placeholder="Search for a film" id="search">
                    </li>`; 
    
        for(let i = 0; i < json.length; i++){
            cad+= `
            <li class="list-group-item">
                      <img class="img-circle media-object pull-left" src="${recurso}/films/${json[i].image}" width="100" height="100">
                      <div class="media-body">
                        <strong>${json[i].title}</strong>
                        <p>${json[i].year}</p>
                      </div>
                    </li>
            `
        }

        cad+= `</ul>` 
    
        listaPelis.innerHTML = cad;
    }




