"use strict"

async function retornaDadosUsuario() {
    const url = `https://whatsapp-t2na.onrender.com/v1/whatsapp/users/`
    const response = await fetch(url)
    const data = await response.json()

    return data.result[0]
}

async function controlaDados() {
    
    const json = await retornaDadosUsuario()

    if (json.account != null && json.account != undefined) {
            
        manipulaDadosUsuario(json)

    }

}

function manipulaDadosUsuario(json) {
    
    let profilePhoto = document.getElementById("profile-photo")
    
    /*
     * 
     * Para acessar propriedades de um objeto JSON que contenham caracteres especiais, 
     * como um traço (-), você deve usar a notação de colchetes [].
     *  
     * A notação de ponto (.) não funciona porque o JavaScript interpreta o traço como 
     * um operador de subtração, o que causaria um erro 
     * de sintaxe. 
     * 
     */

    let urlProfilePhoto = json["profile-image"]

    /*
     * Todas as fotos do arquivo json estão em formato png, algumas fotos
     * que estou utilizando tem o formato jpg, deixei disponiveis esses 2
     * formatos para utilizar, png e jpg 
    */

    if(urlProfilePhoto.includes("png")) {
        
        let arrayUrlProfilePhoto = urlProfilePhoto.split("")
        
        for(let i = 0; i < 3; i++) {
            
            arrayUrlProfilePhoto.pop()

        }

        let newUrlProfilePhoto = (arrayUrlProfilePhoto.toString()).replace(/,/g, "") //Removendo todas a virgulas.

        newUrlProfilePhoto = "./img/user/" + newUrlProfilePhoto + "jpg"

        profilePhoto.src = newUrlProfilePhoto

    } else {
        urlProfilePhoto = "./img/user/" + urlProfilePhoto
    }

    const listaContatos = json.contacts
    const containerConversas = document.getElementById("container-conversas")

    listaContatos.forEach((contato) => {

        let containerConversa = document.createElement("div")
        containerConversa.classList.add("container-conversa")

        containerConversas.appendChild(containerConversa)

        let containerProfileImageContact = document.createElement("div")
        containerProfileImageContact.classList.add("container-profile-img")

        containerConversa.appendChild(containerProfileImageContact)

        let profileContactImg = document.createElement("img")
        profileContactImg.src = "./img/default.png"
        
        containerProfileImageContact.appendChild(profileContactImg)

        let containerContactInfo = document.createElement("div")
        containerContactInfo.classList.add("container-info-contato")

        containerConversa.appendChild(containerContactInfo)

        let containerNameHour = document.createElement("div")
        containerNameHour.classList.add("name-hour")

        containerContactInfo.appendChild(containerNameHour)

        let nameContact = document.createElement("span")
        nameContact.textContent = contato.name

        containerNameHour.appendChild(nameContact)

        let lastMessageHour = document.createElement("p")

        let qtdMessages = contato.messages.length
        let lastMessageContent = contato.messages[qtdMessages - 1]
        
        lastMessageHour.textContent = lastMessageContent.time

        containerNameHour.appendChild(lastMessageHour)

        let containerLastMessage = document.createElement("div")
        containerLastMessage.classList.add("last-message")

        containerContactInfo.appendChild(containerLastMessage)

        let lastMessage = document.createElement("p")

        lastMessage.textContent = lastMessageContent.content

        containerLastMessage.appendChild(lastMessage)

    
    })

}

controlaDados()