// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let obtener = document.getElementById("obtener");

// se le pone async y await para que espere a la respuesta de las funciones con la respuesta
obtener.addEventListener('submit', async e => {
    e.preventDefault();

    let palabraEliminar = document.getElementById("palabraObte").value;
    let rimaEliminar = document.getElementById("rimaObte").value;
    let eliminada = await obtenerRimas(palabraEliminar, rimaEliminar);

    if(eliminada){
        console.log(eliminada);
        info.innerText = "La rima " + rimaEliminar + " se ha elimiando de la palabra " + palabraEliminar;

        error.innerText = "";
    }    
});



async function deletePalabra(palabraEliminar, rimaEliminar) {
    try {
        const resp = await fetch(`${SERVER}/rimas/rima/${palabraEliminar}/${rimaEliminar}`, {
            method: 'DELETE'
        });
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`);
        if(resp.status == 200) { // Borrado
            return true;
        }
    } catch (error) {
        console.error("Fallo insertando el producto:", error);
    }
}

async function obtenerRimas(palabraEliminar, rimaEliminar){
    if(isNaN(palabraEliminar) || isNaN(rimaEliminar)){
        let eliminada = deletePalabra(palabraEliminar, rimaEliminar);

        info.innerText = "";
        error.innerText =  "Alguna de las palabras no esta en el diccionario";

        return eliminada;
    }
    else{
        info.innerText = "";
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
