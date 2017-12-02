$(function(){

// declare global vars
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gravity = 0.004;
var intervalHandle = null;
var vidas = 3;

// object water
function Water() {
  this.x = 50;
  this.y = 450;
  this.vx = 2;
  this.vy = 2;
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

  // movimiento agua
  this.x += this.vx;
  this.vy -= gravity;
  this.y -= this.vy;
  this.draw();
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
  this.h = 30;
  this.color = '#00FF00';
}

Plant.prototype.draw = function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.rect(this.x, this.y, this.h, this.h);
  ctx.fillStyle = this.color;
  ctx.fill();
};

// object shooting circle
function Circle() {
  this.x = 0;
  this.y = 500;
  this.radius = 110;
  this.color = '#808080';
}

Circle.prototype.draw = function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.arc(this.x, this.y, this.radius-10, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
};

// pintar todo

var water = new Water();
var gun = new Gun();
var plant = new Plant();
var circle = new Circle();
var clickInsideCircle = 0;
$("#vidas").text(vidas);


function drawAll() {
  water.draw();
  gun.draw();
  plant.draw();
  circle.draw();
  $("#clean").hide();
}

drawAll();

// volver a empezar

function restart() {
  water.x = 50; // parece un poco cutre con los números introducidos tal cual
  water.y = 450;
  water.vx = 2;
  water.vy = 2;
  vidas = 3; // alguna forma de hacer restart sin volver a meter el número?
  $("#vidas").text(vidas);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawAll();
}

// disparar de nuevo

function shootAgain() {
  water.x = 50;
  water.y = 450;
  water.vx = 2;
  water.vy = 2;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawAll();
}

//check si click para disparo está dentro del círculo

function checkClick(circleX, circleY, radius, mouseX, mouseY) {
  if (Math.sqrt((mouseX-circleX)*(mouseX-circleX) + (mouseY-circleY)*(mouseY-circleY)) < radius) {
    clickInsideCircle = true;
  } else {
    clickInsideCircle = false;
  }
  return clickInsideCircle;
}


// restart button

document.getElementById("clean").onclick = function(){
  $(".game-over").show();
  restart();
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
    clearInterval(intervalHandle);
    var mousePos = getMousePos(canvas, evt);
    checkClick(circle.x, circle.y, circle.radius, mousePos.x, mousePos.y);
    if (clickInsideCircle == true) {
      water.vx = (mousePos.x - water.x) * 0.05;
      water.vy = (water.y - mousePos.y) * 0.05;
      intervalHandle = setInterval(function() {
        water.update();
        hitPlant(water.x, water.y, water.radius, plant.x, plant.y, plant.h);
      }, 2);
    } else {
      alert("Debes hacer click dentro del círculo");
    }
  }, false);

  // comprobar si hit al objeto
  function hitPlant (waterX, waterY, waterR, plantX, plantY, plantH){
    if (Math.floor(waterX) >= Math.floor(plantX) && Math.floor(waterX) <= Math.floor(plantX + plantH) && Math.floor(waterY) >= Math.floor(plantY) && Math.floor(waterY) <= Math.floor(plantY + plantH)){
      alert("hit!");
      shootAgain();
      clearInterval(intervalHandle);

    } else if ((waterX >= canvas.width) || (waterY >= canvas.height) || (waterX<=0) || (waterY <= 0)) {
      vidas -= 1;
      clearInterval(intervalHandle);
        if (vidas > 0) {
          alert("¡Te has salido! Te quedan " + vidas + " vidas");
          shootAgain();
          $("#vidas").text(vidas);
        } else {
          alert("Game Over");
          $(".game-over").hide();
          $("#clean").show();
          $("#vidas").text("0");
        }
    }
  }

});
