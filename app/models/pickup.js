define(function () {
  "use strict";

  function Pickup(xSize, ySize) {
    if(!(this instanceof Pickup)) {
      throw new TypeError("Pickup constructor cannot be called as a function.");
    }

    this.xSize = xSize;
    this.ySize = ySize;

    this.x = Math.floor(Math.random() * xSize);
    this.y = Math.floor(Math.random() * ySize);
    console.log("Pickup created at x : " + this.x + " y : " + this.y);
  }

  Pickup.prototype = {
    constructor: Pickup,

    getX: function() {
      return this.x;
    },

    getY: function() {
      return this.y;
    }
  };

  return Pickup;
});
