let fs = require('fs')
let pdf = require('html-pdf')

//Capturamos los distintos elementos del DOM

//Input .formcontrol => Campos de texto 

let input_form = document.querySelectorAll('.form-control')
let input_tam = document.querySelectorAll('.tam')
let input_gros = document.querySelectorAll('.gros')


// Pruebas
let prueba = document.getElementById('prueba')
let pru = ""






//botones 
let btnAccept = document.getElementById('accept')
let btnCancel = document.getElementById('cancel')



// Al aceptar
btnAccept.addEventListener('click', () => {

    let check = document.querySelectorAll('.checkbox')

    input_form.forEach(p => {
        pru += p.id + ":" + p.value+"<br>"
    })

    input_tam.forEach(p => {
        if(p.checked) pru += "Tamaño: "+ p.id+"<br>"
    })

    input_gros.forEach(p => {
        if(p.checked) pru += "Grosor:" +  p.id+"<br>"
    })

    pru+= "Ingredientes: <br>"

    check.forEach(p => {
        
            if(p.checked) pru+= p.value+"<br>"
        
    })

    let id = input_form[0].value
    toPDF(pru, id)

    

})

// Al rechazar
btnCancel.addEventListener('click', () => {
    let check = document.querySelectorAll('.checkbox')
    input_form.forEach( p => {
        p.value = "";

        

    })

    check.forEach(p => {
        p.checked = false
    })

    input_tam.forEach(p => {
        p.checked=false
    })

    input_gros.forEach(p => {
        p.checked=false
    })

 


})


// Obtenemos el elemento 'ingredientes' del DOM 
let divIng = document.getElementById('ingredientes')

// Leemos el fichero de ingredientes y guardamos el contenido en una variable
let ing = fs.readFileSync('ingredientes.json'); 

//Parseamos el contenido de in gredientes
let jsonIng = JSON.parse(ing)

//Guardamos el contenido de ingredientes en otra variable
let obIng = jsonIng.ingredientes

// Convertimos el objeto a cadena
let strIng = obIng.toString()
 
//Creamos un array de ingredientes llamdo lista
let lista = new Array()

// Rellenamos la lista con los ingredientes como elementos
lista = strIng.split(",")

//Definimos una cadena 'salida'
let salida = ""

// Recorremos el array lista que contiene los ingredientes y lo convertimos en 
// una lista de checkboxes que renderizaremos en el DOM en tiempo de ejecución
lista.forEach(p => {
    salida +=
    "<div class='checkbox-group'>"+
"<label>"+
"<input type='checkbox' class='checkbox' id="+p +" value=" + p+ ">" + p +
"</label>" +
"</div>"
})

//Insertamos en el DOM la salida
divIng.innerHTML = salida

//Crear PDF
function toPDF(datos, id){

    pdf.create(datos).toFile('./pedido_' + id + ".pdf", function (err, res) {
        if (err) {
        console.log(err);
        } else {
        alert("Pedido guardado")
        console.log(res);
        }
        });

}

