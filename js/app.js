const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", findWheter);
});

function findWheter(e) {
  e.preventDefault();
  console.log("Buscando clima");
  //validar el formulario
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  console.log(ciudad);
  console.log(pais);
  if (ciudad === "" || pais === "") {
    //hubo un error
    showMessage("Ambos campos son obligatorios");
    return;
  }

  //consultar API
  consultarAPI(ciudad, pais);
}

function showMessage(mensaje) {
  console.log(mensaje);
  //creamos una alerta
  const alert = document.querySelector(".bg-red-100");
  if (!alert) {
    const alert = document.createElement("div");
    alert.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    alert.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
  `;
    container.appendChild(alert);

    //eliminamos la alerta despues de 3 segundos
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

function consultarAPI(ciudad, pais) {
  const API_KEY = "4d9e8715473c8d91b4c9896fc4935a27";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}`;
  spinner();
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      clearHtml(); //limpiamos el html previo
      if (data.cod == "404") {
        showMessage("Ciudad no encontrada");
        return;
      }
      //imprime la respuesta en el HTML
      showWether(data);
    });
}
function showWether(data) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = data;

  const celciusTemp = temp - 273.15;
  const celciusTempMax = temp_max - 273.15;
  const celciusTempMin = temp_min - 273.15;

  console.log(`Temperatura normal ${celciusTemp}`);
  console.log(`Temperatura minima ${celciusTempMin}`);
  console.log(`Temperatura maxima ${celciusTempMax}`);

  const cityName = document.createElement("p");
  cityName.textContent = `${name}`;
  cityName.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${celciusTemp.toFixed(0)} &#8451`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMax = document.createElement("p");
  tempMax.innerHTML = `Max ${celciusTempMax.toFixed(0)} &#8451;`;
  tempMax.classList.add("text-xl");

  const tempMin = document.createElement("p");
  tempMin.innerHTML = `Min ${celciusTempMin.toFixed(0)} &#8451;`;
  tempMin.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");

  resultadoDiv.appendChild(cityName);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);

  resultado.appendChild(resultadoDiv);
}

function clearHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function spinner() {
    clearHtml();
  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");
  divSpinner.innerHTML = `
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    `;
    resultado.appendChild(divSpinner);
}
