"use strict";

const Facing = require("./Facing.js");

class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  getX() {
    return this.x;
  }
  
  getY() {
    return this.y;
  }
  
  getFloorX() {
    return Math.floor(this.x);
  }
  
  getFloorY() {
    return Math.floor(this.y);
  }
  
  add(x, y = 0) {
    if (x instanceof Vector2) {
      return this.add(x.x, x.y);
    } else {
      return new Vector2(this.x + x, this.y + y);
    }
  }
  
  subtract(x = 0, y = 0) {
    if (x instanceof Vector2) {
      return this.add(-x.x, -x.y);
    } else {
      return this.add(-x, -y);
    }
  }
  
  multiply(number) {
    return new Vector2(this.x * number, this.y * number);
  }
  
  divide(number) {
    return new Vector2(this.x / number, this.y / number);
  }
  
  ceil() {
    return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
  }

	floor() {
	  return new Vector2(Math.floor(this.x), Math.floor(this.y));
	}

	round() {
	  return new Vector2(Math.round(this.x), Math.round(this.y));
	}
	
	abs() {
	  return new Vector2(Math.abs(this.x), Math.abs(this.y));
	}
	
	distance(x, y = 0) {
	  if (x instanceof Vector2) {
	    return Math.sqrt(this.distanceSquared(x.x, x.y));
	  } else {
	    return Math.sqrt(this.distanceSquared(x, y));
	  }
	}
	
	distanceSquared(x, y = 0) {
	  if (x instanceof Vector2) {
	    return this.distanceSquared(x.x, x.y);
	  } else {
	    return ((this.x -x) ** 2) + ((this.y - y) ** 2);
	  }
	}

	length() {
	  return Math.sqrt(this.lengthSquared());
	}

	lengthSquared() {
	  return this.x * this.x + this.y + this.y;
	}

	normalize() {
	  let len = this.lengthSquared();
	  
	  if (len > 0) {
	    return this.divide(Math.sqrt(len));
	  }
	  
	  return new Vector2(0, 0);
	}
	
	dot(v) {
	  return this.x * v.x + this.y * v.y;
	}

	__toString() {
	  return `Vector2 (x = ${this.x}, y = ${this.y})`;
	}
}

module.exports = Vector2;