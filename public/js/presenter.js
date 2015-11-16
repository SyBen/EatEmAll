define(['view', 'manager'], function (view, manager) {
  'use script';

  return {
    
    gameContainer: document.getElementById("game-container"),

    askToJoinGame: function () {

      view.displayNicknameBox();
      this._onNicknameBoxSubmitHandler();

    },

    _setPlayers: function (playersList) {
      view.emptyPlayersList();

      playersList.forEach(function (player) {
        view.addPlayerInList(player.nickname);
      });

    },
    
    _updateGame: function (game) {
      
      var ctx = this.gameContainer.getContext("2d");
      ctx.clearRect(0, 0, this.gameContainer.width, this.gameContainer.height);
      
      game.players.forEach( function (player) {
        ctx.fillStyle = player.color;
        ctx.fillRect((player.position.x*10)%500, (player.position.y*10)%500, 10, 10);
      });     
      
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
      
      $(document).keydown(function(e) {
        switch(e.which) {
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

            default: return; // exit this handler for other keys
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
        this._setPlayers(game.players);
        this._updateGame(game);
      }.bind(this));

      manager.initializeSocketReceiver('inGame', function () {
        console.log('Vous entrez dans le jeu !');
        this._intializeGameListeners();
      }.bind(this));
    }

  };

});