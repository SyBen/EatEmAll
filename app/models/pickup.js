define(function () {
  "use strict";

  function Pickup(xPosition, yPosition) {
    if(!(this instanceof Pickup)) {
      throw new TypeError("Pickup constructor cannot be called as a function.");
    }

//    this.xSize = xSize;
//    this.ySize = ySize;

    this.position = {
      x: xPosition,
      y: yPosition
    };

    console.log("Pickup created at x : " + this.position.x + " y : " + this.position.y);

  }

  Pickup.prototype = {
    constructor: Pickup,

    getX: function() {
      return this.position.x;
    },

    getY: function() {
      return this.position.y;
    }
  };

  return Pickup;
});
