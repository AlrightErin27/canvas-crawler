//DOM selectors
const movementDisplay = document.getElementById("movement");
const canvas = document.getElementById("canvas");
//canvas set up / game state
const ctx = canvas.getContext("2d");
//you always set canvas width & height
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);

let gameLoopInterval = setInterval(gameLoop, 60);
///////first set properties
ctx.fillStyle = "white";
// ctx.strokeStyle = "red";
// ctx.lineWidth = 5;
//////second Invoke drawing methods
// ctx.fillRect(10, 10, 100, 100);
// ctx.strokeRect(10, 10, 100, 100);
// console.dir(ctx);

function drawBox(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}
// drawBox(50, 50, 100, "purple");
// drawBox(100, 150, 100, "green");
//classes
class Crawler {
  constructor(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
//to test out cawler class above:
let myCrawler = new Crawler(100, 100, "orange", 100, 100);
// myCrawler.render();

let hero = new Crawler(0, 0, "hotpink", 20, 20);
let ogre = new Crawler(200, 100, "green", 60, 120);

//just testing
// hero.render();
// ogre.render();

//game function

//listen for key presses
function movementHandler(e) {
  switch (e.key) {
    case "w":
      hero.y = hero.y + 10;
      break;
    case " ":
      ogre.x = ogre.x - 10;
  }
}
function detectHit() {
  //check fo collisions on each side one by one
  let ogreLeft = hero.x + hero.width >= ogre.x;
  //   console.log(`ogreLeft`, ogreLeft);

  let ogreRight = hero.x <= ogre.x + ogre.width;
  //   console.log(`ogreRight`, ogreRight);

  let checkX = ogreLeft && ogreRight;

  let ogreTop = hero.y + hero.height >= ogre.y;
  //   console.log(`ogreTop`, ogreTop);

  let ogreBottom = hero.y <= ogre.y + ogre.height;
  //   console.log(`ogreBottom`, ogreBottom);

  let checkY = ogreTop + ogreBottom;

  let checkXY = checkX && checkY;
  console.log(checkXY);

  if (
    hero.x + hero.width >= ogre.x &&
    hero.x <= ogre.x + ogre.width &&
    hero.y + hero.height >= ogre.y &&
    hero.y <= ogre.y + ogre.height
  ) {
    endGame();
  }
}
function endGame() {
  ogre.alive = false;
  clearInterval(gameLoopInterval);
  movementDisplay.innerText = "You killed the ogre!";
}

function gameLoop() {
  //clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  detectHit();
  if (ogre.alive) {
    ogre.render();
  }
  hero.render();
}

//event listeners
canvas.addEventListener("click", (e) => {
  drawBox(e.offsetX, e.offsetY, 50, "yellow");
  movementDisplay.innerText = `X: ${e.offsetX} Y: ${e.offsetY}`;
  //   console.log(e);
});

document.addEventListener("keydown", movementHandler);
