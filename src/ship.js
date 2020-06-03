const Util = require("./utils");
const MovingObject = require("./moving_object");
const Game = require('./game');
const Bullet = require('./bullet');
const Const = require('./consts')

/**
 *
 * @param {{pos: [number, number]}} param0 options
 * @param {Game} game
 */
const Ship = function ({pos}, game) {
  MovingObject.call(this, {pos, radius: Ship.RADIUS, color: Ship.COLOR, vel: [0, 0]});
  this.game = game;
  this.updateControl();
}

Ship.RADIUS = 15;
Ship.COLOR = "#31a5d9";
Util.inherits(Ship, MovingObject)

Ship.prototype.reset = function () {
  this.vel = [0, 0];
}

Ship.prototype.updateControl = function() {
  this.controller = controlScheme(this.game.getControlMode());
}

/**
 * @param {number} keyStatus
 */
Ship.prototype.control = function (keyStatus) {
  this.vel = this.controller(keyStatus);
}

Ship.prototype.fireBullet = function () {

  const pos = this.pos;
  const vel = Util.extendVector(this.vel, 10) || [0, 10];
  const bullet = new Bullet({pos, vel});

  this.game.add(bullet);

}

/**
 * Get a function that returns a speed vector base on user input.
 *
 * @param {"polar"|"cartesian"} mode
 */
function controlScheme(mode) {
  if (mode === "polar") {
    let theta = 0;
    let speed = 0;

    /**
     * @param {number} keyStatus
     * @return {[number, number]}
     */
    return (keyStatus) => {
      if (keyStatus & Const.wMask) speed += Const.SPEED_INTERVAL;
      if (keyStatus & Const.aMask) theta -= Const.SPEED_INTERVAL / 2;
      if (keyStatus & Const.sMask) speed -= Const.SPEED_INTERVAL;
      if (keyStatus & Const.dMask) theta += Const.SPEED_INTERVAL / 2;
      return Util.rotate(Util.extendVector([1, 0], speed), theta);
    }
  } else {
    let dx = 0;
    let dy = 0;
    return (keyStatus) => {
      if (keyStatus & Const.wMask) dy -= Const.SPEED_INTERVAL;
      if (keyStatus & Const.aMask) dx -= Const.SPEED_INTERVAL;
      if (keyStatus & Const.sMask) dy += Const.SPEED_INTERVAL;
      if (keyStatus & Const.dMask) dx += Const.SPEED_INTERVAL;
      return [dx, dy];
    }
  }
}

module.exports = Ship;
