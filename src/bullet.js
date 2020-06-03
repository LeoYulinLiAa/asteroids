const MovingObject = require('./moving_object');
const Util = require('./utils')

const Bullet = function({pos, vel}) {
  MovingObject.call(this, {pos, vel, radius: Bullet.RADIUS, color: Bullet.COLOR});
  this.isWrappable = false;
}

Bullet.RADIUS = 2;
Bullet.COLOR = "white";

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isCollidedWith = function(otherObject) {
  const [x1, y1] = this.pos;
  const [x2, y2] = otherObject.pos;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) < this.radius + otherObject.radius;
}



module.exports = Bullet;