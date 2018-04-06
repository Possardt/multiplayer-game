const paintCanvas = (player) => {
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

      //TODO: paint other players

      context.fill();
      requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
}

module.exports = paintCanvas;
