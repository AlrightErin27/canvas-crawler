/* DOM selectors */
const movementDisplay = document.getElementById('movement')
const canvas = document.getElementById('canvas')
/* canvas setup / game state */
const ctx = canvas.getContext('2d')
// you always set the canvas width/height
canvas.setAttribute("height", getComputedStyle(canvas)["height"])
canvas.setAttribute("width", getComputedStyle(canvas)["width"])

// runs to game loop with a set interval
let gameLoopInterval = setInterval(gameLoop, 60)

// ctx.fillStyle = 'white'

// ctx.lineWidth = 10;
// ctx.fillRect(100, 100, 100, 300)

// set contex props before drawing
// ctx.strokeStyle = 'green'
// ctx.lineWidth = 10;
// ctx.strokeRect(10, 10, 100, 100)

// reset contex props to draw differently
// ctx.strokeStyle = 'red'
// ctx.lineWidth = 5;
// ctx.strokeRect(100, 10, 100, 100)

// just for testing clicks
function drawBox(x, y, height, width, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, height, width)
}


// drawBox(50, 50, 100, 100, 'purple')
// drawBox(150, 50, 100, 100, 'green')

/* Classes */
class Crawler {
  constructor(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.alive = true
  }
  render() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

// test crawler
let myCrawler = new Crawler(100, 100, 'orange', 100, 100)

// instantiate game objects
let hero = new Crawler(0, 0, "hotpink", 20, 20)
let ogre = new Crawler(200, 100, "#bada55", 60, 120)

/* game functions */

// listen for keypresses
function movementHandler(e) {
  // hero speed constant
  const speed = 10
  console.log(e)
  movementDisplay.innerText = `X: ${hero.x} Y: ${hero.y}`
  switch (e.key) {
    case ('w'):
        hero.y = hero.y - speed
        break
    case ('s'):        
        hero.y = hero.y + speed
        break
    case ('a'):
        hero.x = hero.x - speed
        break
    case ('d'):
        hero.x = hero.x + speed
      break    
  }
}

function detectHit() {
  // // check for collisions on each side, one by one
  // let ogreLeft = hero.x + hero.width >= ogre.x
  // // console.log('ogreLeft', ogreLeft)

  // let ogreRight = hero.x <= ogre.x + ogre.width
  // // console.log('ogreRight', ogreRight)

  // let checkX = ogreLeft && ogreRight
  // // console.log(check)

  // let ogreTop = hero.y + hero.height >= ogre.y 
  // // console.log('ogreTop', ogreTop)

  
  // let ogreBottom = hero.y <= ogre.y + ogre.height
  // // console.log('ogreBottom', ogreBottom)

  // let checkY = ogreTop && ogreBottom

  // // check all boundries together
  // let checkXY = checkY && checkX

  if(
    // left
    hero.x + hero.width >= ogre.x &&
    // right
    hero.x <= ogre.x + ogre.width &&
    // top
    hero.y + hero.height >= ogre.y &&
    // bottom
    hero.y <= ogre.y + ogre.height 
    ) {
      endGame()
    }
}

function endGame() {
  ogre.alive = false
  clearInterval(gameLoopInterval)
  movementDisplay.innerText = 'YOU KILLED THE OGRE!'

}

// main game loop
function gameLoop() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // check for collisions
  detectHit()
  // render our game objects!
  if(ogre.alive) {
    ogre.render()
  }
  hero.render()
}


/* events listeners */
canvas.addEventListener('click', e => {
  // drawBox(e.offsetX, e.offsetY, 50, 50, 'rgba(255, 0, 0, .1)')
  // movementDisplay.innerText = `X: ${e.offsetX} Y: ${e.offsetY}`
  // console.log(e)
})

// listen for all keydown events from the browser
document.addEventListener('keydown', movementHandler)