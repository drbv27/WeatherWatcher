const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');


window.addEventListener('load', () => {
    formulario.addEventListener('submit', searchWeather);
} )


function searchWeather(e) {
    e.preventDefault();

    //Validar hay uno que tiene id ciudad y otro pais, el value es para saber que escribio el user
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        //Hubo un error
        mostrarError('Ambos campos son Obligatorios.');
        return; //con este detenemos nuestro codigo.

    }

    //Consultar la API si pasa la validacion
    consultarAPI(ciudad, pais);
}


function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100')//la uso porque se que no esta en ningun otro lado
    if(!alerta){
            //CREEMOS UNA ALERTA CON SCRITING
    const alerta = document.createElement('div');
    //clases de tailwind
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4',
     'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center' );
    
     alerta.innerHTML = `
        <strong class="font-bold">Error!!</strong>
        <span class="block">${mensaje}</span>
     `;
     container.appendChild(alerta);
        //ELIMINEMOS LA ALERTA
        setTimeout(()=>{
            alerta.remove();
        }, 5000)

    }
}

function consultarAPI(ciudad, pais) {
    const appID = '47f3586bf5961638beb5900079181fee';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    Spinner();

    fetch(url) //ya sabemos que es json....la mayoria es asi...excepto los de pago XML
        .then( respuesta => respuesta.json() )
        .then( datos => {
            limpiarHTML();
            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada.')
                return;
            }
            //Imprimir la respuesta en el html
            showWeather(datos);
        })
}

function showWeather(datos){
    const {name, main: { temp, temp_max, temp_min, feels_like}, weather:{id, description, icon}} = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);
    const sensacion = kelvinACentigrados(feels_like);
    
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `El Clima en ${name}, es:`;
    nombreCiudad.classList.add('font-bold', 'text-2xl', )
    
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');

    const tempSensa = document.createElement('p');
    tempSensa.innerHTML = `Sensación Termica: ${sensacion} &#8451;`;
    tempSensa.classList.add('text-2xl');

    const iconoC = document.createElement('p');
    iconoC.innerHTML = ` ${icon}`;
    /* tempSensa.classList.add('text-2xl'); */

    //recordemos que hay un selector resultado
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    resultadoDiv.appendChild(tempSensa);
    resultadoDiv.appendChild(iconoC);
    

    resultado.appendChild(resultadoDiv);
    
}

function kelvinACentigrados(grados){
    return parseInt(grados - 273.15);
}

//CONVIRTAMOLA EN ARROW FUNCTION
/* const kelvinACentigrados = gardos => parseInt(grados - 273.15); */


function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner (){
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}



// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  }).add({
    targets: '.ml3',
    opacity: 0,
    duration: 500,
    easing: "easeOutExpo",
    delay: 500
  });