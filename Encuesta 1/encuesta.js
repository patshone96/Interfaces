let muestra = document.getElementById("muestra")
let pruebas = document.getElementById("pruebas")
let btnComprobar = document.getElementById("comprobar")
let respuestas = document.querySelectorAll('[type = radio]')


let correctas = 0; 
let incorrectas = 0; 


btnComprobar.addEventListener('click', () => {
  
    correctas = 0;
    incorrectas = 0; 
    
    respuestas.forEach( p => {

        if(p.checked){
            if(p.value === "a"){
                correctas++
            }else{
                incorrectas++
            }
        }
    
    })

    salida = `Hay ${correctas} respuestas correctas y ${incorrectas} respuestas incorrectas`


    muestra.innerHTML = ""; 
    muestra.innerHTML = salida; 
})





