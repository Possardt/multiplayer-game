import io from 'socket.io-client';
import keyboardListener from './input.js';

const socket = io('http://localhost:3000/test');

const movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  count: 0
}


const player = {};
const playerSpeed = 3;

socket.on('onconnected', data => {
  console.log(`connected to socket with user id: ${data.userId}`);
  player.x = data.x;
  player.y = data.y;
});

setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);



let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
let context = canvas.getContext('2d');
socket.on('state', function(players) {
  // context.clearRect(0, 0, 800, 600);
  // context.fillStyle = 'green';
  // for (var id in players) {
  //   var player = players[id];
  //   context.beginPath();
  //   context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
  //   context.fill();
// }
});


let draw = () => {
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = 'green';
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

let lastUpdateTime = (new Date()).getTime();
setInterval(function() {
  let currentTime = (new Date()).getTime();
  let timeDifference = currentTime - lastUpdateTime;
  if(movement.left) player.x -= (playerSpeed * timeDifference);
  if(movement.right) player.x += (playerSpeed * timeDifference);
  if(movement.up) player.y -= (playerSpeed * timeDifference);
  if(movement.down) player.y += (playerSpeed * timeDifference);
  movement.count++;
  lastUpdateTime = currentTime;
  // draw();
}, 1000 / 60);
