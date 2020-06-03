const Asteroid = require("./asteroid.js");
const Ship = require("./ship");
const MovingObject = require("./moving_object");
const Bullet = require('./bullet');
const Consts = require('./consts');

const Game = function () {
  this.controlMode = 'polar';
  this.movingObjects = new Set();
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    const pos = this.randomPosition();
    const asteroid = new Asteroid({ pos });
    this.add(asteroid);
  }
  const pos = this.randomPosition();
  this.ship = new Ship({ pos }, this);
  this.bullets = new Set();
  this.keyStatus = 0;
}

Game.prototype.add = function (object) {
  if (object instanceof Asteroid) {
    this.movingObjects.add(object);
  } else if (object instanceof Bullet) {
    this.bullets.add(object);
  }
}

Game.prototype.remove = function (object) {
  if (object instanceof Asteroid) {
    this.movingObjects.delete(object);
  } else if (object instanceof Bullet) {
    this.bullets.delete(object);
  }
}

Game.prototype.getControlMode = function() {
  return this.controlMode;
}

Game.prototype.setControlMode = function(mode) {
  this.controlMode = mode;
  this.ship.updateControl();
}

Game.prototype.randomPosition = function () {
  return [(Math.random() * Consts.DIM_X), (Math.random() * Consts.DIM_Y)];
}

/**
 * @param {CanvasRenderingContext2D} context
 */
Game.prototype.draw = function (context) {
  context.clearRect(0, 0, Consts.DIM_X, Consts.DIM_Y);
  this.allObjects().forEach(o => o.draw(context));
}

Game.prototype.moveObjects = function () {
  this.ship.control(this.keyStatus);
  if (this.keyStatus & Consts.spaceMask) this.ship.fireBullet();
  this.allObjects().forEach(o => {
    if (o.isWrappable) {
      o.move(this.wrap);
    } else {
      o.move(pos => {
        if (this.isOutOfBounds(pos)) this.remove(o);
        return pos;
      });
    }
  });
}

/**
 * @param {[number, number]}
 * @returns {[number, number]}
 */
Game.prototype.wrap = function ([x, y]) {
  return [(x + Consts.DIM_X) % Consts.DIM_X, (y + Consts.DIM_Y) % Consts.DIM_Y];
}

Game.prototype.checkCollisions = function () {
  this.movingObjects.forEach(o => {
    if (this.ship.isCollidedWith(o)) {
      this.relocate(this.ship);
      this.ship.reset();
    }
  })
  this.bullets.forEach(b => {
    this.movingObjects.forEach(o => {
      if (b.isCollidedWith(o)) {
        this.remove(o);
        this.remove(b);
      }
    })
  })
}

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

/**
 * @param {MovingObject} object
 */
Game.prototype.relocate = function (object) {
  object.pos = this.randomPosition();
}

/**
 * @returns {Array<MovingObject>}
 */
Game.prototype.allObjects = function () {
  return [...this.movingObjects, this.ship, ...this.bullets];
}

Game.prototype.isOutOfBounds = function(pos) {
  const [x, y] = pos;
  return x > Game.DIM_X || x < 0 || y > Game.DIM_Y || y < 0;
}

Game.NUM_ASTEROIDS = 20;

module.exports = Game;
