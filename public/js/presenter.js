define(["view", "manager"], function (view, manager) {
  "use script";

  return {

    askToJoinGame: function () {

      view.displayNicknameBox();
      this.onNicknameBoxSubmitHandler();

    },

    setPlayers: function (playersList) {
      view.emptyPlayersList();

      playersList.forEach(function (player) {
        view.addPlayerInList(player);
      });

    },

    /*************
    Listeners
    *************/

    onNicknameBoxSubmitHandler: function () {

      $("#nicknameBox").on('submit', function (evt) {
        evt.preventDefault();
        var nickname = $("#nickname").val();

        if (nickname.length > 0) {
          manager.joinGame(nickname);
          view.hideNicknameBox();
        } else {
          view.displayNicknameBox();
        }

      });
    },

    /************
    Socket commands
    *************/

    initializeReceivers: function () {

      manager.initializeSocketReceiver("updateGame", function (game) {
        console.log(game);
        this.setPlayers(game.players);
      }.bind(this));

    }

  };

});