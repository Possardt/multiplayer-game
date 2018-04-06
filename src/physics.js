import { constants } from './constants.js';

export function startPhysicsLoop(movement, player) {
  let lastUpdateTime = (new Date()).getTime();
  setInterval(function() {
    let currentTime = (new Date()).getTime();
    let timeDifference = currentTime - lastUpdateTime;
    if(movement.left) player.x -= (constants.PLAYER_SPEED * timeDifference);
    if(movement.right) player.x += (constants.PLAYER_SPEED * timeDifference);
    if(movement.up) player.y -= (constants.PLAYER_SPEED * timeDifference);
    if(movement.down) player.y += (constants.PLAYER_SPEED * timeDifference);
    movement.count++;
    movement.timeDifference = timeDifference;
    lastUpdateTime = currentTime;
    console.log(player);
  }, 1000 / 60);
};
