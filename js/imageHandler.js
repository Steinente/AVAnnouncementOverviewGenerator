let background
let avLogo
let currentPage = 0

function generateImage() {
  const maxFontSize = 140
  const loadingSpinner = document.getElementById('loading-spinner')
  loadingSpinner.style.display = 'block'

  loadFonts(maxFontSize).then(() => {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    background = new Image()
    background.src = 'https://i.imgur.com/ODHxiIE.jpg'
    background.crossOrigin = 'anonymous'

    avLogo = new Image()
    avLogo.src = 'https://i.imgur.com/0N6DyFH.png'
    avLogo.crossOrigin = 'anonymous'

    let imagesLoaded = 0

    function onImageLoad() {
      imagesLoaded++
      if (imagesLoaded === 2) {
        canvas.width = background.width
        canvas.height = background.height

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(background, 0, 0, canvas.width, canvas.height)

        const overlayWidth = 900
        const overlayHeight = (avLogo.height / avLogo.width) * overlayWidth
        const xPosition = (canvas.width - overlayWidth) / 2
        const yPosition = 150
        context.drawImage(avLogo, xPosition, yPosition, overlayWidth, overlayHeight)

        const headingInput = document.getElementById('heading-input').value.toUpperCase()
        context.font = `${maxFontSize}px SourceSansProSemiBold`
        context.fillStyle = 'rgb(230, 0, 0)'
        context.textAlign = 'center'
        const textX = canvas.width / 2
        const textY = yPosition + overlayHeight + 400
        context.fillText(headingInput, textX, textY)

        renderEvents(context, canvas, events, background, avLogo, headingInput)

        loadingSpinner.style.display = 'none'
      }
    }

    background.onload = onImageLoad
    avLogo.onload = onImageLoad

    background.onerror = () => {
      console.error('Fehler beim Laden des Hintergrundbildes')
      loadingSpinner.style.display = 'none'
    }
    avLogo.onerror = () => {
      console.error('Fehler beim Laden des AV-Logos')
      loadingSpinner.style.display = 'none'
    }
  })
}

function renderEvents(context, canvas, events, background, avLogo, headingInput) {
  const rows = 3
  const cols = 4
  const maxEventsPerPage = rows * cols
  const leftRightPadding = 350
  const topPadding = 1300
  const bottomPadding = 500
  const usableWidth = canvas.width - 2 * leftRightPadding
  const usableHeight = canvas.height - topPadding - bottomPadding
  const colWidth = usableWidth / cols
  const rowHeight = usableHeight / rows

  context.clearRect(0, 0, canvas.width, canvas.height)

  context.drawImage(background, 0, 0, canvas.width, canvas.height)

  const overlayWidth = 900
  const overlayHeight = (avLogo.height / avLogo.width) * overlayWidth
  const xPosition = (canvas.width - overlayWidth) / 2
  const yPosition = 150
  context.drawImage(avLogo, xPosition, yPosition, overlayWidth, overlayHeight)

  context.font = '140px SourceSansProSemiBold'
  context.fillStyle = 'rgb(230, 0, 0)'
  context.textAlign = 'center'
  const textX = canvas.width / 2
  const textY = yPosition + overlayHeight + 400
  context.fillText(headingInput, textX, textY)

  context.fillStyle = 'white'

  function formatDate(dateString) {
    const date = new Date(dateString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day}.${month}.${year}`
  }

  function wrapText(text, x, startY, maxWidth, lineHeight, font) {
    if (!text) return 0
    context.font = font
    const words = text.split(' ')
    let line = ''
    let y = startY

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' '
      const testWidth = context.measureText(testLine).width
      if (testWidth > maxWidth && i > 0) {
        context.fillText(line, x, y)
        line = words[i] + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    }
    context.fillText(line, x, y)
    return y + lineHeight - startY
  }

  const startIndex = currentPage * maxEventsPerPage
  const pageEvents = events.slice(startIndex, startIndex + maxEventsPerPage)

  for (let i = 0; i < pageEvents.length; i++) {
    const event = pageEvents[i]
    const row = Math.floor(i / cols)
    const col = i % cols

    const x = leftRightPadding + col * colWidth
    const y = topPadding + row * rowHeight
    const maxWidth = colWidth - 30
    const lineHeight = 70

    const startDate = formatDate(event.start)
    const timeRange = `${new Date(event.start).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    })} - ${new Date(event.end).toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    })}`

    context.textAlign = 'left'

    context.font = '60px SourceSansProSemiBold'
    context.fillText(startDate, x, y)

    context.font = '54px SourceSansPro'
    let nextY = y + 80
    nextY += wrapText(event.title, x, nextY, maxWidth, lineHeight, '54px SourceSansPro')
    nextY += wrapText(event.location, x, nextY, maxWidth, lineHeight, '54px SourceSansPro')
    wrapText(timeRange, x, nextY, maxWidth, lineHeight, '54px SourceSansPro')
  }

  const totalPages = Math.ceil(events.length / maxEventsPerPage)
  const pageText = `Page ${currentPage + 1} / ${totalPages}`
  context.font = '60px SourceSansPro'
  context.fillStyle = 'white'
  context.textAlign = 'center'
  context.fillText(pageText, canvas.width / 2, canvas.height - 190)
}

document.getElementById('next-page').addEventListener('click', () => {
  const maxEventsPerPage = 12
  const totalPages = Math.ceil(events.length / maxEventsPerPage)

  if (currentPage < totalPages - 1) {
    currentPage++
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    const headingInput = document.getElementById('heading-input').value.toUpperCase()

    renderEvents(context, canvas, events, background, avLogo, headingInput)
    updateButtonStates()
  }
})

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    const headingInput = document.getElementById('heading-input').value.toUpperCase()

    renderEvents(context, canvas, events, background, avLogo, headingInput)
    updateButtonStates()
  }
})
