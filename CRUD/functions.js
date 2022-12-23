//cargar módulo fs
const fs = require('fs')
//leer clientes del archivo
let fichero = fs.readFileSync('./clientes.json');
//array para manipular los datos
let clientes = new Array()
//parseamos el fichero en formato json
//ahora en el array clientes tendremos un vector
//donde en cada posición del vector hay un objeto
//con los datos de un cliente
clientes = JSON.parse(fichero);

let pos = 0
let dni = document.getElementById('dni')
let name = document.getElementById("name")
let tel = document.getElementById("tel")
//botones
let btnPrim = document.getElementById("primero")
let btnAnt = document.getElementById("anterior")
let btnSig = document.getElementById("siguiente")
let btnUlt = document.getElementById("ultimo")
let btnBor = document.getElementById("borrar")
let btnIns = document.getElementById("insertar")
let btnGuar = document.getElementById("guardar")



btnPrim.addEventListener('click', () => {
    pos = 0
    mostrarCli(); 
})

btnAnt.addEventListener('click', () => {
    if(pos>0){
        pos-=1
    }

    mostrarCli()


})

btnSig.addEventListener('click', () => {
    if(pos<clientes.length-1){
        pos+=1
    }

    mostrarCli()


})

btnUlt.addEventListener('click', () => {
    pos = clientes.length - 1; 
    mostrarCli()

})

btnBor.addEventListener('click', () => {
    clientes.splice(pos, 1)
    reset()


})

btnIns.addEventListener('click', () => {

    if(btnIns.className === "active btn btn-primary btn-default"){
        reset()
        btnIns.className = "active btn btn-negative btn-default"

    }else{
        addClientes()
        pos = clientes.length-1
        mostrarCli()
        btnIns.className = "active btn btn-primary btn-default"
    }

    })

    btnGuar.addEventListener('click', () => {
        fs.writeFileSync('clientes.json', JSON.stringify(clientes))
        alert("guardado con éxito!")
    
    
    
    })


let addClientes = () => {
    clientes.push(
        {
            "dni": dni.value,
            "nombre": name.value,
            "telefono": tel.value
        }
    )

}

let mostrarCli = () => {
    dni.value = clientes[pos].dni
    name.value = clientes[pos].nombre
    tel.value = clientes[pos].telefono
}

let reset = () => {
    dni.value = ""
    name.value = ""
    tel.value = ""


}