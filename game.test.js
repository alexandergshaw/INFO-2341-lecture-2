const { checkCoinCollision, checkEnemyCollision } = require("./game");

test("Coin collision increases score", () => {
    let initialScore = score;
    checkCoinCollision();
    expect(score).toBeGreaterThan(initialScore);
});

test("Enemy collision reduces health", () => {
    let initialHealth = player.health;
    checkEnemyCollision();
    expect(player.health).toBeLessThan(initialHealth);
});
