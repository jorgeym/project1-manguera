
// declare global vars
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gravity = 0.1;
var intervalHandle = null;

// object water
function Water() {
  this.x = 50;
  this.y = 450;
  this.vx = 5;
  this.vy = 6;
  this.radius = 5;
  this.color = '#000080';
}

Water.prototype.draw = function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
};

Water.prototype.update = function() {
  this.draw();
  // movimiento agua
  this.x += this.vx;
  this.vy -= gravity;
  this.y -= this.vy;
};

//lógica juego

var water = new Water();
water.draw();

document.getElementById("shoot").onclick = function(){
  intervalHandle = setInterval(function() {
    water.update();
  }, 5);
};

document.getElementById("clean").onclick = function(){
  clearInterval(intervalHandle);
  water.x = 50; // parece un poco cutre con los números introducidos tal cual
  water.y = 450;
  water.vx = 5;
  water.vy = 6;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  water.draw();
};
