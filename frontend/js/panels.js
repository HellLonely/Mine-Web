const mainPanel = document.getElementById('mainPanel');
const paneltext = document.getElementById('panel-text');

const ButtonDataPack = document.getElementById('ButtonModPack');
const ButtonCreateModPack = document.getElementById('ButtonCreateModPack');
const ButtonSumbit = document.getElementById('sumbit-boton');

const createpackpanel = document.getElementById('create-pack-panel');
const dataPanel = document.getElementById('jsonDiv');
const paneLConfirmPop = document.getElementById('paneLConfirmPop');

const AssistancePanel = document.getElementById('AssistancePanel');
const ButtonAssistance = document.getElementById('ButtonAssistance');

const ButtonMyMods = document.getElementById('ButtonMyMods');
const MyModsPanel = document.getElementById('MyModsPanel');

const jsonModPack_DeleteDiv = document.getElementById('deleteModal');
const jsonModPack_DIV_NoDelete = document.getElementById('confirDelete');

const ScreenShotsButton = document.getElementById('ScreenShotsButton');
const ScreenShotsPanel = document.getElementById('ScreenShotsPanel');

const LauncherProfilePanel = document.getElementById('LauncherProfilePanel');
const LauncherProfileButton = document.getElementById('LauncherProfileButton');


const ZipCompresorPanel = document.getElementById('ZipCompresor');
const ZipCompresorButton = document.getElementById('ZipCompresorButton');


jsonModPack_DeleteDiv.style.display = 'none';

MyModsPanel.style.display = 'none';

paneLConfirmPop.style.display = 'none';

AssistancePanel.style.display = 'none';

createpackpanel.style.display = 'none';

ScreenShotsPanel.style.display = 'none';

LauncherProfilePanel.style.display = 'none';

ZipCompresorPanel.style.display = 'none';


defaultPanel = `

<div class="default-panel">
    <div class="box-text">Web Mine</div>
</div>
`;

datapackPanel = `

`

/**
 * Todo: This is the start config
*/
paneltext.textContent = 'ModPacks'
document.getElementById('filterPanel').style.display = 'flex';

//mainPanel.innerHTML = defaultPanel;

//paneltext.textContent = ''





ButtonModPack.addEventListener('click',() => {
    createpackpanel.style.display = 'none';
    AssistancePanel.style.display = 'none';
    MyModsPanel.style.display = 'none';
    LauncherProfilePanel.style.display = 'none';
    ScreenShotsPanel.style.display = 'none';
    ZipCompresorPanel.style.display = 'none';
    dataPanel.style.display = 'grid';
    paneltext.textContent = 'ModPacks'
    document.getElementById('filterPanel').style.display = 'flex';
});



ButtonCreateModPack.addEventListener('click',() => {
    
    createpackpanel.style.display = 'block';
    AssistancePanel.style.display = 'none';
    LauncherProfilePanel.style.display = 'none';
    ZipCompresorPanel.style.display = 'none';
    ScreenShotsPanel.style.display = 'none';
    MyModsPanel.style.display = 'none';
    dataPanel.style.display = 'none';
    paneltext.textContent = 'Create ModPacks'
    document.getElementById('filterPanel').style.display = 'none';
});

ButtonAssistance.addEventListener('click',() => {
  AssistancePanel.style.display = 'flex';
  createpackpanel.style.display = 'none';
  ZipCompresorPanel.style.display = 'none';
  LauncherProfilePanel.style.display = 'none';
  ScreenShotsPanel.style.display = 'none';
  MyModsPanel.style.display = 'none';
  dataPanel.style.display = 'none';
  paneltext.textContent = 'Assistance'
  document.getElementById('filterPanel').style.display = 'none';
});

ButtonMyMods.addEventListener('click', () => {
  AssistancePanel.style.display = 'none';
  createpackpanel.style.display = 'none';
  LauncherProfilePanel.style.display = 'none';
  ZipCompresorPanel.style.display = 'none';
  MyModsPanel.style.display = 'flex';
  ScreenShotsPanel.style.display = 'none';
  dataPanel.style.display = 'none';
  paneltext.textContent = 'My Mods';
  mostrarMods();
  document.getElementById('filterPanel').style.display = 'none';
})

ScreenShotsButton.addEventListener('click', () => {
  AssistancePanel.style.display = 'none';
  createpackpanel.style.display = 'none';
  LauncherProfilePanel.style.display = 'none';
  MyModsPanel.style.display = 'none';
  ZipCompresorPanel.style.display = 'none';
  ScreenShotsPanel.style.display = 'grid';
  dataPanel.style.display = 'none';
  paneltext.textContent = 'Screen Shots';
  mostrarMods();
  document.getElementById('filterPanel').style.display = 'none';
})

LauncherProfileButton.addEventListener('click', () => {
  AssistancePanel.style.display = 'none';
  createpackpanel.style.display = 'none';
  LauncherProfilePanel.style.display = 'flex';
  ZipCompresorPanel.style.display = 'none';
  MyModsPanel.style.display = 'none';
  ScreenShotsPanel.style.display = 'none';
  dataPanel.style.display = 'none';
  paneltext.textContent = 'Profiles';
  mostrarMods();
  document.getElementById('filterPanel').style.display = 'none';
})

ZipCompresorButton.addEventListener('click', () => {
  AssistancePanel.style.display = 'none';
  createpackpanel.style.display = 'none';
  LauncherProfilePanel.style.display = 'none';
  MyModsPanel.style.display = 'none';
  ZipCompresorPanel.style.display = 'flex';
  ScreenShotsPanel.style.display = 'none';
  dataPanel.style.display = 'none';
  paneltext.textContent = 'Share & Recive';
  mostrarMods();
  document.getElementById('filterPanel').style.display = 'none';
})


ButtonSumbit.addEventListener('click',() => {
  paneLConfirmPop.style.display = 'block';
  mostrarArchivos()
})


const panelConfirm = document.getElementById('panelConfirm');
const panelButton = document.getElementById('panelButton');

panelButton.addEventListener('click',() => {
    paneLConfirmPop.style.display = 'none';
    createpackpanel.style.display = 'none';
    paneltext.textContent = 'ModPacks';
    dataPanel.style.display = 'grid';
    mostrarArchivos();
    console.log('panelConfirm clicked');
})

const paneLConfirmPop2 = document.getElementById('paneLConfirmPop2');
paneLConfirmPop2.style.display = 'none';

const panelButton_2 = document.getElementById('panelButton_2');

panelButton_2.addEventListener('click', () => {
  paneLConfirmPop2.style.display = 'none';
})


/**
 * ? Data for filter 
*/

const filterGestor = document.getElementById('filterGestor')
filterGestor.addEventListener('change', () => {
  mostrarArchivos()
})

const filterVersion = document.getElementById('filterVersion')
filterVersion.addEventListener('change', () => {
  mostrarArchivos()

})


function showScreenshots() {
  fetch('/get-screenshots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      
      data.forEach((element) => {
        const image = document.createElement('img')
        image.src = element
        console.log(element);
        ScreenShotsPanel.appendChild(image);
      });

    })
    .catch((error) => {
      console.error('Error al obtener las rutas de las fotos:', error);
    });
}

function screnn(){
  fetch('/get-screenshots')
    .then(response => response.json())
    .then(imagePaths => {
     
      imagePaths.forEach(imagePath => {
        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = 'Imagen';
        ScreenShotsPanel.appendChild(imgElement);
      });
    })
    .catch(error => {
      console.error('Error al obtener la lista de imágenes:', error);
    });
}

//showScreenshots()
screnn()



function mostrarArchivos() {
  fetch("/lista-archivos")
    .then((response) => response.json())
    .then((files) => {
      const jsonDiv = document.getElementById("jsonDiv");
      jsonDiv.innerHTML = ""; // Limpiar contenido anterior

      console.log(filterVersion.value);
      if(filterVersion.value === ""){
        filterVersion.value = "none"
      }

      files.forEach((nombreArchivo) => {
        fetch(`/archivo-json/${nombreArchivo}`)
          .then((response) => response.json())
          .then((data) => {

            const jsonName = data.nombreArchivo;
            const jsonData = data.contenidoJson;

            // Filter function 😁
            if (filterGestor.value === jsonData.gestor) {
              if (filterVersion.value === jsonData.version) {
                showJson(jsonData.nombreArchivo);
              } else if (filterVersion.value === "none") {
                showJson(jsonData,jsonName);
              }
            } else if (filterGestor.value === "none") {
              if (filterVersion.value === jsonData.version) {
                showJson(jsonData,jsonName);
              } else if (filterVersion.value === "none") {
                showJson(jsonData,jsonName);
              }
            }
          })
          
      });

      

    })
    
    .catch((error) => {
      console.error("Error al obtener la lista de archivos:", error);
    });

  
}

  
function showJson(jsonData,jsonName) {
  const jsonModPack = document.createElement("div");
  const jsonModPack_Info = document.createElement("div");
  const jsonModPack_InfoDescription = document.createElement("div");
  const jsonModPack_DownButton = document.createElement("div");
  const jsonModPack_Content = document.createElement("div");
  const jsonModPack_name = document.createElement("p");
  const jsonModPack_version = document.createElement("p");
  const jsonModPack_gestor = document.createElement("p");
  const jsonModPack_ruta = document.createElement("p");
  const jsonModPack_EnableButton = document.createElement("button");
  const jsonModPack_DIRButton = document.createElement("button");
  const jsonModPack_DeleteButton = document.createElement("button");

  jsonModPack_DIRButton.innerHTML = `
                <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M4.09 7.586A1 1 0 0 1 5 7h13V6a2 2 0 0 0-2-2h-4.557L9.043.8a2.009 2.009 0 0 0-1.6-.8H2a2 2 0 0 0-2 2v14c.001.154.02.308.058.457L4.09 7.586Z"/>
                <path d="M6.05 9 2 17.952c.14.031.281.047.424.048h12.95a.992.992 0 0 0 .909-.594L20 9H6.05Z"/>
                </svg>`;

  jsonModPack_DIRButton.classList.add("DIRButton");

  jsonModPack_DIRButton.addEventListener("mouseover", () => {
    jsonModPack_DIRButton.innerHTML = `
                  <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5"/>
                  </svg>`;
  });

  jsonModPack_DeleteButton.innerHTML=`
  <svg class="w-6 h-6 text-red-600 hover:text-red-100 shadow-xl hover:shadow-lg dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
    <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
  </svg>
  `
    
  jsonModPack_DeleteDiv.style.display = 'none';

  


  jsonModPack_DIV_NoDelete.addEventListener('click',() => {
    jsonModPack_DeleteDiv.style.display = 'none';
  });

  jsonModPack_DeleteButton.addEventListener('click', () => {
    const jsonModPack_Delete_InsertDiv = document.createElement("div");

  

    jsonModPack_Delete_InsertDiv.innerHTML =`
    <button id="deleteJson" type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        Yes, I'm sure
                                    </button>`;


    document.getElementById("insertMe").appendChild(jsonModPack_Delete_InsertDiv);
    jsonModPack_DeleteDiv.style.display = 'block';


    const jsonModPack_DIV_Delete = document.getElementById('deleteJson')

    jsonModPack_DIV_NoDelete.addEventListener('click',() => {
      jsonModPack_DIV_Delete.remove();
    })
    

    jsonModPack_DIV_Delete.addEventListener('click',() => {
      jsonModPack_DeleteDiv.style.display = 'none';

      console.log('Archivo eliminar',jsonName);
      fetch('/eliminar-archivo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombreArchivo: jsonName})
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message); 
      })
      .catch(error => {
        console.error('Error al eliminar el archivo:', error);
      });
      mostrarArchivos()
    });
    
  })

  jsonModPack_DIRButton.addEventListener("click", () => {
    const comando = jsonData.ruta;
    fetch("/recibir-comando", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comando: comando }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.mensaje);
      })
      .catch((error) => {
        console.error("Error al enviar el comando:", error);
      });
  });

  

  jsonModPack_DownButton.innerHTML = `
                <svg id="DropDown" class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                `;

  jsonModPack_DownButton.classList.add("DownButton");

  jsonModPack_InfoDescription.classList.add("InfoDescription");
  jsonModPack_InfoDescription.textContent = jsonData.description;

  jsonModPack_name.classList.add("ModPack-text");
  jsonModPack_name.textContent = jsonData.name;

  jsonModPack_version.classList.add("ModPack-text-version");
  jsonModPack_version.textContent = "Version: " + jsonData.version;

  jsonModPack_gestor.classList.add("ModPack-text-gestor");
  jsonModPack_gestor.textContent = "Gestor: " + jsonData.gestor;

  jsonModPack_ruta.classList.add("ModPack-text-ruta");
  jsonModPack_ruta.textContent = "Ruta: " + jsonData.ruta;

  jsonModPack_Info.classList.add("ModPack-Info");
  jsonModPack_Info.appendChild(jsonModPack_name);
  jsonModPack_Info.appendChild(jsonModPack_version);

  jsonModPack_EnableButton.textContent = "Enable";
  jsonModPack_EnableButton.id = "EnableButton";

  jsonModPack_EnableButton.classList.add(
    "bg-gradient-to-br",
    "from-green-400",
    "to-blue-600",
    "hover:bg-gradient-to-bl",
    "EnableButton"
  );

  jsonModPack_Content.classList.add("ModPack-order");

  jsonModPack_InfoDescription.style.display = "none";

  jsonModPack_InfoDescription.classList.add("ModPack-Description");

  /**
   * Todo: Enable modpack and configure the mod folder.
  */

  jsonModPack_EnableButton.onclick = () => {

    paneLConfirmPop2.style.display = "block";

    const jsonInformation = {
      jsonName : jsonData.name,
      rutaCarpeta : jsonData.ruta
    }

    fetch("/copiar-archivos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonInformation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error al copiar archivos:", error);
      });
  };

  //jsonModPack_InfoDescription.appendChild(jsonModPack_ruta)
  jsonModPack_InfoDescription.appendChild(jsonModPack_gestor);

  jsonModPack_Info.appendChild(jsonModPack_name);
  jsonModPack_Content.appendChild(jsonModPack_EnableButton);
  jsonModPack_Content.appendChild(jsonModPack_Info);
  jsonModPack_Content.appendChild(jsonModPack_DownButton);
  jsonModPack_Content.appendChild(jsonModPack_DIRButton);
  jsonModPack_Content.appendChild(jsonModPack_DeleteButton);
  jsonModPack_Content.appendChild(jsonModPack_DeleteDiv);
  

  jsonModPack.appendChild(jsonModPack_Content);
  jsonModPack.appendChild(jsonModPack_InfoDescription);

  jsonDiv.appendChild(jsonModPack);

  jsonModPack_DownButton.addEventListener("mouseover", () => {
    jsonModPack_InfoDescription.style.display = "block";
  });

  jsonModPack_DownButton.addEventListener("mouseout", () => {
    jsonModPack_InfoDescription.style.display = "none";
  });
  
}

mostrarArchivos();
