let fs = require('fs')
let pdf = require('html-pdf')
const { dialog } = require('@electron/remote')

//Leemos el JSON
let Marcas = fs.readFileSync('./marcas.json')
let jMarcas = JSON.parse(Marcas)


let mr = document.getElementById('marcas')
let btnGuardar = document.getElementById('guardar')

// Creamos el desplegable con las marcas
let selectMarcas = '<h3>Marca</h3> <br> <select id="marca">'
for(let i = 0; i < jMarcas.length; i++){
    selectMarcas+= `<option value="${jMarcas[i].marca}">${jMarcas[i].marca} </option>"`

} 
selectMarcas+='</select>'

// Insertamos el desplegable en el HTML
mr.innerHTML = selectMarcas


//Añadimos la funcionalidad a Guardar

btnGuardar.addEventListener('click', () => {
    let input_text = document.querySelectorAll("input[type=text]")
    let buttons = document.querySelectorAll("input[type=radio]")
    
    
    let texto = ""
    let identificador = ""; 

    

   
    input_text.forEach(p => {
        texto+="<h3>"+p.id+": "+p.value+"<h3> <br>"
        identificador+=p.value+"_"

    })

    buttons.forEach(p => {
        if(p.checked){
            texto+= "<h3>"+p.name+": "+p.value+"<h3> <br>"
        }

    })



    toPDF(texto, identificador)
    //salida.innerHTML += texto



    



})




//Crear PDF
function toPDF(datos, id){

    pdf.create(datos).toFile('./coche' + id + ".pdf", function (err, res) {
        if (err) {
        console.log(err);
        } else {
            dialog.showErrorBox("Guardado", "PDF Creado correctamente")
        console.log(res);
        }
        });

}

