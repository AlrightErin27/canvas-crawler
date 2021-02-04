/* DOM selectors */
const movementDisplay = document.getElementById('movement')
const canvas = document.getElementById('canvas')
/* canvas setup / game state */
const ctx = canvas.getContext('2d')
// you always set the canvas width/height
canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])


ctx.fillStyle = 'white'

// ctx.lineWidth = 10;
// ctx.fillRect(100, 100, 100, 300)

// ctx.strokeStyle = 'green'
// ctx.lineWidth = 10;
// ctx.strokeRect(10, 10, 100, 100)

// ctx.strokeStyle = 'red'
// ctx.lineWidth = 5;
// ctx.strokeRect(100, 10, 100, 100)

function drawBox(x, y, height, width, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, height, width)
}

// drawBox(50, 50, 100, 100, 'purple')
// drawBox(150, 50, 100, 100, 'green')

/* Class */
/* game functions */
/* events listeners */
canvas.addEventListener('click', e => {
  drawBox(e.offsetX, e.offsetY, 50, 50, 'rgba(255, 0, 0, .1)')
  movementDisplay.innerText = `X: ${e.offsetX} Y: ${e.offsetY}`
  // console.log(e)
})