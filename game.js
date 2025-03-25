const { checkCoinCollision, checkEnemyCollision } = require("./logic");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 200;
canvas.height = 200;

let player = { x: 20, y: 20, size: 10, health: 3 };
let coins = generateCoins(3);
let enemies = [
    { x: 150, y: 50, size: 10, speed: 1 }
];
let score = 0;
let walls = [{ x: 80, y: 80, size: 20 }, { x: 40, y: 40, size: 20 }];

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
    const speed = 10;
    let newX = player.x;
    let newY = player.y;

    if (e.key === "ArrowUp") newY -= speed;
    if (e.key === "ArrowDown") newY += speed;
    if (e.key === "ArrowLeft") newX -= speed;
    if (e.key === "ArrowRight") newX += speed;

    if (!collidesWithWalls(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }

    checkCoinCollision();
    checkEnemyCollision();
    drawGame();
}

function generateCoins(count) {
    let newCoins = [];
    for (let i = 0; i < count; i++) {
        newCoins.push({
            x: Math.floor(Math.random() * 18) * 10,
            y: Math.floor(Math.random() * 18) * 10,
            size: 10
        });
    }
    return newCoins;
}

function spawnNewEnemy() {
    enemies.push({
        x: Math.random() * 180,
        y: Math.random() * 180,
        size: 10,
        speed: 1 + score * 0.1 // Slightly faster enemies over time
    });
}

function checkCoinCollision() {
    coins.forEach((coin, index) => {
        if (collides(player, coin)) {
            score++;
            document.getElementById("score").textContent = `Score: ${score}`;
            coins.splice(index, 1);
            coins.push(generateCoins(1)[0]); // Respawn a new coin
            spawnNewEnemy(); // New enemy spawns when a coin is collected
        }
    });
}

function checkEnemyCollision() {
    enemies.forEach(enemy => {
        if (collides(player, enemy)) {
            player.health--;
            updateHealthDisplay();
            if (player.health === 0) {
                endGame();
            }
        }
    });
}

function updateHealthDisplay() {
    let healthText = "❤️".repeat(player.health);
    document.getElementById("health").textContent = `Health: ${healthText}`;
}

function collidesWithWalls(x, y) {
    return walls.some(wall => collides({ x, y, size: player.size }, wall));
}

// **Enemy AI: Move Towards Player**
function moveEnemies() {
    enemies.forEach(enemy => {
        let dx = player.x - enemy.x;
        let dy = player.y - enemy.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            let moveX = (dx / distance) * enemy.speed;
            let moveY = (dy / distance) * enemy.speed;

            let newX = enemy.x + moveX;
            let newY = enemy.y + moveY;

            if (!collidesWithWalls(newX, newY)) {
                enemy.x = newX;
                enemy.y = newY;
            }
        }
    });

    drawGame();
}

function collides(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.size &&
        obj1.x + obj1.size > obj2.x &&
        obj1.y < obj2.y + obj2.size &&
        obj1.y + obj1.size > obj2.y
    );
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    ctx.fillStyle = "yellow";
    coins.forEach(coin => ctx.fillRect(coin.x, coin.y, coin.size, coin.size));

    ctx.fillStyle = "red";
    enemies.forEach(enemy => ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size));

    ctx.fillStyle = "gray";
    walls.forEach(wall => ctx.fillRect(wall.x, wall.y, wall.size, wall.size));
}

function endGame() {
    document.getElementById("game-over").classList.remove("hidden");
    document.removeEventListener("keydown", movePlayer);
}

function restartGame() {
    player = { x: 20, y: 20, size: 10, health: 3 };
    score = 0;
    enemies = [{ x: 150, y: 50, size: 10, speed: 1 }];
    document.getElementById("score").textContent = "Score: 0";
    updateHealthDisplay();
    document.getElementById("game-over").classList.add("hidden");
    document.addEventListener("keydown", movePlayer);
    drawGame();
}

setInterval(moveEnemies, 500);
drawGame();

module.exports = { movePlayer, checkCoinCollision, checkEnemyCollision, collides };
