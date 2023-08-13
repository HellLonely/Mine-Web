function loadProfiles () {
    fetch('/getLauncherProfiles')
  .then(response => response.json())
  .then(data => {
    const profiles = data.profiles;

    const patherDivProfiles = document.createElement('div');

    for (const profileName in profiles) {
      if (profiles.hasOwnProperty(profileName) && profiles[profileName].name !== "") {
        const profile = profiles[profileName];

        console.log(profileName + " profile ");

        const ProfileRAM = document.createElement('p');
        const inputButton = document.createElement('input');

        inputButton.classList.add('inputButton');

        const javaArgs = profile.javaArgs;
        const match = javaArgs.match(/-Xmx(\d+)G/);

        if (match && match[1]) {
            
            const xmxValue = match[1];
            ProfileRAM.textContent = 'Dedicate RAM: '+ xmxValue

            
            inputButton.type = 'number';
            inputButton.value = xmxValue;
            inputButton.min = 1;
            inputButton.max = 32;
            inputButton.step = 1;
 
            
        }

        const inputDIV = document.createElement('div');
        inputDIV.classList.add('inputDIV');

        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profileDiv');

        const profileDataDiv = document.createElement('div');
        profileDataDiv.classList.add('profileDataDiv');

        const ProfileName = document.createElement('p');
        const ProfileVersion = document.createElement('p');
        

        ProfileVersion.textContent = "Version: " + profile.lastVersionId;

        ProfileName.textContent = profile.name




        


        const buttonChange = document.createElement('button');
        buttonChange.innerHTML = `<button type="button" class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply</button>`;
        
        buttonChange.addEventListener('click',() => {
            const profileNameToUpdate = profileName; // Cambia esto al nombre del perfil que deseas actualizar
            const newXmxValue = inputButton.value; // Cambia esto al nuevo valor de xmxValue que deseas establecer

            fetch('/updateProfileXmxValue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profileName: profileNameToUpdate,
                newXmxValue: newXmxValue,
            }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error('Error en la solicitud fetch:', error);
            });

            inputButton.value = newXmxValue;
            ProfileRAM.textContent = 'Dedicate RAM: '+ newXmxValue

        });

    
        profileDiv.appendChild(ProfileName);
        patherDivProfiles.appendChild(profileDiv);
        profileDiv.appendChild(profileDataDiv);
        inputDIV.appendChild(buttonChange);
        inputDIV.appendChild(inputButton);

        profileDataDiv.appendChild(ProfileVersion);
        profileDataDiv.appendChild(ProfileRAM)
        profileDataDiv.appendChild(inputDIV);
      }
    }

    document.getElementById('LauncherProfilePanel').appendChild(patherDivProfiles);
  })
  .catch(error => {
    console.error('Error en la solicitud fetch:', error);
  });
}

loadProfiles ();