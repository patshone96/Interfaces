

let btnRe = document.getElementById("reiniciar")
let image = document.getElementById("image")
let huecos = document.getElementById("huecos")
let secreto = document.getElementById("secreto")
let adivina = document.getElementById("adivina")
let hueco = new Array()
let fallo = true;
let cont = 0; 
let final = true; 


//Palabra a adivinar
adivina.addEventListener("keypress", e => {

    let copia_hueco = hueco.map(p => p); 
    
    let letras = secreto.value.split(""); 
    
    if(e.key === "Enter"){

        for(let i =0; i<letras.length; i++){

            if(letras[i] === adivina.value){
                hueco.splice(i, 1, adivina.value)

            }


        }

        for(let i = 0; i < hueco.length; i++){

            if(hueco[i] !== copia_hueco[i]){
                fallo = false; 
              
        }

    }

        if(fallo === true){
            cont++; 
            image.src = `./img/${cont}.png`; 

                
        }

        fallo = true; 


        let hueco2 = hueco; 

        huecos.value = hueco.join(" ")


        hueco2.forEach(p => {
            if(p === "-") final = false
        })

        if(final === true){
            alert("Enhorabuena!")
        }


       
   
    }
})
    
  

//Palabra secreta

secreto.addEventListener('keypress', e => {

    if(e.key === "Enter"){

        salida = huec()

        huecos.value = salida.join(" ")

    }
   


})


//Numero de huecos

function huec(){
    let valor = secreto.value
    for(let i = 0; i < valor.length; i++){
        hueco.push("-")
    }
    return hueco

}


btnRe.addEventListener('click', () => {

    cont = 0;
    image.src = `./img/${cont}.png`; 

    adivina.value = "";
    secreto.value=""; 
    huecos.value=""; 
    hueco = new Array(); 

})
