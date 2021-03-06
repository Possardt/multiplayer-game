import io from 'socket.io-client';
import { addListeners } from './input.js';
import { startPhysicsLoop } from './physics.js';
import { paintCanvas } from './canvas.js';

const socket = io('http://localhost:3000/test');

let clientCalculations = {},
    serverCalculations = {};

const movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  count: 0,
  timeDifference: null
}

const player = {};
const otherPlayers = {};


socket.on('onconnected', data => {
  console.log(`connected to socket with user id: ${data.userId}`);
  player.userId = data.userId;
  player.x = data.x;
  player.y = data.y;
});

addListeners(movement);
startPhysicsLoop(movement, player);
paintCanvas(player, otherPlayers);



setInterval(function() {
  clientCalculations[movement.count] = movement;
  socket.emit('movement', movement);
}, 1000 / 60);


socket.on('state', players => {
  serverCalculations[players[player.userId].count] = Object.assign({}, players[player.userId]);
  delete players[player.userId];
  Object.assign(otherPlayers, players);
});
