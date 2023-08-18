const shareSelect = document.getElementById("share-pack");
const ShareActionButton = document.getElementById("ShareActionButton");

function obtainModPacks() {
  fetch("/lista-archivos")
    .then((response) => response.json())
    .then((files) => {
      files.forEach((nombreArchivo) => {
        fetch(`/archivo-json/${nombreArchivo}`)
          .then((response) => response.json())
          .then((data) => {
            const jsonName = data.nombreArchivo;
            const jsonData = data.contenidoJson;

            const option = document.createElement("option");
            option.value = jsonName;
            option.textContent = jsonData.name;

            shareSelect.appendChild(option);
          });
      });
    })

    .catch((error) => {
      console.error("Error al obtener la lista de archivos:", error);
    });
}

obtainModPacks();

ShareActionButton.addEventListener("click", () => {
  let SharePatherJson = shareSelect.value;

  if (SharePatherJson === "mods") {
    fetch("/compressFolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderToCompress: "mods",
      }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `mods.zip`;
        a.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("Error al comprimir carpeta:", error);
      });
  } else
    fetch("/lista-archivos")
      .then((response) => response.json())
      .then((files) => {
        files.forEach((nombreArchivo) => {
          fetch(`/archivo-json/${nombreArchivo}`)
            .then((response) => response.json())
            .then((data) => {
              const jsonName = data.nombreArchivo;
              const jsonData = data.contenidoJson;

              if (jsonName === SharePatherJson) {
                console.log(jsonData.ruta);

                fetch("/compressFolder", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    folderToCompress: jsonData.ruta,
                  }),
                })
                  .then((response) => response.blob())
                  .then((blob) => {
                    const blobUrl = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = blobUrl;
                    a.download = `${jsonData.name}.zip`;
                    a.click();
                    URL.revokeObjectURL(blobUrl);
                  })
                  .catch((error) => {
                    console.error("Error al comprimir carpeta:", error);
                  });
              }
            });
        });
      });
});
