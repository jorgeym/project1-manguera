function Circle(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.x = 0;
  this.y = 500;
  this.radius = 110;
  this.radiusIn = 100;
  this.color = '#bdbdbd';
}

Circle.prototype.draw = function() {
  this.ctx.strokeRect(0,0,this.canvas.width,this.canvas.height);
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  this.ctx.arc(this.x, this.y, this.radiusIn, 0, Math.PI * 2, true);
  this.ctx.closePath();
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
};
