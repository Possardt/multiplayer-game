const express          = require('express');
const app              = express();
const server 		    	 = require('http').createServer(app);
const io 				       = require('socket.io')(server);
const uuidv4           = require('uuid/v4');
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
  client.on('disconnect', () => console.log(`\t Player: ${client.userId} disconnected.`));

  client.on('movement', data => {
    let player = gamePlayers[client.userId] || {};
    if(data.left) player.x -= 5;
    if(data.right) player.x += 5;
    if(data.up) player.y -= 5;
    if(data.down) player.y += 5;
  });
});

setInterval(() => {
  nsp.emit('state', gamePlayers);
}, 1000 / 60);

let port = process.env.PORT || 3000;
server.listen(port);
console.log(`Server listening on port ${port}`);
