function Game() {
  this.canvas = document.getElementById('canvas');
  this.ctx =  this.canvas.getContext('2d');

  this.lives = 4;
  this.level = 0;
  this.gun = new Gun(this.canvas);
  this.water = new Water(this.canvas);
  this.plant = new Plant(this.canvas, 450, 300, 50, '#00FF00');
  this.plant1 = new Plant(this.canvas, 400, 200, 50, '#00FF00');
  this.plant2 = new Plant(this.canvas, 250, 400, 50, '#00FF00');
  this.circle = new Circle(this.canvas);
  this.clickInsideCircle = 0;

  this.animationFrameId  = null;

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

document.getElementById("restart").onclick = function(){
  $(".game").show();
};

Game.prototype.getMousePos = function(event) {
  rect = this.canvas.getBoundingClientRect();
  return {
    x: Math.floor(event.clientX - rect.left),
    y: Math.floor(event.clientY - rect.top)
  };
};

Game.prototype.hitPlant = function (waterX, waterY, waterR, plantX, plantY, plantH) {
  if (Math.floor(waterX) >= Math.floor(plantX) && Math.floor(waterX) <= Math.floor(plantX + plantH) && Math.floor(waterY) >= Math.floor(plantY) && Math.floor(waterY) <= Math.floor(plantY + plantH)){
    alert("hit!");
    this.level += 1;
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

        $("#vidas").text(this.lives); //no se actualiza
        this.water.restart();
      } else {
        window.cancelAnimationFrame(this.animationFrameId);
        alert("Game Over");
        this.water.restart();
        $(".game").hide();
        $("#restart").show();
        $("#vidas").text("0");
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
      $("#restart").hide();
      this.hitPlant(this.water.x, this.water.y, this.water.radius, this.plant.x, this.plant.y, this.plant.h);
      break;
    case 1:
      this.plant1.draw();
      this.hitPlant(this.water.x, this.water.y, this.water.radius, this.plant1.x, this.plant1.y, this.plant1.h);
      $("#restart").hide();
      break;
    case 2:
      this.plant2.draw();
      $("#restart").hide();
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
