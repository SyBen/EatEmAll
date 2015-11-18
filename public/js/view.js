define([''], function () {
  'use script';

  return {

    _gameContainer: document.getElementById('game-container'),
    
    updateGameCanvas: function (game) {
      var ctx = this._gameContainer.getContext('2d');
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
      $('#usersDescriptionTable').empty();
    },

    addPlayerInList: function (player, pos) {
      $('#usersDescriptionTable').append('<tr><td>'+pos+'</td><td>'+player.nickname+'</td><td><span class="badge" style="background-color:'+player.color+'">'+player.points+'</span></td></tr>');
      
//
//<tr>
//  <td>1</td>
//  <td>Mark</td>
//  <td>Otto</td>
//  <td>@mdo</td>
//</tr>
    },

    displayModal: function (title, body) {

      $('#modalBox .modal-title').html(title);

      $('#modalBox .modal-body').html(body);

      $('#modalBox').modal('show');
    },

    hideModal: function () {

      $('#modalBox .modal-title').html('');

      $('#modalBox .modal-body').html('');

      $('#modalBox').modal('hide');
    },

  };

});