document.getElementById('download').addEventListener('click', () => {
  const fromDate = document.getElementById('from-date').value
  const toDate = document.getElementById('to-date').value

  const formattedFromDate = fromDate ? new Date(fromDate).toLocaleDateString('de-DE') : ''
  const formattedToDate = toDate ? new Date(toDate).toLocaleDateString('de-DE') : ''
  const pageNumber = currentPage + 1

  const fileName = `overview_${formattedFromDate && formattedToDate ? `${formattedFromDate}-${formattedToDate}` : formattedFromDate || formattedToDate}_page${pageNumber}.png`

  const link = document.createElement('a')
  link.href = canvas.toDataURL('image/png')
  link.download = fileName
  link.click()
})
