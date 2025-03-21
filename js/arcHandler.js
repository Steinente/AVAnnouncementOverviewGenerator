let events = []

function loadData(from, to) {
  const backendUrl = `https://srv03.brrr.at/events?from=${from}&to=${to}`

  fetch(backendUrl)
    .then(response => response.json())
    .then(data => {
      events = data
      currentPage = 0
      setTimeout(generateImage, 500)
      updateButtonStates()
    })
    .catch(error => {
      console.error('Fehler bei der API-Abfrage:', error)
    })
}
