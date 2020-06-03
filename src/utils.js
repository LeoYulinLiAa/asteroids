const Util = {
  inherits(ChildClass, ParentClass) {
    const Surrogate = function() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  },
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  /**
   * @param {[number, number]} vector
   */
  magnitudeSqOf(vector) {
    const [x, y] = vector;
    return x ** 2 + y ** 2;
  },
  /**
   * @param {[number, number]} vector
   */
  magnitudeOf(vector) {
    return Math.sqrt(this.magnitudeSqOf(vector));
  },
  /**
   * @param {[number, number]} vector
   * @returns {[number, number]} the unit vector. In case where the vector has a length of 0, the original vector will be returned
   */
  unitVectorOf(vector) {
    const magnitude = this.magnitudeOf(vector);
    return magnitude ? this.scale(vector, 1 / magnitude) : vector;
  },
  /**
   * Returns an new vector which length is `length` longer than the provided vector.
   * When given a 0 vector, this returns null.
   *
   * @param {[number, number]} vector the reference vector
   * @param {number} length the length to extend
   * @returns {[number, number]|null}
   */
  extendVector(vector, length) {
    const magnitude = this.magnitudeOf(vector);
    if (magnitude) {
      const extendedMagnitude = magnitude + length;
      return this.scale(this.scale(vector, 1 / magnitude), extendedMagnitude);
    } else {
      return null;
    }
  }
};

module.exports = Util;
