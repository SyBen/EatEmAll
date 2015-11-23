define(['view', 'manager'], function (view, manager) {
  'use script';

  return {

    _keyboardConfigured: false,

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

      playersArray.sort(function (player1, player2) {
        return player2.points - player1.points;
      });

      for (var j = 0; j < playersArray.length; j++) {
        view.addPlayerInList(playersArray[j], j + 1);
      }
    },

    _updateGame: function (game) {

      console.log(game);
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
          view.hideModal();
          manager.joinGame(nickname);

        } else {
          this._askToJoinGame();
        }


      });
    },

    _onWaitingGameHandler: function (game) {
      var title = 'Dans l\'attente de joueurs supplémentaires';
      var body = 'Veuillez attendre au moins un autre joueur pour commencer le jeu';


      this._setPlayers(game.playersHash);

      setTimeout(function () {
        view.displayModal(title, body);
      }, 1000);
    },

    _onStartGameHandler: function (game) {
      view.hideModal();

      if (!this._keyboardConfigured) {
        this._intializeGameListeners();
        this._keyboardConfigured = true;
      }

      this._setPlayers(game.playersHash);
      view.updateGameCanvas(game);
    },

    _onEndGameHandler: function (game) {

      if (this._keyboardConfigured) {

        $(document).off('keydown');

        this._keyboardConfigured = false;
      }

      var title = 'Jeu terminé';
      var playersArray = [];
      for (var key in game.playersHash) {
        playersArray.push(game.playersHash[key]);
      }

      playersArray.sort(function (player1, player2) {
        return player2.points - player1.points;
      });

      var body = 'Le joueur <b style="color:' + playersArray[0].color + '; text-transform: capitalize;">' + playersArray[0].nickname + '</b> a gagné la partie.<br> Ne bougez pas, le jeu va recommencer dans quelques secondes ...';

      view.displayModal(title, body);

      this._setPlayers(game.playersHash);
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
        console.log('updateGame event');
        this._updateGame(game);
      }.bind(this));

      manager.initializeSocketReceiver('waitingGame', function (game) {
        console.log('waitingGame event');
        this._onWaitingGameHandler(game);
      }.bind(this));

      manager.initializeSocketReceiver('startGame', function (game) {
        console.log('startGame event');
        this._onStartGameHandler(game);
      }.bind(this));

      manager.initializeSocketReceiver('inGame', function () {
        console.log('inGame event');
      }.bind(this));

      manager.initializeSocketReceiver('endGame', function (game) {
        console.log('endGame event');
        this._updateGame(game);
        this._onEndGameHandler(game);
      }.bind(this));
    }

  };

});