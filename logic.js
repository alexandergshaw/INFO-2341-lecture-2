// logic.js

function collides(a, b) {
    return (
      a.x < b.x + b.size &&
      a.x + a.size > b.x &&
      a.y < b.y + b.size &&
      a.y + a.size > b.y
    );
  }
  
  function checkCoinCollision(player, coins) {
    const newCoins = [];
    let collected = false;
  
    coins.forEach((coin) => {
      if (collides(player, coin)) {
        collected = true;
      } else {
        newCoins.push(coin);
      }
    });
  
    return {
      updatedCoins: newCoins,
      scoreDelta: collected ? 1 : 0,
    };
  }
  
  function checkEnemyCollision(player, enemies) {
    for (const enemy of enemies) {
      if (collides(player, enemy)) {
        return true; // player hit
      }
    }
    return false;
  }
  
  module.exports = { collides, checkCoinCollision, checkEnemyCollision };
  