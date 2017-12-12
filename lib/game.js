function Game() {
  this.canvas = document.getElementById('canvas');
  this.ctx =  this.canvas.getContext('2d');

// game elements

  this.lives = 4;
  this.level = 0;
  this.gun = new Gun(this.canvas);
  this.water = new Water(this.canvas);
  this.plant = new Plant(this.canvas, 440, 300, 60, '#00FF00');
  this.plant1 = new Plant(this.canvas, 400, 200, 50, '#00FF00');
  this.plant2 = new Plant(this.canvas, 250, 400, 40, '#00FF00');
  this.circle = new Circle(this.canvas);
  this.clickInsideCircle = 0;
  $("#restart").hide();

  this.animationFrameId  = null;

// check if the click was done inside the grey half circle or not

  this.canvas.addEventListener('click', function(event) {
    mousePos = this.getMousePos(event);

    if (checkClick(this.circle, mousePos)) {
      this.water.vx = (mousePos.x - this.water.x) * 0.08;
      this.water.vy = (this.water.y - mousePos.y) * 0.08;
      this.water.isMoving =  true;
    } else {
      alert("Debes hacer click dentro del arco gris");
    }
  }.bind(this), false);
}

// restart the game after winning or losing

document.getElementById("restart").onclick = function(){
  $(".game").show();
  $("#restart").hide();
};

//function to get click position

Game.prototype.getMousePos = function(event) {
  rect = this.canvas.getBoundingClientRect();
  return {
    x: Math.floor(event.clientX - rect.left),
    y: Math.floor(event.clientY - rect.top)
  };
};

//game logic to check if the plant was hit by the water

Game.prototype.hitPlant = function (waterX, waterY, waterR, plantX, plantY, plantH) {
  if (Math.floor(waterX) >= Math.floor(plantX) && Math.floor(waterX) <= Math.floor(plantX + plantH) && Math.floor(waterY) >= Math.floor(plantY) && Math.floor(waterY) <= Math.floor(plantY + plantH)){
    alert("hit!");
    this.level += 1;
    $("#restart").hide();
    this.water.restart();
      if (this.level > 2) {
        window.cancelAnimationFrame(this.animationFrameId);
        alert("You win");
        $(".game").hide();
        $("#restart").show();
        $("#vidas").text("0");
        this.level=0;
        this.lives=4;
      }
  } else if ((waterX >= this.canvas.width) || (waterY >= this.canvas.height) || (waterX<=0) || (waterY <= 0)) {
    this.lives -= 1;
      if (this.lives > 0) {
        alert("¡Te has salido! Te quedan " + this.lives + " vidas");
        $("#vidas").text(this.lives);
        $("#restart").hide();
        this.water.restart();
      } else {
        window.cancelAnimationFrame(this.animationFrameId);
        alert("Game Over");
        this.water.restart();
        $(".game").hide();
        $("#restart").show();
        $("#vidas").text("4");
        this.lives=4;
        this.level=0;
      }
  }
};

Game.prototype.start = function() {
  window.requestAnimationFrame(this.draw.bind(this));
};

Game.prototype.draw = function() {
  this.water.draw();
  this.gun.draw();
  this.circle.draw();

  switch (this.level) {
    case 0:
      this.plant.draw();
      $("#nivel").text(this.level);
      this.hitPlant(this.water.x, this.water.y, this.water.radius, this.plant.x, this.plant.y, this.plant.h);
      break;
    case 1:
      this.plant1.draw();
      $("#nivel").text(this.level);
      this.hitPlant(this.water.x, this.water.y, this.water.radius, this.plant1.x, this.plant1.y, this.plant1.h);
      break;
    case 2:
      this.plant2.draw();
      $("#nivel").text(this.level);
      this.hitPlant(this.water.x, this.water.y, this.water.radius, this.plant2.x, this.plant2.y, this.plant2.h);
      break;
  }
  this.animationFrameId = window.requestAnimationFrame(this.draw.bind(this));
};

// Comprobar si el click está dentro del círculo

function checkClick(circle, mouse) {
  return Math.sqrt((mouse.x - circle.x) * (mouse.x - circle.x) + (mouse.y - circle.y) * (mouse.y - circle.y)) < circle.radius &&
    Math.sqrt((mouse.x - circle.x) * (mouse.x - circle.x) + (mouse.y - circle.y) * (mouse.y - circle.y)) > circle.radiusIn;
}
