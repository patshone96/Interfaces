const fs = require('fs');
const mongoose = require('mongoose');

let fichero = fs.readFileSync('./books.json');
let libros = JSON.parse(fichero);
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


libros.forEach(book => {
let libro = new Libro();
libro.title = book.title;
libro.author = book.author;
libro.img = book.img;
libro.save().then(resultado => {
console.log("Contacto añadido:", resultado);
}).catch(error => {
console.log("ERROR añadiendo contacto");
});
});