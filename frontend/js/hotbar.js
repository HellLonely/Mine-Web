const minecraftFolder = document.getElementById('minecraftFolder');
const minecraftLogs = document.getElementById('minecraftLogs');
const minecraftResourcePack = document.getElementById('minecraftResourcePack');
const minecraftshaderpacks = document.getElementById('minecraftshaderpacks');
const minecraftScreenshots = document.getElementById('minecraftScreenshots');
const minecraftFolderMods = document.getElementById('minecraftFolderMods');
const minecraftModPackData = document.getElementById('minecraftModPackData');

minecraftFolder.addEventListener('click', () => {
    fetch("/minecraft-folder", {
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


minecraftLogs.addEventListener('click', () => {
    fetch("/minecraft-logs", {
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

minecraftResourcePack.addEventListener('click', () => {
    fetch("/minecraft-resourcepacks", {
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

minecraftshaderpacks.addEventListener('click', () => {
    fetch("/minecraft-shaderpacks", {
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

minecraftScreenshots.addEventListener('click', () => {
    fetch("/minecraft-screenshots", {
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


minecraftFolderMods.addEventListener('click', () => {
  fetch("/minecraft-foldermods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error al enviar el comando:", error);
    });
})

minecraftModPackData.addEventListener('click', () => {
  fetch("/minecraft-foldermodpackdata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error al enviar el comando:", error);
    });
})