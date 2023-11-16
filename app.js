const raiz = document.getElementById("raiz"); // declara una constante,document.getElementById("root")` busca y selecciona un elemento HTML con el atributo `id` igual a "root".
const totalPersonajes = document.getElementById("total-personajes");//document.getElementById("total-personajes")` busca y selecciona un elemento HTML con el atributo `id` igual a "total-personajes".
let pagina = 1;//inicializa con el valor 1.La variable `pagina` se utiliza para almacenar el número de página actual.
let total = 0; //se utiliza para almacenar un conteo total o acumulativo.

//filtros
const todos = document.getElementById("todos");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const sinGenero = document.getElementById("sinGenero");
const noSeSabe = document.getElementById("noSeSabe");

const hamburguesa = document.querySelector('.hamburguesa');
const filtrosHambu = document.querySelector('.filtros-hambu');

hamburguesa.addEventListener('click', () => {
  filtrosHambu.classList.toggle('show');
});


//Paginado
// buscan y seleccionan un elemento HTML con el atributo `id` igual a ("pagina-actual","next-page",etc). El elemento seleccionado se asigna a la constante (`paginaActual,"next-page",etc`).
const paginaActual = document.getElementById("pagina-actual");
const proximaPagina = document.getElementById("next-page");
const prevPagina = document.getElementById("prev-page");
const totalPaginas = document.getElementById("total-paginas");
const primerPagina = document.getElementById("first-page");
const ultimaPagina = document.getElementById("last-page");

const getData = async () => { // declara una función llamada `getData` que tiene un parámetro llamado `pagina`.La palabra clave `async` indica que la función es asíncrona y puede utilizar el operador `await` dentro de ella.

  const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;//declara una constante llamada `URL` que contiene la URL de la API para obtener los datos de los personajes.La variable `pagina` se utiliza para especificar la página de la API que se desea obtener.

  const response = await fetch(URL);//realiza una solicitud HTTP utilizando la función `fetch` para obtener los datos de la API.La palabra clave `await` indica que se debe esperar a que la solicitud se complete antes de continuar con la ejecución del código.

  //console.log(response);
  const json = await response.json();//convierte la respuesta de la solicitud HTTP en formato JSON utilizando el método `json()` proporcionado por el objeto Response.
  //La palabra clave `await` indica que se debe esperar a que se complete la conversión antes de continuar con la ejecución del código.

  //El operador `await` se utiliza en una función `async` para pausar la ejecución del código hasta que una promesa se resuelva o se cumpla. Permite escribir código asíncrono de manera más sincrónica y fácil de leer.

  /* 1-Setear en qué pagina estamos x
  2-Tenemos que hacer una funcion que renderice las cards x
  3-Tenemos que actualizar el paginado 
  */
  total = json.info.pages;//asigna el número total de páginas disponibles en la respuesta JSON a la variable `total`.

  //actualizan el contenido HTML de los elementos con los IDs "pagina-actual" y "total-paginas" respectivamente, con los valores de la página actual y el total de páginas.
  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = total;

  // llama a una función llamada `printData` y pasa los resultados de la respuesta JSON como argumento.La función `printData` es responsable de renderizar las cartas (cards) con la información de los personajes
  printData(json.results);
  updatePagination();
  data = json;//asigna el objeto JSON completo a la variable `data`.
  return json;//devuelve el objeto JSON completo como resultado de la función `getData`.
};

getData(pagina); // llama a una función llamada "getData" y pasa el argumento "pagina" como parámetro. Esta línea de código ejecuta la función y realiza alguna operación utilizando el valor proporcionado en "pagina".
let data = {};//crea una variable llamada "data" y la inicializa como un objeto vacío. Esta línea de código crea un objeto que se puede utilizar para almacenar y manipular datos en el programa.

const printData = (arr) => {
  let card = "";
  totalPersonajes.innerHTML = arr.length;
  arr.forEach((personaje) => {
    card =
      card +
      `
      <div>
        <div class="card">
            <div class="card-image">
                <img src=${personaje.image} alt="">
            </div>
            <div class="card-content">
                <p>Id:${personaje.id}</p>
                <p>Nombre:${personaje.name}</p>
                <p>Estado:${personaje.status}</p>
                <p>Especies:${personaje.species}</p>
                <p>Genero:${personaje.gender}</p>
                <p>Origen:${personaje.origin.name}</p>
                <p>Locacion:${personaje.location.name}</p>   
            </div>
            <div class="card-action">
            <a href="https://rickandmortyapi.com/api/character/${personaje.id}"><button>Ver más...</button></a>
        </div>
        </div>
        
    </div>
    `;
  });
  raiz.innerHTML = card;
};

//Estas líneas de código son parte de una función llamada "pagination" que utiliza promesas y eventos para implementar la paginación en una aplicación:
const pagination = async (prom) => {   //declara una función asíncrona llamada "pagination" que toma una promesa como argumento.
  const result = await prom;// espera a que la promesa se resuelva y asigna el resultado a la variable "result".
  //Las siguientes líneas de código agregan event listeners a los elementos HTML con los id "nextPage", "prevPage", "firstPage" y "lastPage".
  proximaPagina.addEventListener("click", () => { //Cuando se hace clic en el botón "nextPage", se ejecuta la función de flecha. Aumenta el valor de la variable "pagina" en 1, llama a la función "getData()", y luego imprime el valor actualizado de "pagina" en la consola.
    pagina += 1;
    getData();
  });

  prevPagina.addEventListener("click", () => {//Cuando se hace clic en el botón "prevPage", se ejecuta la función de flecha. Disminuye el valor de la variable "pagina" en 1, llama a la función "getData()", y luego imprime el valor actualizado de "pagina" en la consola.
    pagina -= 1;
    getData();
  });

  primerPagina.addEventListener("click", () => {//Cuando se hace clic en el botón "firstPage", se ejecuta la función de flecha. Si el valor de la variable "pagina" es mayor o igual a 2, se establece el valor de "pagina" en 1, llama a la función "getData()", y luego imprime el valor actualizado de "pagina" en la consola.
    if (pagina >= 2) {
      pagina = 1;
      getData();
    }
  });
  ultimaPagina.addEventListener("click", () => {//Cuando se hace clic en el botón "lastPage", se ejecuta la función de flecha. Si el valor de la variable "pagina" es menor que el número total de páginas (obtenido del resultado), se establece el valor de "pagina" en el número total de páginas, llama a la función "getData()", y luego imprime el valor actualizado de "pagina" en la consola.
    if (pagina < result.info.pages) {
      pagina = result.info.pages;
      getData();
    }
  });
};
const updatePagination = () => {
  if (pagina <= 1) {
    prevPagina.disabled = true;
    primerPagina.disabled = true;
  } else {
    prevPagina.disabled = false;
    primerPagina.disabled = false;
  }

  if (pagina === total) {
    ultimaPagina.disabled = true;
    proximaPagina.disabled = true;
  } else {
    ultimaPagina.disabled = false;
    proximaPagina.disabled = false;
  }
};

//Filtros
mujeres.addEventListener("click", () => {
  const arr = data.results;
  const arrMujeres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Female") {
      arrMujeres.push(arr[i]);
    }
  }

  printData(arrMujeres);
});

hombres.addEventListener("click", () => {
  const arr = data.results;
  const arrHombres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Male") {
      arrHombres.push(arr[i]);
    }
  }
  printData(arrHombres);
});
//Primero: Elemento html
//.addEventListener("evento", ()=>{})
sinGenero.addEventListener("click", () => {
  const arr = data.results;
  const arrSinGenero = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Genderless") {
      arrSinGenero.push(arr[i]);
    }
  }
  printData(arrSinGenero);
});

noSeSabe.addEventListener("click", () => {
  const arr = data.results;
  const arrNoSeSabe = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "unknown") {
      arrNoSeSabe.push(arr[i]);
    }
  }
  printData(arrNoSeSabe);
});

todos.addEventListener("click", () => {
  const arr = data.results;
  printData(arr);
});

pagination(getData());//lama a la función "pagination" y le pasa el resultado de la función "getData()" como argumento.
//Esto significa que la función "getData()" se ejecutará y devolverá una promesa. Esa promesa se pasará como argumento a la función "pagination". Luego, la función "pagination"
//podrá trabajar con el resultado de la promesa para implementar la paginación en la aplicación.
