const fs = require('fs');
const mongoose = require('mongoose');

let fichero = fs.readFileSync('./pelis.json');
let pelis = JSON.parse(fichero);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pelis', {
useNewUrlParser: true,
useUnifiedTopology: true
});

//esquema
let pelisSchema = new mongoose.Schema({
id: {
type: Number,
required: true,
minlength: 1,
trim: true,
unique: true
},
nombre: {
type: String,
required: true,
minlength: 1,
trim: true
},
director: {
type: String,
required: true,
minlength: 1,
unique: true,
trim: true
},
clasificacion: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
    }
});

//modelo
let Peli = mongoose.model('pelis', pelisSchema);

//Introducir las pelis en MONGO 
// pelis.forEach(peli => {
// let pelicula = new Peli();
// pelicula.id = peli.id;
// pelicula.nombre = peli.nombre;
// pelicula.director = peli.director;
// pelicula.clasificacion = peli.clasificacion;
// pelicula.save().then(resultado => {
// console.log("Película añadida:", resultado);
// }).catch(error => {
// console.log("ERROR añadiendo película");
// });
// });

let wrap = document.getElementById('wrapper')

let buscarTodos = () =>  {

    Peli.find().then(resultado => {
        pintar(resultado);

    }).catch(error => {
        console.log("ERROR")
    })

}

buscarTodos();

function pintar(json){


    let tabAc = `<table> <thead> <strong> Acción  </strong> </thead>` ; 
    let tabDr = `<table> <thead> <strong> Drama </strong> </thead>`; 
    let tabCo = `<table> <thead> <strong> Comedia </strong> </thead>`; 
    let tabDoc = `<table> <thead> <strong> Documental </strong> </thead>`; 

    for(let i = 0; i < json.length; i++){

        if(json[i].clasificacion == "Acción"){
            tabAc+=  `<tr>` +  
        `<td>${json[i].nombre}</td>` +
        `<td>${json[i].director}</td>`  +
        
        `</tr>`

        }

        if(json[i].clasificacion == "Drama"){
            tabDr+=  `<tr>` +  
        `<td>${json[i].nombre}</td>` +
        `<td>${json[i].director}</td>`  +
        
        `</tr>`

        }

        if(json[i].clasificacion == "Comedia"){
            tabCo+=  `<tr>` +  
        `<td>${json[i].nombre}</td>` +
        `<td>${json[i].director}</td>`  +
        
        `</tr>`

        }

        if(json[i].clasificacion == "Documental"){
            tabDoc+=  `<tr>` +  
        `<td>${json[i].nombre}</td>` +
        `<td>${json[i].director}</td>`  +
        
        `</tr>`

        }

       

        

       
        
        // `<div>    
        // <img src='./public/${json[i].img}' height="170" width="108"/>
        // <br>
        // <label><strong>${json[i].title}</strong></label>
        // <br>
        // <label>${json[i].author}</label>
        // </div>`

    }

     tabAc += `</table>` ; 
     tabDr += `</table>`; 
     tabCo += `</table>`; 
     tabDoc += `</table>`; 




    wrap.innerHTML = tabAc + tabCo + tabDoc + tabDr;
}