const Game = require('./game');

/**
 * 
 * @param {{pos: [number, number], vel: [number, number], radius: number, color: string}} param0 option object
 * @param {Game} game
 */
function MovingObject({pos, vel, radius, color}) {
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
}

/**
 * @param {CanvasRenderingContext2D} context
 */

MovingObject.prototype.draw = function(context) {
  const [x, y] = this.pos;
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(
    x, y, this.radius, 0, 2 * Math.PI
  );
  context.fill();
};

MovingObject.prototype.move = function(posCallBack) {
  const [x, y] = this.pos;
  const [dx, dy] = this.vel;
  this.pos = posCallBack([x + dx, y + dy]);
};

MovingObject.prototype.isWrappable = true;



module.exports = MovingObject;