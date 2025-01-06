document.getElementById('download').addEventListener('click', () => {
  const fromDate = document.getElementById('from-date').value
  const toDate = document.getElementById('to-date').value

  const formattedFromDate = fromDate ? new Date(fromDate).toLocaleDateString('de-DE') : ''
  const formattedToDate = toDate ? new Date(toDate).toLocaleDateString('de-DE') : ''
  const pageNumber = currentPage + 1

  const fileName = `overview_${
    formattedFromDate && formattedToDate
      ? `${formattedFromDate}-${formattedToDate}`
      : formattedFromDate || formattedToDate
  }_page${pageNumber}.png`

  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/png')
  link.download = fileName
  link.click()
})

document.getElementById('heading-input').addEventListener('input', () => {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  const headingInput = document.getElementById('heading-input').value.toUpperCase()

  renderEvents(context, canvas, events, background, avLogo, headingInput)
})

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

function updateButtonStates() {
  const maxEventsPerPage = 12
  const totalPages = Math.ceil(events.length / maxEventsPerPage)

  const prevButton = document.getElementById('prev-page')
  const nextButton = document.getElementById('next-page')
  const downloadButton = document.getElementById('download')

  if (currentPage === 0) {
    prevButton.disabled = true
  } else {
    prevButton.disabled = false
  }

  if (totalPages === 0 || currentPage >= totalPages - 1) {
    nextButton.disabled = true
  } else {
    nextButton.disabled = false
  }

  if (events.length === 0) {
    downloadButton.disabled = true
  } else {
    downloadButton.disabled = false
  }
}
