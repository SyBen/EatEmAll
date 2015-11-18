define(['view', 'manager'], function (view, manager) {
  'use script';

  return {

    _askToJoinGame: function () {
      var title = "Bienvenue sur le Jeu EatEmAll";
      var body = "<form class=\"form-inline\" id=\"nicknameBox\"><div class=\"input-group\"><input type=\"text\" name=\"nickname\" id=\"nickname\" placeholder=\"Entrez votre surnom\" class=\"form-control\"><span class=\"input-group-btn\"><button id=\submitNicknameBtn\" class=\"btn\" type=\"submit\">Jouer !</button></span></div></form>";

      view.displayModal(title, body);
      this._onNicknameBoxSubmitHandler();

    },

    _setPlayers: function (playersHash) {
      view.emptyPlayersList();

      var playersArray = [];
      for (var key in playersHash) {
        playersArray.push(playersHash[key]);
      }

      //TODO sort by points
      playersArray.sort(function (player1, player2) {
        if (player1.position.x < player2.position.x)
          return -1;
        else if (player1.position.x > player2.position.x)
          return 1;
        return 0;
      });

      for (var j = 0; j < playersArray.length; j++) {
        view.addPlayerInList(playersArray[j]);
      }
    },

    _updateGame: function (game) {

      this._setPlayers(game.playersHash);
      view.updateGameCanvas(game);
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
          view.hideModal();
        } else {
          this._askToJoinGame();
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

      manager.initializeSocketReceiver('connect', function (game) {
        this._askToJoinGame();

      }.bind(this));

      manager.initializeSocketReceiver('connect_error', function (game) {
        this._askToJoinGame();

      }.bind(this));

      manager.initializeSocketReceiver('updateGame', function (game) {

        this._updateGame(game);

      }.bind(this));

      manager.initializeSocketReceiver('inGame', function () {
        console.log('Vous entrez dans le jeu !');
        this._intializeGameListeners();
      }.bind(this));
    }

  };

});