const startPhysicsLoop = (movement, player) => {
  setInterval(function() {
  let lastUpdateTime = (new Date()).getTime();
    let currentTime = (new Date()).getTime();
    let timeDifference = currentTime - lastUpdateTime;
    if(movement.left) player.x -= (playerSpeed * timeDifference);
    if(movement.right) player.x += (playerSpeed * timeDifference);
    if(movement.up) player.y -= (playerSpeed * timeDifference);
    if(movement.down) player.y += (playerSpeed * timeDifference);
    movement.count++;
    movement.timeDifference = timeDifference;
    lastUpdateTime = currentTime;
  }, 1000 / 60);
};

module.exports = startPhysicsLoop;
