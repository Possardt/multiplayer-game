const updatePlayerMove = (gamePlayers, data) => {
  let player = gamePlayers[data.userId];
  let timeDifference = data.timeDifference ? data.timeDifference : 1;
  if(!player){
    console.log('player not found');
  }

  if(data.left) player.x += (0.25 * timeDifference);
  if(data.right) player.x -= (0.25 * timeDifference);
  if(data.up) player.y -= (0.25 * timeDifference);
  if(data.down) player.y += (0.25 * timeDifference);
  player.count = data.count;

};


module.exports = updatePlayerMove;
