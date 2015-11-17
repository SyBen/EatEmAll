define(['view', 'manager'], function (view, manager) {
  'use script';

  return {

    gameContainer: document.getElementById("game-container"),

    askToJoinGame: function () {

      view.displayNicknameBox();
      this._onNicknameBoxSubmitHandler();

    },

    _setPlayers: function (playersHash) {
      view.emptyPlayersList();
      
      var playersArray = [];
      for(var key in playersHash){
        playersArray.push(playersHash[key]);
      }
      
      //TODO sort by points
      playersArray.sort(function(player1, player2) {
        if (player1.position.x < player2.position.x)
          return -1;
        else if (player1.position.x > player2.position.x)
          return 1;
        return 0;
      });

     for(var j = 0; j<playersArray.length; j++){
        view.addPlayerInList(playersArray[j].nickname);
      }
    },

    _updateGame: function (game) {
           
      var ctx = this.gameContainer.getContext("2d");
      ctx.clearRect(0, 0, this.gameContainer.width, this.gameContainer.height);
      
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

    /*************
    Listeners
    *************/

    _onLeftKeyPressHandler: function () {
      manager.goTo('left');
    },

    _onRightKeyPressHandler: function () {
      manager.goTo('right');
    },

    _onUpKeyPressHandler: function () {
      manager.goTo('up');
    },

    _onDownKeyPressHandler: function () {
      manager.goTo('down');
    },

    _onNicknameBoxSubmitHandler: function () {

      $('#nicknameBox').on('submit', function (evt) {
        evt.preventDefault();
        var nickname = $('#nickname').val();

        if (nickname.length > 0) {
          manager.joinGame(nickname);
          view.hideNicknameBox();
        } else {
          view.displayNicknameBox();
        }

      });
    },

    _intializeGameListeners: function () {

      $(document).keydown(function (e) {
        switch (e.which) {
        case 37: // left
          this._onLeftKeyPressHandler();
          break;

        case 38: // up
          this._onUpKeyPressHandler();
          break;

        case 39: // right
          this._onRightKeyPressHandler();
          break;

        case 40: // down
          this._onDownKeyPressHandler();
          break;

        default:
          return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
      }.bind(this));

    },

    /************
    Socket commands
    *************/

    initializeReceivers: function () {
      
      manager.initializeSocketReceiver('updateGame', function (game) {
        console.log(game);
        this._setPlayers(game.playersHash);
        this._updateGame(game);
        
      }.bind(this));

      manager.initializeSocketReceiver('inGame', function () {
        console.log('Vous entrez dans le jeu !');
        this._intializeGameListeners();
      }.bind(this));
    }

  };

});