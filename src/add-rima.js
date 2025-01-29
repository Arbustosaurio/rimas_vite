// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let agregar = document.getElementById("agregar");

agregar.addEventListener('submit', e => {
    e.preventDefault();

    let palabra = document.getElementById("palabra").value;
    let rima = document.getElementById("rima").value;
    agregarRima(palabra, rima);
});


async function postEvento(diccionario) {
    try {
        // Fetch con segundo parámetro con la información
        const resp = await fetch(`${SERVER}/rimas`, {
            method: 'POST', // Método
            body: JSON.stringify(diccionario), // pasamos producto de Objeto a JSON en el body
            headers: { // Indicamos encabezados
                'Content-Type': 'application/json'
            }
        });
        // si el status no está entre 200 y 299, se produce error
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);

        location.assign("index.html");

    } catch (error) {
        console.error("Fallo insertando el producto:", error);
    }
}


function agregarRima(palabra, rima){
    
    if(isNaN(palabra) && isNaN(rima)){

        let subir = {palabra: document.getElementById("palabra").value,
            rima: document.getElementById("rima").value};

        postEvento(subir);
    }
    else{
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
