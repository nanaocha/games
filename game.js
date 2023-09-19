const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    speed: 5,
};

const bullets = [];
const enemies = [];

function drawPlayer() {
    // Draw robot-like shape

    // Head
    ctx.fillStyle = "gray";
    ctx.fillRect(player.x - player.width, player.y - player.height * 1.2, player.width * 2, player.height * 0.8);

    // Eyes
    ctx.fillStyle = "white";
    ctx.fillRect(player.x - player.width * 0.7, player.y - player.height * 1.3, player.width * 0.3, player.height * 0.3);
    ctx.fillRect(player.x + player.width * 0.4, player.y - player.height * 1.3, player.width * 0.3, player.height * 0.3);

    // Antennas
    ctx.fillStyle = "black";
    ctx.fillRect(player.x - 2, player.y - player.height * 1.4, 4, player.height * 0.2);
    ctx.fillRect(player.x - 6, player.y - player.height * 1.6, 12, player.height * 0.15);

    // Arms (raising when shooting)
    ctx.fillStyle = "gray";

    // Left Arm
    if (spacePressed) {
        ctx.fillRect(player.x - player.width * 1.5, player.y - player.height * 1.4, player.width * 0.3, player.height * 0.6); // Raised position
        bullets.push({ x: player.x - player.width * 1.5 + player.width * 0.15, y: player.y - player.height * 1.4, speedY: -10 });
    } else {
        ctx.fillRect(player.x - player.width * 1.2, player.y - player.height * 0.6, player.width * 0.2, player.height * 1.2); // Default position
    }

    // Right Arm
    if (spacePressed) {
        ctx.fillRect(player.x + player.width * 1.2, player.y - player.height * 1.4, player.width * 0.3, player.height * 0.6); // Raised position
        bullets.push({ x: player.x + player.width * 1.2 + player.width * 0.15, y: player.y - player.height * 1.4, speedY: -10 });
    } else {
        ctx.fillRect(player.x + player.width * 0.8, player.y - player.height * 0.6, player.width * 0.2, player.height * 1.2); // Default position
    }

    // Legs
    ctx.fillStyle = "gray";
    ctx.fillRect(player.x - player.width * 0.5, player.y + player.height * 0.1, player.width * 0.4, player.height * 0.8);
    ctx.fillRect(player.x + player.width * 0.1, player.y + player.height * 0.1, player.width * 0.4, player.height * 0.8);
}

function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.moveTo(bullet.x, bullet.y);
        ctx.lineTo(bullet.x, bullet.y - 40); // Adjusted bullet length
        ctx.lineTo(bullet.x + 3, bullet.y - 10); // Adjusted bullet tip
        ctx.lineTo(bullet.x + 2, bullet.y - 25); // Adjusted bullet length
        ctx.closePath();
        ctx.fill();
    });
}



function drawEnemies() {
    ctx.fillStyle = "green";
    enemies.forEach(enemy => {
        ctx.font = "30px Arial";
        ctx.fillText("👾", enemy.x - enemy.width / 2, enemy.y + enemy.height / 2);
    });
}

function spawnEnemy() {
    const enemySize = 60;
    const enemyX = Math.random() * (canvas.width - enemySize) + enemySize / 2;
    enemies.push({ x: enemyX, y: 0, width: enemySize, height: enemySize });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawEnemies();

    if (leftPressed && player.x > player.width / 2) {
        player.x -= player.speed;
    }
    if (rightPressed && player.x < canvas.width - player.width / 2) {
        player.x += player.speed;
    }

    bullets.forEach(bullet => {
        bullet.y += bullet.speedY; // Adjust bullet speed
    });

    enemies.forEach(enemy => {
        enemy.y += 1; // Slower enemy movement
    });

    if (enemies.length < 3 && Math.random() < 0.02) {
        spawnEnemy();
    }

    bullets.forEach(bullet => {
        enemies.forEach(enemy => {
            if (
                bullet.x >= enemy.x - enemy.width / 2 &&
                bullet.x <= enemy.x + enemy.width / 2 &&
                bullet.y >= enemy.y - enemy.height / 2 &&
                bullet.y <= enemy.y + enemy.height / 2
            ) {
                bullets.splice(bullets.indexOf(bullet), 1);
                enemies.splice(enemies.indexOf(enemy), 1);
            }
        });
    });

    requestAnimationFrame(update);
}

let leftPressed = false;
let rightPressed = false;
let spacePressed = false;



document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        leftPressed = true;
    }
    if (event.key === "ArrowRight") {
        rightPressed = true;
    }
    if (event.key === " ") {
        spacePressed = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
        leftPressed = false;
    }
    if (event.key === "ArrowRight") {
        rightPressed = false;
    }
    if (event.key === " ") {
        spacePressed = false;
    }
});


update();
