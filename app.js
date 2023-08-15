const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const opn = require('opn');
const { exec } = require('child_process');
const minecraftDir = path.join(process.env.APPDATA, '.minecraft');
const axios = require('axios');
const AdmZip = require('adm-zip');

opn('http://localhost:3000');

/**
 *  Enable static assets to enable css and javascript 
*/
const minecraftScreenshotsPath = path.join(process.env.APPDATA, '.minecraft','screenshots');
app.use(express.static('/screenshots'));



app.use(express.static(path.join(__dirname, 'frontend')));


app.use(express.static('public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use(express.json());


app.listen(port, () => {
  console.log(`                                 
  _ _ _     _      _____ _         
 | | | |___| |_   |     |_|___ ___ 
 | | | | -_| . |  | | | | |   | -_|
 |_____|___|___|  |_|_|_|_|_|_|___|
                                   `)

  console.log(`⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘`)
  console.log(`\nWeb Mine se esta iniciando en http://localhost:${port}`);

});

fs.readdir(minecraftDir, (error, archivos) => {
  if (error) {
    console.error('Error al leer el directorio:', error);
  } else {
    //console.log(archivos);
  }
});

const rutaMinecraft = path.join(process.env.APPDATA, '.minecraft');

// Ruta de la carpeta webmine-data dentro de .minecraft
const rutaWebmineData = path.join(rutaMinecraft, 'webmine-data');

// Comprobar si la carpeta webmine-data existe
if (!fs.existsSync(rutaWebmineData)) {
  // Si no existe, crear la carpeta
  fs.mkdirSync(rutaWebmineData);
  console.log('Carpeta webmine-data creada.');
} else {
  console.log('La carpeta webmine-data ya existe.');
}




function generarCadenaAleatoria() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let cadenaAleatoria = '';

  for (let i = 0; i < 10; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    cadenaAleatoria += caracteres.charAt(indice);
  }

  return cadenaAleatoria;
}

app.post('/crear-json', (req, res) => {
  const datos = req.body;
  const cadenaAleatoria = generarCadenaAleatoria();
  console.log('Datos recibidos en el servidor:', datos);

  if (!fs.existsSync(rutaWebmineData)) {
    fs.mkdirSync(rutaWebmineData);
    console.log('Carpeta webmine-data creada.');
  }

  const rutaArchivoJSON = path.join(rutaWebmineData, `${cadenaAleatoria}.json`);

  const datosJSON = JSON.stringify(datos, null, 2);

  fs.writeFile(rutaArchivoJSON, datosJSON, (err) => {
    if (err) {
      console.error('Error al crear el archivo JSON:', err);
      res.status(500).json({ message: 'Error al crear el archivo JSON' });
    } else {
      console.log('Archivo JSON creado exitosamente.');
      res.json({ message: 'Archivo JSON creado exitosamente' });
    }
  });
});



app.get('/lista-archivos', (req, res) => {
  // Ruta de la carpeta .minecraft
  const rutaMinecraft = path.join(process.env.APPDATA, '.minecraft');
  const rutaWebmineData = path.join(rutaMinecraft, 'webmine-data');

  // Verificar si la carpeta webmine-data existe
  if (!fs.existsSync(rutaWebmineData)) {
    console.log('La carpeta webmine-data no existe.');
    res.status(404).json({ error: 'La carpeta webmine-data no existe' });
    return;
  }

  fs.readdir(rutaWebmineData, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta:', err);
      res.status(500).json({ error: 'Error al leer la carpeta' });
    } else {
      res.json(files);
    }
  });
});




const dataFolderPath = path.join(__dirname, 'frontend', 'data');

app.get('/archivo-json/:nombreArchivo', (req, res) => {
  const nombreArchivo = req.params.nombreArchivo;
  const rutaMinecraft = path.join(process.env.APPDATA, '.minecraft');
  const rutaWebmineData = path.join(rutaMinecraft, 'webmine-data');;
  const rutaArchivo = path.join(rutaWebmineData, nombreArchivo);

  fs.readFile(rutaArchivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      res.status(500).json({ error: 'Error al leer el archivo JSON' });
    } else {
      const jsonData = JSON.parse(data);
      const response = {
        nombreArchivo: nombreArchivo,
        contenidoJson: jsonData,
      };
      res.json(response);
    }
  });
});

/**
 * Todo: Remove the selected ModPack json archive 
*/

app.post('/eliminar-archivo', (req, res) => {
  const nombreArchivo = req.body.nombreArchivo;
  const rutaMinecraft = path.join(process.env.APPDATA, '.minecraft');
  const rutaWebmineData = path.join(rutaMinecraft, 'webmine-data');;
  const rutaArchivo = path.join(rutaWebmineData, nombreArchivo);

  if (fs.existsSync(rutaArchivo)) {
    fs.unlinkSync(rutaArchivo);
    res.json({ message: `El archivo ${nombreArchivo} fue eliminado correctamente.` });
  } else {
    res.status(404).json({ error: 'El archivo no existe.' });
  }
});

/**
 * Todo: Enable the modpack, copy files into .minecraft/mods
*/

app.post('/copiar-archivos', (req, res) => {
  const rutaCarpeta = req.body.rutaCarpeta;
  const jsonName = req.body.jsonName;

  if (!fs.existsSync(rutaCarpeta)) {
    return res.status(400).json({ error: 'La carpeta especificada no existe' });
  }

  const destino = path.join(process.env.APPDATA, '.minecraft','mods');

  fse.emptyDir(destino, (err) => {
    if (err) {
      console.error('Error al borrar archivos de .minecraft/mods:', err);
      return res.status(500).json({ error: 'Error al borrar archivos de .minecraft/mods' });
    }


    fse.copy(rutaCarpeta, destino, (err) => {
      if (err) {
        console.error('Error al copiar archivos:', err);
        res.status(500).json({ error: 'Error al copiar archivos' });
      } else {
        console.log(`Has selecionado el ModPack ${jsonName}.`);
        res.json({ message: 'Archivos copiados exitosamente' });
      }
    });
  });
});

/**
 * ? Start the HotBar section
*/

app.post('/recibir-comando', (req, res) => {
  const comando = req.body.comando;
  exec(`explorer "${comando}"`, (error, stdout, stderr) => {
  });

});

app.post('/minecraft-folder', (req, res) => {
  exec(`explorer "${minecraftDir}"`, (error, stdout, stderr) => {
  });

});

app.post('/minecraft-logs', (req, res) => {
  const minecraftDirLogs = path.join(process.env.APPDATA, '.minecraft','logs');
  exec(`explorer "${minecraftDirLogs}"`, (error, stdout, stderr) => {
  });

});

app.post('/minecraft-resourcepacks', (req, res) => {
  const minecraftDirresourcepacks = path.join(process.env.APPDATA, '.minecraft','resourcepacks');
  exec(`explorer "${minecraftDirresourcepacks}"`, (error, stdout, stderr) => {
  });

});

app.post('/minecraft-shaderpacks', (req, res) => {
  const minecraftDirshaderpacks = path.join(process.env.APPDATA, '.minecraft','shaderpacks');
  exec(`explorer "${minecraftDirshaderpacks}"`, (error, stdout, stderr) => {
  });

});

app.post('/minecraft-screenshots', (req, res) => {
  const minecraftDirscreenshots = path.join(process.env.APPDATA, '.minecraft','screenshots');
  exec(`explorer "${minecraftDirscreenshots}"`, (error, stdout, stderr) => {
  });

});

app.post('/minecraft-foldermods', (req, res) => {
  const minecraftDirfoldermods = path.join(process.env.APPDATA, '.minecraft','mods');
  exec(`explorer "${minecraftDirfoldermods}"`, (error, stdout, stderr) => {
  });

});

app.post('/minecraft-foldermodpackdata', (req, res) => {
  const foldermodpackdata = path.join(process.env.APPDATA, '.minecraft','webmine-data');
  exec(`explorer "${foldermodpackdata}"`, (error, stdout, stderr) => {
  });

});


/**
 * ? End the HotBar section
*/

app.post('/out-log', (req, res) => {
  console.log('Exiting...');
  process.exit();

});


const rutaCarpeta = path.join(process.env.APPDATA, '.minecraft','mods');
app.get("/get-files", (req, res) => {
  fs.readdir(rutaCarpeta, (err, files) => {
    if (err) {
      console.error("Error al obtener los nombres de los archivos:", err);
      res.status(500).json({ error: "Error al obtener los nombres de los archivos" });
    } else {
      res.json(files);
    }
  });
});

/**
 * TODO: API Minecraft Verions
 */

app.post('/get-versions', async (req, res) => {
  try {
    const url = 'https://launchermeta.mojang.com/mc/game/version_manifest.json';
    const response = await axios.get(url);
    const data = response.data;
    const versionesCompletas = data.versions
      .filter((version) => version.type === 'release')
      .map((version) => version.id);
    res.json(versionesCompletas);
  } catch (error) {
    console.error('Error al obtener las versiones de Minecraft:', error);
    res.status(500).json({ error: 'Error al obtener las versiones de Minecraft' });
  }
});


app.post('/delete-mod', (req, res) => {
  const nombreArchivo = req.body.nombreArchivo;
  const rutaArchivo = path.join(rutaCarpeta, nombreArchivo);

  if (fs.existsSync(rutaArchivo)) {
    fs.unlinkSync(rutaArchivo);
    res.json({ message: `El archivo ${nombreArchivo} fue eliminado correctamente.` });
  } else {
    res.status(404).json({ error: 'El archivo no existe.' });
  }
});




const screenshotsPath = path.join(process.env.APPDATA, '.minecraft', 'screenshots');

app.get('/get-screenshots', (req, res) => {
  fs.readdir(minecraftScreenshotsPath, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta de screenshots:', err);
      res.status(500).json({ error: 'Error al leer la carpeta de screenshots' });
    } else {
      const imagePaths = files.map(file => `${minecraftScreenshotsPath}`+`\\`+`${file}`);
      res.json(imagePaths);
    }
  });
});


app.get('/getLauncherProfiles', (req, res) => {
  let minecraftFolder;
  
  if (process.platform === 'win32') {
    minecraftFolder = path.join(process.env.USERPROFILE, 'AppData', 'Roaming', '.minecraft', 'launcher_profiles.json');
  } else {
    minecraftFolder = path.join(process.env.HOME, '.minecraft', 'launcher_profiles.json');
  }

  fs.readFile(minecraftFolder, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      res.status(500).json({ error: 'Error al leer el archivo' });
      return;
    }

    try {
      const launcherProfiles = JSON.parse(data);
      const profiles = launcherProfiles.profiles;
      res.json({ profiles });
    } catch (parseError) {
      console.error('Error al analizar el archivo JSON:', parseError);
      res.status(500).json({ error: 'Error al analizar el archivo JSON' });
    }
  });
});

app.post('/updateProfileXmxValue', (req, res) => {
  const profileName = req.body.profileName;
  const newXmxValue = req.body.newXmxValue;

  let filePath 
  if (process.platform === 'win32') {
    filePath = path.join(process.env.USERPROFILE, 'AppData', 'Roaming', '.minecraft', 'launcher_profiles.json');
  } else {
    filePath = path.join(process.env.HOME, '.minecraft', 'launcher_profiles.json');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      res.status(500).json({ error: 'Error al leer el archivo' });
      return;
    }

    try {
      const launcherProfiles = JSON.parse(data);
      const profiles = launcherProfiles.profiles;

      if (profiles.hasOwnProperty(profileName)) {
        profiles[profileName].javaArgs = profiles[profileName].javaArgs.replace(/-Xmx\d+G/, `-Xmx${newXmxValue}G`);

        fs.writeFile(filePath, JSON.stringify(launcherProfiles, null, 2), 'utf8', (writeErr) => {
          if (writeErr) {
            console.error('Error al escribir el archivo:', writeErr);
            res.status(500).json({ error: 'Error al escribir el archivo' });
            return;
          }

          res.json({ message: 'Valor de xmxValue actualizado con éxito' });
        });
      } else {
        res.status(404).json({ error: 'Perfil no encontrado' });
      }
    } catch (parseError) {
      console.error('Error al analizar el archivo JSON:', parseError);
      res.status(500).json({ error: 'Error al analizar el archivo JSON' });
    }
  });
});



function compressFolder(folderPath, outputFilePath) {
  const zip = new AdmZip();

  const files = fs.readdirSync(folderPath);

  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    zip.addLocalFile(filePath);
  });

  zip.writeZip(outputFilePath);

  console.log(`Carpeta comprimida en: ${outputFilePath}`);
}

const outputZipPath = minecraftScreenshotsPath+'\\data.zip';

//compressFolder(folderToCompress, outputZipPath);

function extractZip(zipFilePath, outputFolder) {
  const zip = new AdmZip(zipFilePath);

  // Extrae los archivos en la carpeta de destino
  zip.extractAllTo(outputFolder, true);

  console.log(`Archivo ZIP descomprimido en: ${outputFolder}`);
}

const zipFileToExtract = 'D:\\Programas\\Minecraft\\GestorMods\\Zombies\\archivo.zip';
const outputFolder = 'E:\\Packs';

//extractZip(zipFileToExtract, outputFolder);

app.post('/compressFolder', (req, res) => {
  const folderToCompress = req.body.folderToCompress;

  const zipFileName = 'archivo_comprimido.zip'; // Nombre del archivo ZIP

  

  compressFolder(folderToCompress, outputZipPath);

  res.setHeader('Content-Disposition', `attachment; filename=${zipFileName}`);
  res.sendFile(outputZipPath);

  setTimeout(() => {
    fs.unlink(outputZipPath, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
        return;
      }
      console.log('Archivo eliminado con éxito después de 10 segundos.');
    });
  }, 10000); // 10000 milisegundos = 10 segundos
})