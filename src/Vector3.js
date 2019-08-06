"use strict";

const Facing = require("./Facing.js");

class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  getX() {
    return this.x;
  }
  
  getY() {
    return this.y;
  }
  
  getZ() {
    return this.z;
  }
  
  getFloorX() {
    return Math.floor(this.x);
  }
  
  getFloorY() {
    return Math.floor(this.y);
  }
  
  getFloorZ() {
    return Math.floor(this.z);
  }
  
  add(x, y = 0, z = 0) {
    if (x instanceof Vector3) {
      return new Vector3(this.x + x.x, this.y + x.y, this.z + x.z);
    } else {
      return new Vector3(this.x + x, this.y + y, this.z + z);
    }
  }
  
  subtract(x = 0, y = 0, z = 0) {
    if (x instanceof Vector3) {
      return this.add(-x.x, -x.y, -x.z);
    } else {
      return this.add(-x, -y, -z);
    }
  }
  
  multiply(number) {
    return new Vector3(this.x * number, this.y * number, this.z * number);
  }
  
  divide(number) {
    return new Vector3(this.x / number, this.y / number, this.z / number);
  }
  
  ceil() {
    return new Vector3(Math.ceil(this.x), Math.floor(this.y), Math.floor(this.z));
  }

	floor() {
	  return new Vector3(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
	}

	round() {} //Implement.
	
	abs() {
	  return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
	}
	
	getSide(side, step = 1) {
	  switch (side) {
	    case Facing.DOWN:
	    return new Vector3(this.x, this.y - step, this.z);
	    
	    case Facing.UP:
	    return new Vector3(this.x, this.y + step, this.z);
	    
	    case Facing.NORTH:
	    return new Vector3(this.x, this.y, this.z - step);
	    
	    case Facing.SOUTH:
	    return new Vector3(this.x, this.y, this.z + step);
	    
	    case Facing.WEST:
	    return new Vector3(this.x - step, this.y, this.z);
	    
	    case Facing.EAST:
	    return new Vector3(this.x + step, this.y, this.z);
	    
	    default:
	    return this;
	  }
	}
	
	down(step = 1) {
	  return this.getSide(Facing.DOWN, step);
	}
	
	up(step = 1) {
	  return this.getSide(Facing.UP, step);
	}
	
	north(step = 1) {
	  return this.getSide(Facing.NORTH, step);
	}
	
	south(step = 1) {
	  return this.getSide(Facing.SOUTH, step);
	}
	
	west(step = 1) {
	  return this.getSide(Facing.WEST, step);
	}
	
	east(step = 1) {
	  return this.getSide(Facing.EAST, step);
	}
	
	sides(step = 1) {
	  for (facing in Facing.ALL) {
	    function* y(facing) {
	      "use strict";
	      
	      return facing = yield[this.getSide(facing, step)];
	    }
	    
	    facing = y(facing);
	  }
	}
	
	sidesArray(keys = false, step = 1) {
	  //return iterator_to_array($this->sides($step), $keys);
	  //implement
	}
	
	sidesAroundAxis(axis, step = 1) {
	  for (facing in Facing.ALL) {
	    if (Facing.axis(facing) !== axis) {
	      function* y(facing) {
	      "use strict";
	      
	      return facing = yield[this.getSide(facing, step)];
	      }
	    
	      facing = y(facing);
	    }
	  }
	}
	
	asVector3() {
	  return new Vector3(this.x, this.y, this.z);
	}
	
	distance(pos) {
	  return Math.sqrt(this.distanceSquared(pos));
	}
	
	distanceSquared(pos) {
	  return ((this.x - pos.x) ** 2) + ((this.y - pos.y) ** 2) + ((this.z - pos.z) ** 2);
	}

	maxPlainDistance(x = 0, z = 0) {
	  if (x instanceof Vector3) {
	    return this.maxPlainDistance(x.x, x.z);
	  } /*else if (x instanceof Vector2) {
	    return this.maxPlainDistance(x.x, x.y);
	  }*/ else {
	    return Math.max(Math.abs(this.x - x), Math.abs(this.z - z));
	  }
	}

	length() {
	  return Math.sqrt(this.lengthSquared());
	}

	lengthSquared() {
	  return this.x * this.x + this.y + this.y + this.z + this.z;
	}

	normalize() {
	  let len = this.lengthSquared();
	  
	  if (len > 0) {
	    return this.divide(Math.sqrt(len));
	  }
	  
	  return new Vector3(0, 0, 0);
	}
	
	dot(v) {
	  return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	cross(v) {
	  return new Vector3(
	    this.y * v.z - this.z * v.y,
	    this.z * v.x - this.x * v.z,
	    this.x * v.y - this.y * v.x
	  );
	}

	equals(v) {
	  return this.x == v.x && this.y == vy && this.z == v.z;
	}

	getIntermediateWithXValue(v, x) {
	  let xDiff = v.x - this.x;
	  
	  if ((xDiff * xDiff) < 0.0000001) return null;
	  
	  let f = (x - this.x) / xDiff;
	  
	  if (f < 0 || f > 1) {
	    return null
	  } else {
	    return new Vector3(x, this.y + (v.y - this.y) * f, this.z + (v.z - this.z) * $f);
	  }
	}
	
	getIntermediateWithYValue(v, y) {
	  let yDiff = v.y - this.y;
	  
	  if ((yDiff * yDiff) < 0.0000001) return null;
	  
	  let f = (y - this.y) / yDiff;
	  
	  if (f < 0 || f > 1) {
	    return null
	  } else {
	    return new Vector3(this.x + (v.x - this.x) * f, y, this.z + (v.z - this.z) * f);
	  }
	}
	
	getIntermediateWithZValue(v, z) {
	  let zDiff = v.z - this.z;
	  
	  if ((zDiff * zDiff) < 0.0000001) return null;
	  
	  let f = (z - this.z) / zDiff;
	  
	  if (f < 0 || f > 1) {
	    return null
	  } else {
	    return new Vector3(this.x + (v.x - this.x) * f, this.y + (v.y - this.y) * f, z);
	  }
	}
	
	setComponents(x, y, z) {
	  this.x = x;
	  this.y = y;
	  this.z = z;
	  return this;
	}
	
	__toString() {
	  return `Vector3 (x = ${this.x}, y = ${this.y}, z = ${this.z})`;
	}

	maxComponents(...positions) {
	  let xList = yList = zList = new Array();
	  
	  for (position in positions) {
	    xList.push(position.x);
	    yList.push(position.y);
	    zList.push(position.z);
	  }
	  
	  return new Vector3(Math.max(xList), Math.max(yList), Math.max(zList));
	}
	
	minComponents(...positions) {
	  let xList = yList = zList = new Array();
	  
	  for (position in positions) {
	    xList.push(position.x);
	    yList.push(position.y);
	    zList.push(position.z);
	  }
	  
	  return new Vector3(Math.min(xList), Math.min(yList), Math.min(zList));
	}		
}

module.exports = Vector3;