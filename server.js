const express          = require('express');
const app              = express();
const server 		    	 = require('http').createServer(app);
const io 				       = require('socket.io')(server);
const uuidv4           = require('uuid/v4');
const updatePlayerMove = require('./calculateMoves');
const gamePlayers = {};

app.use(express.static(__dirname + '/dist'));

let nsp = io.of('/test');

nsp.on('connection', client => {

  playerConnected(client, gamePlayers);  
  client.on('disconnect', () => playerDisconnected(client, gamePlayers));
  client.on('movement', playerMoves => {
    playerMoves.userId = client.userId;
    updatePlayerMove(gamePlayers, playerMoves);
  });

});


const playerConnected = (client, gamePlayers) => {
  client.userId = uuidv4();
  console.log(`\t Player: ${client.userId} connected.`);
  client.emit('onconnected', {userId : client.userId, x: 300, y: 300 });
  gamePlayers[client.userId] = {x: 300, y: 300};
}

const playerDisconnected = (client, gamePlayers) => {
  console.log(`\t Player: ${client.userId} disconnected.`);
  delete gamePlayers[client.userId];
}

setInterval(() => {
  console.log(gamePlayers);
  nsp.emit('state', gamePlayers);
}, 1000 / 60);

let port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on port ${port}`);
