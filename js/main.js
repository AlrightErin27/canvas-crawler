//DOM selectors
const movementDisplay = document.getElementById("movement");
const canvas = document.getElementById("canvas");
//canvas set up / game state
const ctx = canvas.getContext("2d");
//you always set canvas width & height
canvas.setAttribute("height", getComputedStyle(canvas)["height"]);
canvas.setAttribute("width", getComputedStyle(canvas)["width"]);
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
let ogre = {
  x: 200,
  y: 100,
  color: "#C6BD0A",
  width: 60,
  height: 120,
  alive: true,
  render: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};
let hero = {
  x: 0,
  y: 0,
  color: "#506BBB",
  width: 20,
  alive: true,
  render: function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};
//game function

//event listeners
canvas.addEventListener("click", (e) => {
  drawBox(e.offsetX, e.offsetY, 50, "green");
  movementDisplay.innerText = `X: ${e.offsetX} Y: ${e.offsetY}`;
  console.log(e);
});
