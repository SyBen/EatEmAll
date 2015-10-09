define(["socketio"], function (io) {
  "use script";
  
  return {
    
    _socket: io.connect('http://localhost:8080'),
    
    _commands: {
      
    },
    
    send: function (command, data) {
      this._socket.emit(command, data);
    },
    
    receive: function (command, data) {
      this.on(command, data);
    },
    
    initializeConnection: function () {
      console.log("Bouh");
    },
    
  };

});