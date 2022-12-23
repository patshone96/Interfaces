let fs = require('fs');

//generar el DOM para el test:
let fichero = fs.readFileSync('./encuesta.json');
let preguntas = JSON.parse(fichero);
let prueba = document.getElementById("prueba")

let buena = new Array();

for(let i=0; i<preguntas.length; i++){
    buena.push(preguntas[i].correcta)
}

let btnComp = document.getElementById("comprobar")
let muestra = document.getElementById("muestra")
let lista = document.getElementById("lista");

let contenidoLista="";





for (let i = 0; i < preguntas.length; i++) {

    let imagen = i+1
    contenidoLista+= 
    
    `<li> <img class="img-circle media-object pull-left" src="./images_pizza/${imagen}.png"
    width="32" height="32"
    >
    <br>
    <strong>Pregunta  ${imagen}. ${preguntas[i].pregunta}:</strong>
        <div class="radio">
                     <label>
                        <input type="radio" name="r${i}" id="ra${i}" value="ra">${preguntas[i].rA}
                     </label>
        </div>
        <div class="radio">
            <label>
             <input type="radio" name="r${i}" id="r${i}" value="rb">${preguntas[i].rB}
            </label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" name="r${i}" id="r${i}" value="rc">${preguntas[i].rC}
            </label>
        </div>
    </li>
    <br>` 

	

}

lista.innerHTML = contenidoLista

btnComp.addEventListener('click', () => {
    let respuestas = document.querySelectorAll('[type = radio]')
    let correctas = 0; 
    let incorrectas = 0;
    let cont = 0
    
    respuestas.forEach(p => {
        if(p.checked){
            p.value===buena[cont]?correctas++:incorrectas++
            cont++; 
        }

          


    })

    let salida = `Numero de aciertos: ${correctas}, numero de errores: ${incorrectas}`


    muestra.innerHTML = salida

})