define([""], function () {
  "use script";

  return {

    _gameContainer: document.getElementById("game-container"),
    
    updateGameCanvas: function (game) {
      var ctx = this._gameContainer.getContext("2d");
      ctx.clearRect(0, 0, this._gameContainer.width, this._gameContainer.height);
      
      var x, y;
      
      ctx.fillStyle = '#fff';
      //Draw Pickups
      for(var i=0; i<game.pickups.length; i++){
        x = game.pickups[i].position.x*20;
        y = game.pickups[i].position.y*20;  
        ctx.beginPath();
        ctx.arc(x+10, y+10, 8, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#f01c1c';
        ctx.stroke();
        ctx.closePath();
      }   
      
      ctx.fillStyle = '#000';
      //Draw Players
      for(var key in game.playersHash){
        x = game.playersHash[key].position.x*20;
        y = game.playersHash[key].position.y*20;
        
        ctx.fillStyle = game.playersHash[key].color;
        ctx.fillRect(x, y, 20, 20);
      }

    },
    
    emptyPlayersList: function (user) {
      $("#usersDescriptionBox").empty();
    },

    addPlayerInList: function (nickname) {
      $("#usersDescriptionBox").append("<li>" + nickname + "</li>");
    },

    displayModal: function (title, body) {

      $("#modalBox .modal-title").html(title);

      $("#modalBox .modal-body").html(body);

      $('#modalBox').modal('show');
    },

    hideModal: function () {

      $("#modalBox .modal-title").html("");

      $("#modalBox .modal-body").html("");

      $('#modalBox').modal("hide");
    },

  };

});