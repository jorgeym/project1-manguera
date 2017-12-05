$(function(){

//declare global vars
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gravity = 0.004;
var intervalHandle = null;
var vidas = 4;
var nivel = 0;

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

}

Gun.prototype.draw = function() {
    img_hose = new Image();
    img_hose.src = 'images/fire-department-icon-16.png';
    img_hose.onload = function() {
      ctx.drawImage(img_hose, -2, 417, 80, 80);
    };
};

// object plant
function Plant(x, y, h, color) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.color = color;
}

Plant.prototype.draw = function() {
    img_cactus = new Image();
    img_cactus.src = 'images/cactus.png';
    img_cactus.onload = function() {
      ctx.drawImage(img_cactus, 300, 300, 50, 50); // como hago para que coja las coordenadas del objeto?
      };
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
  this.radiusIn = 100;
  this.color = '#bdbdbd';
}

Circle.prototype.draw = function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.arc(this.x, this.y, this.radiusIn, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
};

// pintar todo

var water = new Water();
var gun = new Gun(canvas);
var plant = new Plant(470, 300, 30, '#00FF00');
var plant1 = new Plant(400, 200, 30, '#00FF00');
var plant2 = new Plant(250, 400, 20, '#00FF00');
var circle = new Circle();
var clickInsideCircle = 0;
$("#vidas").text(vidas);

function drawAll() {
  switch (nivel) {
    case 0:
      water.draw();
      gun.draw();
      plant.draw();
      circle.draw();
      $("#clean").hide();
      break;
    case 1:
      water.draw();
      gun.draw();
      plant1.draw();
      circle.draw();
      $("#clean").hide();
      break;
    case 2:
      water.draw();
      gun.draw();
      plant2.draw();
      circle.draw();
      $("#clean").hide();
      break;
    case 3:
      $(".game-over").hide();
      $("#clean").show();
      $("#vidas").text("0");
      alert("¡Has ganado!");
  }

}

drawAll();

//volver a empezar

function restart() {
  water.x = 50; // parece un poco cutre con los números introducidos tal cual
  water.y = 450;
  water.vx = 2;
  water.vy = 2;
  vidas = 4; // alguna forma de hacer restart sin volver a meter el número?
  nivel = 0;
  $("#vidas").text(vidas);
  $("#nivel").text(nivel);
  var gravity = 0.004;
  ctx.clearRect(0,0, canvas.width, canvas.height);
  shootAgain();
}

//disparar de nuevo

function shootAgain() {
      $("#nivel").text(nivel);
      water.x = 50;
      water.y = 450;
      water.vx = 2;
      water.vy = 2;
      ctx.clearRect(0,0, canvas.width, canvas.height);
      drawAll();
}

//check si click para disparo está dentro del círculo

function checkClick(circleX, circleY, radius, radiusIn, mouseX, mouseY) {
  if (Math.sqrt((mouseX-circleX)*(mouseX-circleX) + (mouseY-circleY)*(mouseY-circleY)) < radius && Math.sqrt((mouseX-circleX)*(mouseX-circleX) + (mouseY-circleY)*(mouseY-circleY)) > radiusIn){
    clickInsideCircle = true;
  } else {
    clickInsideCircle = false;
  }
  return clickInsideCircle;
}


//restart button

document.getElementById("clean").onclick = function(){
  $(".game-over").show();
  restart();
};

//click en círculo para apuntar

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
    checkClick(circle.x, circle.y, circle.radius, circle.radiusIn, mousePos.x, mousePos.y);
    if (clickInsideCircle == true) {
      water.vx = (mousePos.x - water.x) * 0.05;
      water.vy = (water.y - mousePos.y) * 0.05;
      switch (nivel){
        case 0:
          intervalHandle = setInterval(function() {
            water.update();
            hitPlant(water.x, water.y, water.radius, plant.x, plant.y, plant.h);
          }, 2);
          break;
        case 1:
          intervalHandle = setInterval(function() {
            water.update();
            hitPlant(water.x, water.y, water.radius, plant1.x, plant1.y, plant.h);
          }, 2);
          break;
        case 2:
          intervalHandle = setInterval(function() {
            water.update();
            hitPlant(water.x, water.y, water.radius, plant2.x, plant2.y, plant.h);
          }, 2);
          break;
        default:
          break;
      }
    } else {
      alert("Debes hacer click dentro del arco gris");
    }
  }, false);

  // comprobar si hit al objeto
  function hitPlant (waterX, waterY, waterR, plantX, plantY, plantH){
    if (Math.floor(waterX) >= Math.floor(plantX) && Math.floor(waterX) <= Math.floor(plantX + plantH) && Math.floor(waterY) >= Math.floor(plantY) && Math.floor(waterY) <= Math.floor(plantY + plantH)){
      alert("hit!");
      nivel += 1;
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
