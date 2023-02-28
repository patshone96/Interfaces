const fs = require('fs');
const { findSourceMap } = require('module');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/libros', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

//modelo
let Libro = mongoose.model('libros', librosSchema);


const representaLibros = (books => {
    let cadenaDOM = "";
    books.forEach(book => {
        cadenaDOM +=
            `<div>
                
                    <img src="./images/${book.img}" height="170" width="108">
                    <br>
                    <label><strong>${book.title}</strong></label>
                    <br>
                    <label>${book.author}</label>
                
            </div>`;
    });
    document.getElementById("wrapper").innerHTML = cadenaDOM;
});



let buscarTodos = () => {
    //busqueda con find para cargar todos los libros
    Libro.find().then(resultado => {
        representaLibros(resultado);
    }).catch(error => {
        console.log("ERROR en find");
    });
}


//escuchador del boton buscar libro por autor

document.getElementById("btnBuscarAutor").addEventListener('click', () => {
    let txtBuscarAutor = document.getElementById("txtBuscarAutor").value;
    if (txtBuscarAutor == "") {
        let notification = document.querySelector("#notification");
        notification.innerHTML = "Debe escribir algo";
        notification.opened = true;
    } else {
        //buscamos el libro o libros
        Libro.find({ author: { $regex: txtBuscarAutor } }).then(resultado => {
            console.log(resultado);
            //creamos el DOM para esos libros
            representaLibros(resultado);
        }).catch(error => {
            console.log("ERROR al buscar por título");
        });
    }
});
//escuchador del boton buscar libro por titulo
document.getElementById("btnBuscarTitulo").addEventListener('click', () => {
    let txtBuscar = document.getElementById("txtBuscarTitulo").value;
    if (txtBuscar == "") {
        let notification = document.querySelector("#notification");
        notification.innerHTML = "Debe escribir algo";
        notification.opened = true;
    } else {
        //buscamos el libro o libros
        Libro.find({ title: { $regex: txtBuscar } }).then(resultado => {
            console.log(resultado);
            //creamos el DOM para esos libros
            representaLibros(resultado);
        }).catch(error => {
            console.log("ERROR al buscar por título");
        });
    }
});
document.getElementById("btnNuevoLibro").addEventListener('click', () => {
    let txtNuevoTitulo = document.getElementById("txtNuevotitulo").value;
    let txtNuevoAutor = document.getElementById("txtNuevoAutor").value;
    let txtNuevaImagen = document.getElementById("txtNuevaImagen").value;

    if (txtNuevoTitulo == "" || txtNuevoAutor == "" || txtNuevaImagen == "") {
        let notification = document.querySelector("#notification2");
        notification.innerHTML = "Debe escribir algo";
        notification.opened = true;
    } else {
        //Insertamos el libro
        let libro = new Libro({
            title: txtNuevoTitulo,
            author: txtNuevoAutor,
            img: txtNuevaImagen
        });
        libro.save().then(resultado => {
            let notification = document.querySelector("#notification2");
            notification.innerHTML = "Libro Añadido";
            notification.opened = true;
            buscarTodos();
        }).catch(error => {
            let notification = document.querySelector("#notification2");
            notification.innerHTML = "NO se ha podido añadir el libro";
            notification.opened = true;
        });
    }
});
document.getElementById("btnBorrarLibro").addEventListener('click', () => {
    let txtBorrar = document.getElementById("txtBorrarTitulo").value;
    if (txtBorrar == "") {
        let notification = document.querySelector("#notification3");
        notification.innerHTML = "Debe escribir algo";
        notification.opened = true;
    } else {
        Libro.deleteOne({ title: txtBorrar }).then(result => {
            let notification = document.querySelector("#notification3");
            notification.innerHTML = "Libro Borrado";
            notification.opened = true;
        }).catch(error => {
            let notification = document.querySelector("#notification");
            notification.innerHTML = "NO se ha podido borrar el libro";
            notification.opened = true;
        });
        buscarTodos();
    }
})

//escuchador del boton buscar todos
document.getElementById("btnTodos").addEventListener('click', () => {
    buscarTodos();
});

buscarTodos()