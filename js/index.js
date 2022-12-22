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
  const newMessageContainer = document.createElement('div')

  newMessageContainer.classList.add('message-container', chat.from.toLowerCase())

  const newMessageElement = createNewMessage(chat.message)

  const newMessageDescriptionElement = createNewMessageDescription(
    chat.from,
    new Date(chat.datetime).toLocaleString('en-GB')
  )

  newMessageContainer.appendChild(newMessageElement)
  newMessageContainer.appendChild(newMessageDescriptionElement)

  return newMessageContainer
}

function scrollToTheLastMessage() {
  const chatHolder = document.getElementById('chatHolder')

  chatHolder.scrollTop = chatHolder.scrollHeight
}

function showMessageSpinner(liveChat, chatHolder) {
  const messageSpinner = `
    <div class="message-container operator loading">
      <p id="loading-message" class="chat-message">	
        <span class="lds-ellipsis">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </p>
    </div>
  `
  
  liveChat.innerHTML = liveChat.innerHTML + messageSpinner

  scrollToTheLastMessage()
}

function hideMessageSpinner() {
  const loadingMessage = document.getElementById('loading-message')

  loadingMessage.remove()
}

(function() {
  const chatHistory = document.getElementById('chatHistory')
  const chatInput = document.getElementById('chatInput')
  const chatSubmit = document.getElementById('chatSubmit')
  const showHistory = document.getElementById('show-history')
  const liveChat = document.getElementById('liveChat')

  function loadData(chats){
    chats.forEach(chat => {
      const newMessageContainer = addNewMessage(chat)
      
      chatHistory.appendChild(newMessageContainer)
    })
  }
  
  showHistory.addEventListener('click', ({ target }) => {
    chat.getChatHistory(loadData);
    
    chatHistory.classList.remove('hide')
    
    target.classList.add('hide')
  })
  
  chatInput.addEventListener('keyup', event => {
    const message = event.target.value
    const totalOfCharacters = message.length
    
    updateTextAreaAmountOfCharacters(totalOfCharacters)
    
    if (totalOfCharacters > 0) {
      chatSubmit.disabled = false
      
      if (event.key === 'Enter') {
        chat.sendChat(message)
  
        showMessageSpinner(liveChat, chatHolder)

        chatInput.value = ''

        updateTextAreaAmountOfCharacters(0)
      }
    } else {
      chatSubmit.disabled = true
    }
  })

  chatSubmit.addEventListener('click', () => {
    const message = chatInput.value
    const totalOfCharacters = message.length

    if (totalOfCharacters > 0) {
      chat.sendChat(message)
  
      showMessageSpinner(liveChat, chatHolder)

      chatInput.value = ''

      updateTextAreaAmountOfCharacters(0)
    }
  })
      
  chat.addListener('chatreceived', ({ chat }) => {
    const newMessageContainer = addNewMessage(chat)

    liveChat.appendChild(newMessageContainer)
    
    if (chat.from === 'operator') {
      hideMessageSpinner()
    }

    scrollToTheLastMessage()
  }, false);
})()
