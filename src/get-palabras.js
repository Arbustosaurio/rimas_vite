// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let obtener = document.getElementById("obtener");

// se le pone async y await para que espere a la respuesta de las funciones con la respuesta
obtener.addEventListener('submit', async e => {
    e.preventDefault();

    let rimaConsultar = document.getElementById("rimaObte").value;
    let palabras = await obtenerPalabras(rimaConsultar);

    if(palabras){
        let palabrasMostrar = palabras.map(objeto => objeto.palabra).join(", ");
        console.log(palabras);
        info.innerText = "La rima " + rimaConsultar + " esta relacionada con las palabras:  " + palabrasMostrar;

        error.innerText = "";
    }    
});



async function getPalabras(rimaConsultar) {
    try {
        const resp = await fetch(`${SERVER}/rimas/rima/${rimaConsultar}`); // promesa fetch
        // si el status no está entre 200 y 299, se produce error
        if (!resp.ok) throw new Error(`Error: ${resp.status} ${resp.statusText}`); 
        // JSON a Objeto
        const json = await resp.json(); // promesa .json()
        console.log(json);
        let rimasGet = json.data;
        console.log(rimasGet);

        return rimasGet;
    } catch (error) {
        console.error("Fallo en la obtención de productos:", error);
    }
}


async function obtenerPalabras(rimaConsultar){
    if(isNaN(rimaConsultar)){
        let rimasObt = getPalabras(rimaConsultar);

        info.innerText = "";
        error.innerText =  "La rima no esta en el diccionario";

        return rimasObt;
    }
    else{
        info.innerText = "";
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
