const ocultButton = document.getElementById('ocultButton');
const starting = document.getElementById('starting');
let insertVersionData = document.getElementById('version');
const mainPage = document.getElementById('mainPage')


/**
 * ! DEVELOPMENT CONFIGURATION CHANGE DISPLAY TO DISTRIBUTE 
*/


//mainPage.style.display = 'none';

starting.style.display = 'none';


function ocultAnimation(){
  starting.classList.add('ocultAnimation')

  starting.addEventListener('animationend', () => {
    starting.style.display = 'none';
    mainPage.style.display = 'flex';

  })
}

setTimeout(ocultAnimation,0)

//updateProgressBar();

let contador = 0;
const maxIteraciones = 10;

const progressBar = document.getElementById('progress-bar');
number = progressBar.clientWidth

function updateBar(){
  number = number + 10;

  if (number > 100){
    progressBar.style.width = 100 + '%';
  }else{
    progressBar.style.width = number + '%';
  }
}

const bucle = setInterval(() => {
  updateBar();

  contador++;
  if (contador >= maxIteraciones) {
    clearInterval(bucle);
    document.getElementById('bar-div').classList.add('ocultAnimation');
    document.getElementById('bar-div').addEventListener('animationend', () => {
      document.getElementById('bar-div').style.display = 'none';
      setTimeout(ocultAnimation,100)
    })
  }
}, 100);

document.getElementById('donateButton').addEventListener('click', () => {
  const enlaceURL = 'https://www.paypal.com/paypalme/HellLonely?country.x=ES&locale.x=es_ES';

  window.open(enlaceURL, '_blank');
});

document.getElementById('bugReport').addEventListener('click', () => {
  const enlaceURL = 'https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=Duran';

  window.open(enlaceURL, '_blank');
});


fetch('/get-versions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
  
    data.forEach(version => {
      const optionElement = document.createElement('option');
      optionElement.value = version;
      optionElement.innerHTML = version;

      insertVersionData.appendChild(optionElement);
      filterVersion.appendChild(optionElement);
    });
    const optionSelectedElement = document.createElement('option');
    optionSelectedElement.selected = true;
    optionSelectedElement.textContent = 'No Filter'
    optionSelectedElement.value = 'none';
    insertVersionData.appendChild(optionSelectedElement)
    filterVersion.appendChild(optionSelectedElement)

  })
  .catch(error => {
    console.error('Error al obtener las versiones:', error);
  });




/**
 * 
 * Section to port other navogators
 * 
 * P.D Firefox is the better navigator.
 */

  function isFirefox() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return userAgent.includes("firefox");
  }

  if (isFirefox()) {
    window.addEventListener('beforeunload', (event) => {
      fetch("/out-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error al enviar el comando:", error);
        });
    });

    const closeGoogleDiv = document.getElementById('closeGoogleDiv');
    closeGoogleDiv.style.display = 'none';
  }

  const betaAlert = document.createElement('div')
  betaAlert.innerHTML = `
  <div id="alert-1" class="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span class="sr-only">Info</span>
              <div class="ml-3 text-sm font-medium">
                  This is an experimental version, it is possible to experience some bugs.
              </div>
                <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
                  <span class="sr-only">Close</span>
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
              </button>
          </div>
  `
  //betaAlert.classList.add('betaAlert');

  mainPanel.appendChild(betaAlert);



  const closeGoogle = document.getElementById('closeGoogle');
  
  closeGoogle.addEventListener('click',() => {
    console.log('Hola close')
      fetch("/out-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error al enviar el comando:", error);
        });


    const innerContent = document.getElementById('innerContent')
    const downPage = document.getElementById('downPage');


    downPage.style.display = 'none';

    innerContent.style.display = 'flex';
    innerContent.style.justifyContent = 'center';
    innerContent.style.alignItems = 'center';
    innerContent.innerHTML = `
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
                <h1 class="mb-4 text-7xl text-blue-500 tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">Goodbye</h1>
                <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">The application has been turned off</p>
                <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">The app has already been closed I hope to see you again, you can close the tab, thank you very much.</p>
            </div>   
        </div>
    </section>
    `
  });
