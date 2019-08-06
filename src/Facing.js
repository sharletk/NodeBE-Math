"use strict";

const Methods = require("nodebe-methods");

class Facing {
  constructor() {
    this.AXIS_Y = 0;
    this.AXIS_Z = 1;
    this.AXIS_X = 2;
    
    this.FLAG_AXIS_POSITIVE = 1;
    
    this.DOWN = this.AXIS_Y << 1;
    this.UP = (this.AXIS_Y << 1) | this.FLAG_AXIS_POSITIVE;
    this.NORTH = this.AXIS_Z << 1;
    this.SOUTH = (this.AXIS_Z << 1) | this.FLAG_AXIS_POSITIVE;
    this.WEST = this.AXIS_X << 1;
    this.EAST = (this.AXIS_X << 1) | this.FLAG_AXIS_POSITIVE;
    
    this.ALL = [
      this.DOWN,
      this.UP,
      this.NORTH,
      this.SOUTH,
      this.WEST,
      this.EAST
    ];
    
    this.HORIZONTAL = [
      this.NORTH,
      this.SOUTH,
      this.WEST,
      this.EAST
    ];
    
    this.CLOCKWISE = new Map();
    
    this.CLOCKWISE.set(this.AXIS_Y, [
      this.NORTH = this.EAST,
      this.EAST = this.SOUTH,
      this.SOUTH = this.WEST,
      this.WEST = this.NORTH
    ]);
    
    this.CLOCKWISE.set(this.AXIS_Z, [
      this.UP = this.EAST,
      this.EAST = this.DOWN,
      this.DOWN = this.WEST,
      this.WEST = this.UP
    ]);
    
    this.CLOCKWISE.set(this.AXIS_X, [
      this.UP = this.NORTH,
      this.NORTH = this.DOWN,
      this.DOWN = this.SOUTH,
      this.SOUTH = this.UP
    ]);
    
    //#IMPLEMENT FACING PROPERLY!!!
  }
  
  axis(direction) {
    return direction >> 1;
  }
  
  isPositive(direction) {
    return (direction & this.FLAG_AXIS_POSITIVE) === this.FLAG_AXIS_POSITIVE;
  }
  
  opposite(direction) {
    return direction ^ this.FLAG_AXIS_POSITIVE;
  }
  
  rotate(direction, axis, clockwise) {
    if (!Methods.Isset(this.CLOCKWISE.get(axis)))
      throw new Error(`Invalid axis ${axis}`);
      
    
    if (!Methods.Isset(this.CLOCKWISE.get(axis)[direction]))
      throw new Error(`Cannot rotate direction ${direction} around axis ${axis}`);
    
    let rotated = this.CLOCKWISE.get(axis)[direction];
    return clockwise ? rotated : this.opposite(rotated);
  }
  
  rotateX(direction, clockwise) {
    return this.rotate(direction, this.AXIS_X, clockwise);
  }
  
  rotateY(direction, clockwise) {
    return this.rotate(direction, this.AXIS_Y, clockwise);
  }
  
	rotateZ(direction, clockwise) {
    return this.rotate(direction, this.AXIS_Z, clockwise);
  }
	
	validate(facing) {
	  if (!this.ALL.includes(facing))
	    throw new Error(`Invalid direction ${facing}`);
	}
}

module.exports = Facing;