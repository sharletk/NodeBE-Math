"use strict";

const Vector2 = require("./Vector2.js");

class VectorMath {
  getDirection2D(azimuth) {
    return new Vector2(Math.cos(azimuth), Math.sin(azimuth));
  }
}

module.exports = VectorMath;