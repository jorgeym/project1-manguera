function Gun(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.img = new Image();
  this.img.src = 'images/fire-department-icon-16.png';
  this.img.isReady = false;
  this.img.onload = function() {
    this.img.isReady = true;
  }.bind(this);

  this.x = -2;
  this.y = 417;
  this.width = 80;
  this.height = 80;
}

Gun.prototype.draw = function() {
  if (this.img.isReady) {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
};
