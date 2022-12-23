"use estrict"

let celsius = document.getElementById("celsius") 
let kelvin = document.getElementById("kelvin")
let convertir = document.getElementById("convertir")
let reset = document.getElementById("reset")





// Añadimos un evento para calcular el valor en kelvin y añadirlo
convertir.addEventListener('click', () => {
    // Obtenemos el valor del input text celsius
    let celsius_valor = celsius.value
    let kelvin_valor = kelvin.value

    if(celsius_valor !== ""){
        // Convertimos el input a kelvin
        kelvin_valor = parseFloat(celsius_valor) + 273.15

        //Asignamos el resultado a Kelvin
        kelvin.value = kelvin_valor; 

    }

    if(kelvin.value !== ""){
        // Convertimos el input a kelvin
        celsius_valor = parseFloat(kelvin_valor) - 273.15

        //Asignamos el resultado a Kelvin
        celsius.value = celsius_valor; 

    }


    
   

})

// Aplicamos la lógica al botón reset

reset.addEventListener('click', () => {
  
    celsius.value = ""
    kelvin.value = ""
})
