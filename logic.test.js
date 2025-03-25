const { collides, checkCoinCollision, checkEnemyCollision } = require("./logic");

test("collides returns true when two objects overlap", () => {
  const a = { x: 0, y: 0, size: 10 };
  const b = { x: 5, y: 5, size: 10 };
  expect(collides(a, b)).toBe(true);
});

test("checkCoinCollision detects coin collection", () => {
  const player = { x: 0, y: 0, size: 10 };
  const coins = [{ x: 0, y: 0, size: 10 }, { x: 50, y: 50, size: 10 }];

  const { updatedCoins, scoreDelta } = checkCoinCollision(player, coins);

  expect(scoreDelta).toBe(1);
  expect(updatedCoins.length).toBe(1); // only one coin left
});

test("checkEnemyCollision returns true if enemy hits player", () => {
  const player = { x: 0, y: 0, size: 10 };
  const enemies = [{ x: 0, y: 0, size: 10 }];
  expect(checkEnemyCollision(player, enemies)).toBe(true);
});

test("checkEnemyCollision returns false if no enemies hit player", () => {
  const player = { x: 0, y: 0, size: 10 };
  const enemies = [{ x: 50, y: 50, size: 10 }];
  expect(checkEnemyCollision(player, enemies)).toBe(false);
});
