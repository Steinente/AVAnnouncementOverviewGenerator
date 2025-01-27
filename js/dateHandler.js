document.getElementById('from-date').addEventListener('change', checkDates)
document.getElementById('to-date').addEventListener('change', checkDates)

document.getElementById('from-date').addEventListener('keydown', disableKeyboardInput)
document.getElementById('to-date').addEventListener('keydown', disableKeyboardInput)

function checkDates() {
  const fromDate = document.getElementById('from-date')
  const toDate = document.getElementById('to-date')

  const from = new Date(fromDate.value)
  const to = new Date(toDate.value)

  if (fromDate.value && toDate.value) {
    if (from > to) {
      fromDate.style.backgroundColor = 'red'
      toDate.style.backgroundColor = 'red'
    } else {
      fromDate.style.backgroundColor = ''
      toDate.style.backgroundColor = ''

      loadData(fromDate.value, toDate.value)
    }
  }
}

function disableKeyboardInput(event) {
  event.preventDefault()
}
