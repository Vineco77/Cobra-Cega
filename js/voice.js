const elementGuide = document.getElementById('guide')

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.lang = 'pt-Br'
  recognition.start()

  recognition.addEventListener('result', onSpeak)

  function onSpeak(e) {
    guide = e.results[0][0].transcript
    showVoiceToText(guide)
    checkDirection(guide)
    console.log(guide);
  }

  function showVoiceToText(guide) {
    elementGuide.innerHTML = `<div class="said">Você disse:</div>
    <span class="box">${guide} </span>`
  }

  recognition.addEventListener('end', () => {
    recognition.start()
  })