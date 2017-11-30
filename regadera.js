
// declare global vars
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gravity = 0.02;
var intervalHandle = null;

// object water
function Water() {
  this.x = 50;
  this.y = 450;
  this.vx = 2;
  this.vy = 3;
  this.radius = 3;
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

// object water gun
function Gun() {
  this.x = 15;
  this.y = 470;
  this.color = '#00FF00';
}

Gun.prototype.draw = function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x+10,this.y-2);
  ctx.lineTo(this.x+8, this.y-12);
  ctx.lineTo(this.x+30, this.y-14);
  ctx.lineTo(this.x+28, this.y-22);
  ctx.lineTo(this.x-2, this.y-20);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
};

// object plant
function Plant() {
  this.x = 470;
  this.y = 300;
  this.color = '#00FF00';
}

Plant.prototype.draw = function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x+30,this.y);
  ctx.lineTo(this.x+30, this.y-30);
  ctx.lineTo(this.x, this.y-30);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
};

// object shooting circle
function Circle() {
  this.x = 0;
  this.y = 500;
  this.radius = 150;
  this.color = '#808080';
}

Circle.prototype.draw = function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius+10, 0, Math.PI * 2, false);
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
};

//lógica juego

var water = new Water();
var gun = new Gun();
var plant = new Plant();
var circle = new Circle();
water.draw();
gun.draw();
plant.draw();
circle.draw();

document.getElementById("shoot").onclick = function(){
  intervalHandle = setInterval(function() {
    water.update(); // por que si hago dos clicks al regar, no deja de regar al empezar de nuevo?
  }, 2);
};

document.getElementById("clean").onclick = function(){
  clearInterval(intervalHandle);
  water.x = 50; // parece un poco cutre con los números introducidos tal cual
  water.y = 450;
  water.vx = 2;
  water.vy = 3;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  water.draw();
  gun.draw();
  plant.draw();
  circle.draw();
};

// click en círculo para apuntar

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(evt.clientX - rect.left),
      y: Math.floor(evt.clientY - rect.top)
    };
  }

  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
  }, false);
