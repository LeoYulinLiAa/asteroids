const Util = require('./utils')
const MovingObject = require('./moving_object');

/**
 *
 * @param {{pos: [number, number]}} param0 options
 */
const Asteroid = function ({ pos }) {
  MovingObject.call(this, {
    pos,
    vel: Util.randomVec(Math.random() * 6 + 1),
    color: Asteroid.COLOR,
    radius: Asteroid.RADIUS
  })
};

Asteroid.COLOR = "#666666";
Asteroid.RADIUS = 20;

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;