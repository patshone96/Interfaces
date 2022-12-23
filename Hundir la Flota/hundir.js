
const canvas = document.getElementById('canv')
const ctx = canvas.getContext('2d')

let altura = parseInt(canvas.getAttribute('height'));
let anchura = parseInt(canvas.getAttribute('width')); 


let barcos = new Array(); 

let cont = 0;
let ganar = 0; 


//Limpiar el canvas
// context.clearRect(0, 0, canvas.width, canvas.height);

let divContar = document.getElementById('intentos')

let btnPulsa = document.getElementById('pulsa')

let colores = ['#E0607E', '#F4F1BB', '#C2714F', '#9BC995']


//Generamos los barcos
tresBarcos();

function colorAleatorio(){


    return colores[Math.floor(Math.random() * 4)]
}

function coordenadasAleatorias(){
    let x_inicial, y_inicial, ancho, alto;

    x_inicial = Math.floor(Math.random() * 500)
    y_inicial = Math.floor(Math.random() * 500)



    x_final = Math.floor(Math.random() * 500 +50)

    ancho = Math.floor(Math.random() * 500)
    while(ancho + x_inicial > anchura){
       ancho = Math.floor(Math.random() * 500 +50)

    }

    y_final = Math.floor(Math.random() * 500) + 50

    alto = Math.floor(Math.random() * 500)
    while(alto + y_inicial > altura){
        alto = Math.floor(Math.random() * 500 + 50)

    }

    return [x_inicial, y_inicial, ancho, alto]

}

canvas.addEventListener('click', (e) => {
    ctx.font = "bold 22px sans-serif"
    ctx.fillStyle = 'black'
    ctx.fillText("*", e.clientX, e.clientY - 10)
    console.log( e.clientX, e.clientY)
    evaluarCoordenadas(e.clientX, e.clientY - 10)
    cont++;
    divContar.innerHTML = `Intentos: ${cont}`
    if(ganar===3){
        ganado()
    }



})

function ganado(){
    ctx.font = "bold 22px sans-serif"
    ctx.fillStyle = 'black'
    ctx.fillText("HAS GANADO!!!", altura/2, anchura/2)

}



btnPulsa.addEventListener('click', () => {

    ctx.clearRect(0, 0, anchura, altura);
    barcos.splice(0,barcos.length)
    barcos = tresBarcos()

    cont = 0;
    divContar.innerHTML = `Intentos: ${cont}`

    
    

})

function tresBarcos(){

   for(let i=0; i<3; i++){
    let coordenadas = coordenadasAleatorias(); 
    barcos.push(coordenadas)
   }

   console.log(barcos.join("/"))


}

function evaluarCoordenadas(x, y){

 
    for(let i=0; i<barcos.length; i++){
        if(x>= barcos[i][0] && x<= barcos[i][0] + barcos[i][2] 
            && y>= barcos[i][1] && y<=barcos[i][1] + barcos[i][3]){   
                ctx.fillStyle = colorAleatorio()
                ctx.fillRect(barcos[i][0], barcos[i][1], barcos[i][2], barcos[i][3]);
                ganar++;
               barcos.splice(i,1) 
        }
    }

    
        


}


