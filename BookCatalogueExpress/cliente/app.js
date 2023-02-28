'use strict';
const fetch = require('node-fetch');
const recurso = "http://127.0.0.1:8080";
let add = document.getElementById('add'); 


let wrap = document.getElementById('wrapper')



//Get para todos los libros:
fetch(recurso + '/libros')
    .then(res => res.json())
    .then(res => pintar(res));
   


add.addEventListener('click', () => {

        //nuevo objeto con el formato apropiado:
        let nuevo = {
         "title": "Jajaja",
         "author": "U.u",
         "img": "3.jpg"
        };
    
        //post insertar libros 
        fetch(recurso + '/libros', {
         method: 'post',
         body: JSON.stringify(nuevo),
         headers: { 'Content-Type': 'application/json' },
        })
         .then(res => res.json());
    
    })
    
    



function pintar(json){

    let cad = ``; 

    for(let i = 0; i < json.length; i++){
        cad+= 
        `<div>    
        <img src=${recurso}/public/${json[i].img} height="170" width="108"/>
        <br>
        <label><strong>${json[i].title}</strong></label>
        <br>
        <label>${json[i].author}</label>
        </div>`

    }

    wrap.innerHTML = cad;
}



