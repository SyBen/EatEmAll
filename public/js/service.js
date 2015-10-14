define(["socketio"], function (io) {
  "use script";

  return {

    _socket: io(),

    _commands: {

    },

    send: function (command, data) {
      this._socket.emit(command, data);
    },

    receive: function (command, data) {
      this._socket.on(command, data);
    },


  };

});