var require = {
  paths: {
    socketio: '../socket.io/socket.io'
  },
  shim: {
    'socketio': {
      exports: 'io'
    }
  }
};