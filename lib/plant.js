function Plant(canvas, x, y, h, color) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.x = x;
  this.y = y;
  this.h = h;
  this.color = color;
  this.img = new Image();
  this.img.src = 'images/cactus.png';
  this.img.isReady = false;
  this.img.onload = function() {
    this.img.isReady = true;
  }.bind(this);
}

Plant.prototype.draw = function() {
  if (this.img.isReady) {
    this.ctx.drawImage(this.img, this.x, this.y, this.h, this.h);
  }
};
