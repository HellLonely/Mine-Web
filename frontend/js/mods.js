const fileListDiv = document.getElementById("modsSlide");
const deleteMod = document.getElementById("deleteMod");

const searchInput = document.getElementById("default-search");
let textoIngresado = "";

searchInput.addEventListener("input", function(event) {
  textoIngresado = event.target.value;
  console.log(textoIngresado);
  mostrarMods();
});


deleteMod.style.display = "none";

function mostrarMods(){
    fetch("/get-files")
      .then((response) => response.json())
      .then((data) => {
        fileListDiv.innerHTML = ""; // Limpiamos la lista de archivos antes de mostrar los nuevos
        data.forEach((fileName) => {

          if(fileName.toLowerCase().includes(textoIngresado.toLowerCase())){ // Aplicar filtro de busqueda, sin distinguir entre masyusculas ni minusculas
            const listItem = document.createElement("p");


            const MyMods_DivMod = document.createElement("div");
            MyMods_DivMod.classList.add('DivMod')

            const JarImage = document.createElement('div');
            JarImage.innerHTML=`
            <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z"/>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
            </svg>`

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `
            <svg class="w-6 h-6 text-red-600 hover:text-red-100 shadow-xl hover:shadow-lg dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
            </svg>`


            listItem.textContent = fileName;
            MyMods_DivMod.appendChild(deleteButton)
            fileListDiv.appendChild(MyMods_DivMod);
            MyMods_DivMod.appendChild(listItem)
            MyMods_DivMod.appendChild(JarImage)
            

            deleteButton.addEventListener('click',() => {
              deleteMod.style.display = "block";

              const deteleButtonDIV = document.createElement('div');

              deteleButtonDIV.innerHTML =`
              <button id="deleteModButton" type="submit" class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
              Yes, I'm sure
              </button>`;

              document.getElementById("insertMe2").appendChild(deteleButtonDIV);

              const nodeteleModButton = document.getElementById("confirDeleteMod")

              nodeteleModButton.addEventListener('click', () =>{
                deleteMod.style.display = "none";
                deteleButtonDIV.remove()
              })

              deteleButtonDIV.addEventListener('click', () =>{
                deleteMod.style.display = "none";
                
                fetch('/delete-mod', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ nombreArchivo: fileName})
                })
                .then(response => response.json())
                .then(data => {
                  console.log(data.message); 
                })
                .catch(error => {
                  console.error('Error al eliminar el archivo:', error);
                });
                mostrarMods()

                deteleButtonDIV.remove()
              })

            })
          }
        });
        const modsSlideCount = document.getElementById("modsSlideCount");
        modsSlideCount.textContent = 'Amount of Mods: '+data.length
      })
      .catch((error) => {
        console.error("Error al obtener los nombres de los archivos:", error);
      });
}

mostrarMods()