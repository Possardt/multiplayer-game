import io from 'socket.io-client';

const socket = io('http://localhost:3000/test');

const movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.on('onconnected', data => {
  console.log(`connected to socket with user id: ${data.userId}`);
});

setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);


// let lastUpdateTime = (new Date()).getTime();
// setInterval(function() {
//   var currentTime = (new Date()).getTime();
//   var timeDifference = currentTime - lastUpdateTime;
//   if(data.left) player.x -= 5;
//   if(data.right) player.x += 5;
//   if(data.up) player.y -= 5;
//   if(data.down) player.y += 5;
//   lastUpdateTime = currentTime;
// }, 1000 / 60);

let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
let context = canvas.getContext('2d');
socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});