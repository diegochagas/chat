function updateTextAreaAmountOfCharacters(totalOfCharacters) {
  const textAreaMaxLength = 140
  const textAreaCharactersLeft = document.getElementById('characters-left')

  textAreaCharactersLeft.innerText = textAreaMaxLength - totalOfCharacters
}

(function() {
  const textarea = document.getElementById('chatInput')
  
  textarea.addEventListener('keyup', event => {
    updateTextAreaAmountOfCharacters(event.target.value.length)
  })

})()