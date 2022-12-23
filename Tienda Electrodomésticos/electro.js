let fs = require('fs');
let desplegable = document.getElementById('desplegable')
let informacion = document.getElementById('informacion')
let totales = document.getElementById('totales')

let electro = fs.readFileSync('./electrodomesticos.json')
let jElectro = JSON.parse(electro)

//Desplegable
let eleccion = '<select id="electro">'
for(let i = 0; i < jElectro.length; i++){
    eleccion+= `<option value="${jElectro[i].nombre}"> ${jElectro[i].nombre} </option>"`

} 
eleccion+='</select>'
desplegable.innerHTML = eleccion


//informacion

let sel = document.getElementById('electro')
let info = ""; 
sel.addEventListener('click', () => {
    let indice = document.getElementById("electro").selectedIndex;

    info= `<h3> Artículo: ${jElectro[indice].nombre} </h3> 
    <h3> Precio Coste: ${jElectro[indice].precioCoste} </h3> 
    <h3> Precio Venta: ${jElectro[indice].precioVenta} </h3> 
    <h3> Stock Actual: ${jElectro[indice].stockActual} </h3> 
    <h3> Stock mínimo: ${jElectro[indice].stockMin} </h3> 
    `
    
    informacion.innerHTML = ""
    informacion.innerHTML += info

})

//Total

let total_productos = jElectro.length; 

let total_stock = 0;
for(let i = 0; i < jElectro.length; i++){
    total_stock+=jElectro[i].stockActual
}

let minimos = new Array(); 

for(let i = 0; i < jElectro.length; i++){
    if(jElectro[i].stockActual<jElectro[i].stockMin){
        minimos.push(jElectro[i])
    }
}


let salida = `<h3>Numero de productos: ${total_productos}</h3>
            <h3>Numero total de stock: ${total_stock}</h3>
            <h3>Productos por debajo del stock:</h3>

`
minimos.forEach(p => {
    salida+= `<h4>${p.nombre}</h4>`
})

totales.innerHTML = salida;



