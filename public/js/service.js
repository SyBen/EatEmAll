define(["socketio"], function (io) {
  "use script";
  
  return {
    
    _socket: io.connect('http://localhost:8080'),
    
    initializeConnection: function () {
      console.log("Bouh");
    },
    
  };

});