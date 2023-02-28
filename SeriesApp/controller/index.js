"use estrict"

const mongoose = require("mongoose");
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

let wrap = document.getElementById("wrapper");

let buscarTodos = () => {
  Serie.find()
    .then((resultado) => {
      pintar(resultado);
    })
    .catch((error) => {
      console.log("ERROR");
    });
};

buscarTodos();

function pintar(json) {
  let cad = ``;

  for (let i = 0; i < json.length; i++) {

    cad += `<div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="./images/${json[i].img}" alt="Avatar" style="width:200px;height:300px;">
      </div>
      <div class="flip-card-back">
        <h1>${json[i].title}</h1>
        <p>(${json[i].year})</p>
        <p>${json[i].desc}</p>
      </div>
    </div>
  </div>`
   
  }

  wrap.innerHTML = cad;
}

//Búsquedas

let btnBuscar = document.getElementById("btnBuscar");

//Buscar por autor
btnBuscar.addEventListener("click", () => {


  let buscarTitle = document.getElementById("buscarTitle").value;
  let buscarYear = document.getElementById("buscarYear").value;
  let buscarGenre = document.getElementById('buscarGenre').value
 
  

  if (buscarTitle == "" && buscarGenre == "" && buscarYear == "") {
    
  } 
  

    if (buscarTitle != "") {
      buscarGenre=""; 
      buscarYear="";

      Serie.find({ title: { $regex: ".*" + buscarTitle + ".*" } })
        .then((resultado) => {
          pintar(resultado);
        })
        .catch((error) => {
         
          console.log("Error al buscar el título");
        });
    } 

    if (buscarYear!= "") {
      buscarGenre="";
      Serie.find({ year:  buscarYear })
        .then((resultado) => {
          pintar(resultado);
        })
        .catch((error) => {
          console.log("Error al buscar el año");
        });
    } 
      
    if (buscarGenre != "") {
      Serie.find({ genre:  buscarGenre  })
        .then((resultado) => {
          pintar(resultado);
        })
        .catch((error) => {
          console.log("Error al buscar el género");
        });
    } 

    
      

      
   
    });

//Mostrar todo

let btnMostar = document.getElementById("btnTodos");

btnMostar.addEventListener("click", () => {
  Serie.find()
    .then((resultado) => pintar(resultado))
    .catch((err) => console.log("No se ha podido actualizar la interfaz"));
});


//Add
let btnSend = document.getElementById('btnAddSeries')

btnSend.addEventListener('click', () => {
  let titulo = document.getElementById("addTitle").value
  let year = parseInt(document.getElementById("addYear").value)
  let desc = document.getElementById("addDesc").value
  let genre = document.getElementById('addGenre').value
  
  if(titulo=="" || year== "" || desc == "" || genre == ""){
      
  }else{
      let serie = new Serie();
            serie.title = titulo;
            serie.year = year;
            serie.desc = desc;
            serie.genre = genre;
            serie.img = "default.jpg";
  
  serie.save().then(resultado => {
      let notification = document.querySelector('#not')
      notification.innerHTML = 'Guardado'
      notification.opened = true; 

      Serie.find()
    .then((resultado) => pintar(resultado))
    .catch((err) => console.log("No se ha podido actualizar la interfaz"));
      

  }).catch(error => {
      let notification = document.querySelector('#not')
      notification.innerHTML = 'Error al guardar'
      notification.opened = true; 
  }); 

  }

})

//DELETE 

let btnDelete = document.getElementById('delete')

btnDelete.addEventListener('click', () => {

  let borrarTitle = document.getElementById("borrarTitle").value;


  if (borrarTitle != "") {
    Serie.findOneAndDelete({ title: borrarTitle })
      .then((resultado) => {
        pintar(resultado);
     
      })
      .catch((error) => {
        console.log("Error al eliminar el título");
      });
  } 
    
})

let btnModSeries = document.getElementById('btnModSeries')

btnModSeries.addEventListener('click', () => {

  let modTitle = document.getElementById('modTitle').value
  let modYear = document.getElementById('modYear').value
  let modGenre = document.getElementById('modGenre').value
  let modDesc = document.getElementById('modDesc').value

  const filter = {title : modTitle};
  const change = {year : modYear}

  let modificada =  Serie.findOneAndUpdate(filter, //filter
  // Modifications, 
    change,
    {new : true}

  ).then((res) => {
   console.log("Actualizada")
  }).catch((err) => {
    console.log("Error al realizar la actualización")
  })

 modificada.save()

 buscarTodos()


})