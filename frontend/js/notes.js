const buttonMessage = document.getElementById("buttonMessage");
const messageInput = document.getElementById("message"); // Cambio el ID a "message" para que coincida con el formulario

buttonMessage.addEventListener("click", (event) => {
  event.preventDefault(); // Evita que el formulario se envíe de forma convencional
  const chatMessage = messageInput.value;
  mesSend(chatMessage);
  messageInput.value = ""; // Borra el contenido del input después de enviar
});

async function mesSend(chatMessage) {
  try {
    const response = await fetch("/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatMessage }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      console.error(
        "Error al enviar los datos al servidor:",
        response.statusText
      );
    }
    updateChat();
  } catch (error) {
    console.error("Error al realizar la solicitud Fetch:", error);
  }
}

function updateChat() {
  const imessage = document.getElementById("imessage");

  imessage.innerHTML = `<div class="message">
  <p class="from-them">Welcome to Mine Web's note system. Here you can save notes in a beautiful and easy to use message style.</p>
  <p class="time-then">Mine Web
      <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"/>
      </svg>
  </p>
</div>`;

  fetch("/api/messages", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((message) => {
        const divMessage = document.createElement("div");
        const messageChat = document.createElement("p");
        const date = document.createElement("p");

        const svgcontent = `
        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"/>
                </svg>
        `;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = svgcontent;

        divMessage.classList.add("message");
        messageChat.classList.add("from-me");
        date.classList.add("time-me");

        messageChat.textContent = message.chatMessage;
        date.textContent = message.date;

        imessage.appendChild(divMessage);
        divMessage.appendChild(messageChat);
        divMessage.appendChild(date);
        date.appendChild(tempDiv);
      });
    });
}
updateChat();

function isFirefox() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return userAgent.includes("firefox");
}

if (isFirefox()) {
  window.addEventListener("beforeunload", (event) => {
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
}

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  history.back();
});
