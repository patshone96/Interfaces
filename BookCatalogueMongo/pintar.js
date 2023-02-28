const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/libros', {
useNewUrlParser: true,
useUnifiedTopology: true
});

let btnAutor = document.getElementById("btnBuscarAutor")
let btnLibro = document.getElementById("btnBuscarLibro")
let btnTodos = document.getElementById("btnTodos")
let btnSend = document.getElementById("btnSend")
let btnEliminarTitulo = document.getElementById("btnEliminarTitulo")

//Eliminar por titulo
//Falta saber si el lirbo ya no está en la base de datos, porque si no está te dice que 
//Lo ha eliminado correctamente. Además, no elimina bien libros con tildes... 

btnEliminarTitulo.addEventListener('click', () => {

    let txtEliminarTitulo = document.getElementById('txtEliminarTitulo').value

    Libro.deleteOne({title : txtEliminarTitulo}).then(resultado => {
        let notification = document.querySelector('#notif')
        notification.innerHTML = `Libro ${txtEliminarTitulo} eliminado correctamente`
        notification.opened = true; 
    }).catch(error => {
        let notification = document.querySelector('#notif')
        notification.innerHTML = `Libro ${txtEliminarTitulo} no se ha podido eliminar`
        notification.opened = true;
    })


})



//Enviar

btnSend.addEventListener('click', () => {
    let titulo = document.getElementById("titulo").value
    let autor = document.getElementById("autor").value
    let imagen = document.getElementById("imagen").value

    if(titulo=="" || autor== "" || imagen == ""){
        let notification = document.querySelector('#not')
        notification.innerHTML = 'Todos los campos deben estar completos'
        notification.opened = true; 
    }else{
        let libro = new Libro();
    libro.title = titulo;
    libro.author = autor;
    libro.img = imagen;
    libro.save().then(resultado => {
        let notification = document.querySelector('#not')
        notification.innerHTML = 'Guardado'
        notification.opened = true; 

    }).catch(error => {
        let notification = document.querySelector('#not')
        notification.innerHTML = 'Error al guardar'
        notification.opened = true; 
    }); 

    }




    


})

//Volver a pintarlo todo
btnTodos.addEventListener('click', () => {

    

    Libro.find().then(resultado => {
        pintar(resultado);
    }).catch(error => {
        console.log("Error")
    })


})

//Buscar por autor
btnAutor.addEventListener('click', () => {

    let txtAutor = document.getElementById('txtBuscarAutor').value 

    if(txtAutor == ""){
        let notification = document.querySelector('#notificacion')
        notification.innerHTML = 'Debes escribir algo en autor'
        notification.opened = true; 
    }else{
        Libro.find({author : {$regex: '.*' + txtAutor + '.*' }}).then(resultado => {
            pintar(resultado);
        }).catch(error => {
            console.log("Error al buscar el autor")
        })

    }
    


});

//Buscar por libro
btnLibro.addEventListener('click', () => {

    let txtLibro = document.getElementById('txtBuscarLibro').value 

    if(txtLibro == ""){
        //let notification = document.querySelector('#notificacion')
        let notification = document.getElementById('notificacion')
        notification.innerHTML = 'Debes escribir algo en Titulo'
        notification.opened = true; 
    }else{
        Libro.find({title : {$regex: '.*' + txtLibro + '.*' }}).then(resultado => {
            pintar(resultado);
        }).catch(error => {
            console.log("Error al buscar el Titulo")
        })

    }

    

   


})



//esquema
let librosSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
    },
    author: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
    },
    img: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true
    }
    });
    


//let add = document.getElementById('add'); 

//modelo
let Libro = mongoose.model('libros', librosSchema);

let wrap = document.getElementById('wrapper')

let buscarTodos = () =>  {

    Libro.find().then(resultado => {
        pintar(resultado);

    }).catch(error => {
        console.log("ERROR")
    })

}

buscarTodos();

function pintar(json){

    let cad = ``; 

    for(let i = 0; i < json.length; i++){

        cad+= `<div>
        <x-box vertical>
        <img src="./public/${json[i].img}" height="300" width="120">
        <x-label><strong>${json[i].title}</strong></x-label>
        <x-label>${json[i].author}</x-label>
        </x-box>
        </div>`
        
        // `<div>    
        // <img src='./public/${json[i].img}' height="170" width="108"/>
        // <br>
        // <label><strong>${json[i].title}</strong></label>
        // <br>
        // <label>${json[i].author}</label>
        // </div>`

    }

    wrap.innerHTML = cad;
}




