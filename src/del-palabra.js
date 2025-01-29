// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let obtener = document.getElementById("obtener");

// se le pone async y await para que espere a la respuesta de las funciones con la respuesta
obtener.addEventListener('submit', async e => {
    e.preventDefault();

    let palabraEliminar = document.getElementById("palabraObte").value;
    let eliminada = await obtenerRimas(palabraEliminar);

    if(eliminada){
        console.log(eliminada);
        info.innerText = "La palabra " + palabraEliminar + " se ha elimiando";

        error.innerText = "";
    }    
});



async function deletePalabra(palabraEliminar) {
    try {
        const resp = await fetch(`${SERVER}/rimas/palabra/${palabraEliminar}`, {
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

async function obtenerRimas(palabraEliminar){
    if(isNaN(palabraEliminar)){
        let eliminada = deletePalabra(palabraEliminar);

        info.innerText = "";
        error.innerText =  "La palabra no esta en el diccionario";

        return eliminada;
    }
    else{
        info.innerText = "";
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
