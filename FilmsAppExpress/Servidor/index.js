const express = require('express');
const data = require('./pelis.json');
const bodyParser = require('body-parser');



const fs = require('fs'); //para acceder a los ficheros

let app = express(); //cargamos express
app.use(bodyParser.json());

app.get('/pelis', (req, res) => {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(data));
   });

//Endpoint estático para obtener las imágenes asociadas a las pelis
app.use('/films', express.static(__dirname + '/films'));



// Endpoint para insertar pelis
app.post('/films', (req, res) => {
    try {
    //obtener la peli dado con la petición post
    let newFilm = req.body;
    //leer pelis del archivo
    let fichero = fs.readFileSync('./pelis.json');
    let films = JSON.parse(fichero);
    //añadir el nueva peli:
    films.push(newFilm);
    //guardar el fichero completo:
    fs.writeFileSync('./pelis.json', JSON.stringify(films));
    res.send({ ok: true });
    }
    catch (err) {
    res.send({ ok: false });
    }
   });

app.listen(8080);