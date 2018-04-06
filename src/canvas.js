

export function paintCanvas(player, otherPlayers){
  let canvas = document.getElementById('canvas');
  canvas.width = 800;
  canvas.height = 600;
  let context = canvas.getContext('2d');
  //Drawing as soon as the requestAnimFrame lets me
  let draw = () => {
      context.clearRect(0, 0, 800, 600);

      //current Player
      context.fillStyle = 'green';
      context.beginPath();
      context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
      context.fill();

      //painting other players
      context.fillStyle = 'red';
      let otherPlayersValues = Object.keys(otherPlayers).map(playerId => otherPlayers[playerId]);
      for(let i = 0; i < otherPlayersValues.length; i++){
        context.beginPath();
        context.arc(otherPlayersValues[i].x, otherPlayersValues[i].y, 10, 0, 2 * Math.PI);
        context.fill();
      }

      requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}
