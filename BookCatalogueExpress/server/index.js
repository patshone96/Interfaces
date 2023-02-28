const express = require('express');
const data = require('./libros.json');
const bodyParser = require('body-parser');



const fs = require('fs'); //para acceder a los ficheros

let app = express(); //cargamos express
app.use(bodyParser.json());


//Endpoint para obtener los datos de los libros en formato json
app.get('/libros', (req, res) => {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(data));
   });

//Endpoint estático para obtener las imágenes asociadas a los libros
app.use('/public', express.static(__dirname + '/public'));


// Endpoint para insertar libros
app.post('/libros', (req, res) => {
    try {
    //obtener el libro dado con la petición post
    let nuevoLibro = req.body;
    //leer clientes del archivo
    let fichero = fs.readFileSync('./libros.json');
    let libros = JSON.parse(fichero);
    //añadir el nuevo cliente:
    libros.push(nuevoLibro);
    //guardar el fichero completo:
    fs.writeFileSync('./libros.json', JSON.stringify(libros));
    res.send({ ok: true });
    }
    catch (err) {
    res.send({ ok: false });
    }
   });




app.listen(8080);
