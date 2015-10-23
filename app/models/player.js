define(function () {
  "use strict";

  function Player(nickname) {

    if (!(this instanceof Player)) {
      throw new TypeError("Player constructor cannot be called as a function.");
    }

    this._nickname = nickname;
    this._position = {
      x: 0,
      y: 0
    };

    this._points = 0;

    console.log("Player " + this._nickname + " created !");

  }

  Player.prototype = {

    constructor: Player,

    getNickname: function () {
      return this._nickname;
    },

    getXPosition: function () {
      return this._position.x;
    },

    setXPosition: function (x) {
      this._position.x = x;
    },

    getYPosition: function () {
      return this._position.y;
    },

    setYPosition: function (y) {
      this._position.y = y;
    },

    getPoints: function () {
      return this._points;
    },

    setPoints: function (points) {
      this._points = points;
    },

    toString: function () {
      return "Player " + this._nickname + " in position (" + this._position.x + ", " + this._position.y + ") have " + this._points + " points.";
    }
  };

  return Player;

});