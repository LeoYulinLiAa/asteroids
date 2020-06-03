const MovingObject = require('./moving_object');
const Util = require('./utils')

const Bullet = function({pos, vel}) {
  MovingObject.call(this, {pos, vel, radius: Bullet.RADIUS, color: Bullet.COLOR});
  this.isWrappable = false;
}

Bullet.RADIUS = 2;
Bullet.COLOR = "white";

Util.inherits(Bullet, MovingObject);



module.exports = Bullet;
