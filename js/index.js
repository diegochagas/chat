function updateTextAreaAmountOfCharacters(totalOfCharacters) {
  const textAreaMaxLength = 140
  const textAreaCharactersLeft = document.getElementById('characters-left')

  textAreaCharactersLeft.innerText = textAreaMaxLength - totalOfCharacters
}

function createNewMessage(message) {
  const newMessageElement = document.createElement('p')
  
  newMessageElement.classList.add('chat-message')

  newMessageElement.innerText = message

  return newMessageElement
}

function createNewMessageDescription(name, time) {
  const newMessageDescription = document.createElement('p')
  const smallName = document.createElement('small')
  const smallDate = document.createElement('small')

  newMessageDescription.classList.add('message-description')

  smallName.innerText = name
  smallDate.innerText = time

  newMessageDescription.appendChild(smallName)
  newMessageDescription.appendChild(smallDate)

  return newMessageDescription
}

function addNewMessage(chat) {
  const chatHistory = document.getElementById('chatHistory')
  
  const newMessageContainer = document.createElement('div')

  newMessageContainer.classList.add('message-container', chat.from.toLowerCase())

  const newMessageElement = createNewMessage(chat.message)

  const newMessageDescriptionElement = createNewMessageDescription(
    chat.from,
    new Date(chat.datetime).toLocaleString('en-GB')
  )

  newMessageContainer.appendChild(newMessageElement)
  newMessageContainer.appendChild(newMessageDescriptionElement)

  chatHistory.appendChild(newMessageContainer)
}

(function() {
  function loadData(chats){
    chats.forEach(chat => addNewMessage(chat))
  }
  
  chat.getChatHistory(loadData);

  const textarea = document.getElementById('chatInput')
  
  textarea.addEventListener('keyup', event => {
    updateTextAreaAmountOfCharacters(event.target.value.length)
  })

})()
