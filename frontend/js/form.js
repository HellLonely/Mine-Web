function obtenerValor() {
    const description = document.getElementById('description').value;
    const ruta = document.getElementById('ruta').value;
    const gestor = document.getElementById('gestor').value;
    const name = document.getElementById('name').value;
    const version = document.getElementById('version').value;

    const datos = {
      description: description,
      ruta: ruta,
      gestor: gestor,
      name: name,
      version: version
    };

    // Enviar los datos al backend mediante una solicitud POST
    fetch('/crear-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message); // Mensaje de respuesta del servidor
    })
    .catch((error) => {
      console.error('Error al enviar los datos al servidor:', error);
    });
  }

document.getElementById('jsonForm').addEventListener('submit', (event) => {
  event.preventDefault();
  obtenerValor();
  document.getElementById('jsonForm').reset();
});