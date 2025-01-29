// Daniel Gaspar Candela

"use strict";

const SERVER = 'http://localhost:2000';

let obtener = document.getElementById("obtener");

// se le pone async y await para que espere a la respuesta de las funciones con la respuesta
obtener.addEventListener('submit', async e => {
    e.preventDefault();

    let palabraConsultar = document.getElementById("palabraObte").value;
    let rimas = await obtenerRimas(palabraConsultar);

    if(rimas){
        let rimasMostrar = rimas.map(objeto => objeto.rima).join(", ");
        console.log(rimas);
        info.innerText = "La palabra " + palabraConsultar + " tiene como rimas:  " + rimasMostrar;
    
        error.innerText = "";
    }
    
});



async function getRimas(palabraConsultar) {
    try {
        const resp = await fetch(`${SERVER}/rimas/palabra/${palabraConsultar}`); // promesa fetch
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


async function obtenerRimas(palabraConsultar){
    if(isNaN(palabraConsultar)){
        let rimasObt = getRimas(palabraConsultar);

        info.innerText = "";
        error.innerText =  "La palabra no esta en el diccionario";

        return rimasObt;
    }
    else{
        info.innerText = "";
        error.innerText =  "Debes introducir palabras, ni numeros ni en blanco";
    }
}
