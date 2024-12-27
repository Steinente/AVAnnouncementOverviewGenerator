document.addEventListener('DOMContentLoaded', () => {
  generateImage(() => {})
  updateButtonStates()
})

function loadFonts(maxFontSize) {
  const fonts = [`SourceSansPro`, `SourceSansProSemiBold`]
  return Promise.all(fonts.map(font => document.fonts.load(`${maxFontSize}px ${font}`)))
}
