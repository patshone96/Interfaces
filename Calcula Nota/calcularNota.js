let tarea1 = document.getElementById('tarea1') 
let tarea2 = document.getElementById('tarea2')  
let examen = document.getElementById('examen')  
let btnCalcular = document.getElementById('calcular')
let result = document.getElementById('result')

btnCalcular.addEventListener('click', () => {

    
    let final; 
    

    let nota1 = parseFloat(tarea1.value);
    let nota2 = parseFloat(tarea2.value);
    let notaEx = parseFloat(examen.value);

    final = 0.7 * notaEx + 0.3 * ((nota1+nota2)/2)
    let texto_salida = `<h3>Tu nota fina es de ${final}</h3>`

    result.innerHTML = texto_salida

    

})



