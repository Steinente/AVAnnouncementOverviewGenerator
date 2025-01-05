let events = []

function loadData(from, to) {
  const apiLink = `https://animalrightscalendar.org/api/events?where[and][0][start][greater_than]=${from}T00:00:00.000Z&where[and][1][start][less_than_equal]=${to}T23:59:59.999Z&where[and][2][tags][contains]=65e93563687054b4060529dd&sort=start&limit=0`
  const proxyUrl = 'https://api.allorigins.win/get?url='
  const proxiedApiLink = proxyUrl + encodeURIComponent(apiLink)

  fetch(proxiedApiLink)
    .then(response => response.json())
    .then(data => {
      const parsedData = JSON.parse(data.contents)
      events = parsedData.docs
      setTimeout(generateImage, 500)
    })
    .catch(error => {
      console.error('Fehler bei der API-Abfrage:', error)
    })
}
