const photo = document.querySelector('.photo')
let turns = 0

photo.addEventListener('click', () => {
  turns += 1
  const flipped = turns % 2 === 1
  photo.style.setProperty('--flip', `${turns * 180}deg`)
  photo.classList.toggle('is-flipped', flipped)
  photo.setAttribute('aria-pressed', String(flipped))
})

const fonts = [
  { name: 'Arial', stack: 'Arial, Helvetica, sans-serif' },
  { name: 'Abril Fatface', stack: "'Abril Fatface', serif" },
  { name: 'Bangers', stack: "'Bangers', cursive" },
  { name: 'Caveat', stack: "'Caveat', cursive" },
  { name: 'Chewy', stack: "'Chewy', cursive" },
  { name: 'Comic Neue', stack: "'Comic Neue', cursive" },
  { name: 'Creepster', stack: "'Creepster', cursive" },
  { name: 'Fredoka', stack: "'Fredoka', sans-serif" },
  { name: 'Gloria Hallelujah', stack: "'Gloria Hallelujah', cursive" },
  { name: 'Lobster', stack: "'Lobster', cursive" },
  { name: 'Pacifico', stack: "'Pacifico', cursive" },
  { name: 'Permanent Marker', stack: "'Permanent Marker', cursive" },
  { name: 'Playfair Display', stack: "'Playfair Display', serif" },
  { name: 'Press Start 2P', stack: "'Press Start 2P', monospace" },
  { name: 'Righteous', stack: "'Righteous', sans-serif" },
  { name: 'Shrikhand', stack: "'Shrikhand', cursive" },
  { name: 'Silkscreen', stack: "'Silkscreen', monospace" },
  { name: 'Space Mono', stack: "'Space Mono', monospace" },
  { name: 'Special Elite', stack: "'Special Elite', monospace" },
]
const fontToggle = document.querySelector('.font-toggle')
const links = document.querySelector('.links')
let fontIndex = 0

function fitLinks() {
  links.style.fontSize = ''
  let size = parseFloat(getComputedStyle(links).fontSize)
  while (links.scrollWidth > links.clientWidth && size > 8) {
    size -= 0.5
    links.style.fontSize = `${size}px`
  }
}

fontToggle.addEventListener('click', async () => {
  let next = fontIndex
  while (next === fontIndex) next = Math.floor(Math.random() * fonts.length)
  fontIndex = next
  const font = fonts[next]

  fontToggle.disabled = true
  try {
    await Promise.all([
      document.fonts.load(`400 1em '${font.name}'`),
      document.fonts.load(`700 1em '${font.name}'`),
    ])
  } catch {}
  fontToggle.disabled = false

  document.documentElement.style.setProperty('--font', font.stack)
  fontToggle.title = font.name
  fitLinks()
})

window.addEventListener('resize', fitLinks)
