const fs = require("fs");
const mongoose = require("mongoose");

let fichero = fs.readFileSync("./series.json");
let series = JSON.parse(fichero);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/series", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//esquema
let seriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    minlength: 1,
    trim: true,
  },
  desc: {
    type: String,
    required: false,
    minlength: 1,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  img: {
    type: String,
    required: false,
    minlength: 1,
    unique: false,
    trim: true,
  },
});

//modelo
let Serie = mongoose.model("series", seriesSchema);

series.forEach((serie) => {
  let nuevaSerie = new Serie();
  nuevaSerie.title = serie.title;
  nuevaSerie.year = serie.year;
  nuevaSerie.desc = serie.desc;
  nuevaSerie.genre = serie.genre;
  nuevaSerie.img = serie.img;
  
  nuevaSerie.save()
    .then((resultado) => {
      console.log("Serie añadida:", resultado);
    })
    .catch((error) => {
      console.log("ERROR añadiendo la serie");
    });
});
