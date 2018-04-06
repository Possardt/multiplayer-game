const express          = require('express');
const app              = express();
const server 		    	 = require('http').createServer(app);
const io 				       = require('socket.io')(server);
const uuidv4           = require('uuid/v4');
const updatePlayerMove = require('./calculateMoves');
const gamePlayers = {};

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
     res.sendfile('./public/views/index.html');
   });

let nsp = io.of('/test');

nsp.on('connection', client => {
  client.userId = uuidv4();
  console.log(`\t Player: ${client.userId} connected.`);
  gamePlayers[client.userId] = {x: 300, y: 300};

  client.emit('onconnected', {userId : client.userId, x: 300, y: 300 });
  client.on('disconnect', () => {
    console.log(`\t Player: ${client.userId} disconnected.`);
    delete gamePlayers[client.userId];
  });

  client.on('movement', playerMoves => {
    playerMoves.userId = client.userId;
    updatePlayerMove(gamePlayers, playerMoves);
  });
});

setInterval(() => {
  console.log(gamePlayers);
  nsp.emit('state', gamePlayers);
}, 1000 / 60);

let port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on port ${port}`);
