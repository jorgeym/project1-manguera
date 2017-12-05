function Water(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.x = 50;
  this.y = 450;
  this.vx = 2;
  this.vy = 2;
  this.gravity = 0.005;
  this.radius = 3;
  this.color = '#000080';
  this.isMoving = false;
}

Water.prototype.draw = function() {
  if (this.isMoving) {
    this.x += this.vx;
    this.vy -= this.gravity;
    this.y -= this.vy;
  }
  this.ctx.strokeRect(0,0,this.canvas.width,this.canvas.height);
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  this.ctx.closePath();
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
};

Water.prototype.update = function() {
  // movimiento agua
  this.x += this.vx;
  this.vy -= this.gravity;
  this.y -= this.vy;
  this.draw();
};

Water.prototype.restart = function() {
  this.isMoving = false;
  this.x = 50; // parece un poco cutre con los números introducidos tal cual
  this.y = 450;
  this.vx = 2;
  this.vy = 2;
  this.lives = 4; // alguna forma de hacer restart sin volver a meter el número?
  this.level = 0;
  $("#vidas").text(this.lives);
  $("#nivel").text(this.level);
  this.gravity = 0.004;
  this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
};
