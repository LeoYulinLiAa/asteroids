const Util = require("./utils");
const MovingObject = require("./moving_object");
const Game = require('./game');
const Bullet = require('./bullet');

/**
 * 
 * @param {{pos: [number, number]}} param0 options
 * @param {Game} game 
 */
const Ship = function({pos}, game) {
    MovingObject.call(this, {pos, radius: Ship.RADIUS, color: Ship.COLOR, vel: [0,0]});
    this.game = game;
}

Ship.RADIUS = 15;
Ship.COLOR = "#31a5d9";
Util.inherits(Ship, MovingObject)

Ship.prototype.reset = function() {
  this.vel = [0, 0];
}

/**
 * @param {MovingObject} otherObject
 * @returns {boolean}
 */
Ship.prototype.isCollidedWith = function(otherObject) {

  const [x1, y1] = this.pos;
  const [x2, y2] = otherObject.pos;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) < this.radius + otherObject.radius;
};

Ship.prototype.power = function(impulse) {
  const [dx, dy] = this.vel;
  const [ix, iy] = impulse;
  this.vel = [dx + ix, dy + iy];
}

Ship.prototype.fireBullet = function() {

  const pos = this.pos;
  const [dx, dy] = this.vel;
  if (dx === 0 && dy === 0) return;
  const vel = [dx * 5, dy * 5];
  const bullet = new Bullet({pos, vel});
  
  this.game.add(bullet);
  
}

module.exports = Ship;