const Asteroid = require("./asteroid.js");
const Ship = require("./ship");
const MovingObject = require("./moving_object");
const Bullet = require('./bullet');

const Game = function () {
  this.movingObjects = new Set();
  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
    const pos = this.randomPostion();
    const asteroid = new Asteroid({ pos });
    this.add(asteroid);
  }
  const pos = this.randomPostion();
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


Game.prototype.randomPostion = function () {
  return [(Math.random() * Game.DIM_X), (Math.random() * Game.DIM_Y)];
}

/**
 * @param {CanvasRenderingContext2D} context
 */
Game.prototype.draw = function (context) {
  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(o => o.draw(context));
}

Game.prototype.moveObjects = function () {
  if (this.keyStatus & Game.wMask) this.ship.power([0, -0.25]);
  if (this.keyStatus & Game.aMask) this.ship.power([-0.25, 0]);
  if (this.keyStatus & Game.sMask) this.ship.power([0, 0.25]);
  if (this.keyStatus & Game.dMask) this.ship.power([0.25, 0]);
  if (this.keyStatus & Game.spaceMask) this.ship.fireBullet();
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
  return [(x + Game.DIM_X) % Game.DIM_X, (y + Game.DIM_Y) % Game.DIM_Y];
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
  object.pos = this.randomPostion();
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

Game.DIM_X = 768;
Game.DIM_Y = 512;
Game.NUM_ASTEROIDS = 10;
Game.wMask = 0x1;
Game.aMask = 0x10;
Game.sMask = 0x100;
Game.dMask = 0x1000;
Game.spaceMask = 0x10000;

module.exports = Game;
