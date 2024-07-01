const gameArea = document.getElementById('gameArea');
const plane = document.getElementById('plane');
const startButton = document.getElementById('startGame');
const scoreDisplay = document.getElementById('score');
let score = 0;
let planeSpeed = 10;
let bulletSpeed = 5;
let enemySpeed = 2;
let level = 1;
let bulletLevel = 1;
let gameInterval;

document.addEventListener('keydown', handleKeyDown);
startButton.addEventListener('click', startGame);
gameArea.addEventListener('touchstart', handleTouchStart);
gameArea.addEventListener('touchmove', handleTouchMove);
gameArea.addEventListener('touchend', handleTouchEnd);

let touchStartX = null;

function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowLeft':
            movePlane(-planeSpeed);
            break;
        case 'ArrowRight':
            movePlane(planeSpeed);
            break;
        case ' ':
            shoot();
            break;
    }
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
    if (!touchStartX) return;

    let touchMoveX = event.touches[0].clientX;
    let diff = touchMoveX - touchStartX;
    if (diff > 0) {
        movePlane(planeSpeed);
    } else {
        movePlane(-planeSpeed);
    }
    touchStartX = touchMoveX;
}

function handleTouchEnd(event) {
    shoot();
    touchStartX = null;
}

function movePlane(distance) {
    const currentLeft = parseInt(plane.style.left) || 0;
    const newLeft = Math.min(Math.max(currentLeft + distance, 0), gameArea.clientWidth - plane.clientWidth);
    plane.style.left = newLeft + 'px';
}

function shoot() {
    for (let i = 0; i < bulletLevel; i++) {
        const bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.style.left = (plane.offsetLeft + plane.clientWidth / 2 - 2.5) + 'px';
        bullet.style.bottom = plane.clientHeight + 'px';
        gameArea.appendChild(bullet);
        moveBullet(bullet);
    }
}

function moveBullet(bullet) {
    const bulletInterval = setInterval(() => {
        bullet.style.bottom = (parseInt(bullet.style.bottom) + bulletSpeed) + 'px';
        if (parseInt(bullet.style.bottom) > gameArea.clientHeight) {
            clearInterval(bulletInterval);
            gameArea.removeChild(bullet);
        } else {
            checkCollision(bullet, bulletInterval);
        }
    }, 10);
}

function createEnemy() {
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = Math.random() * (gameArea.clientWidth - 40) + 'px';
    gameArea.appendChild(enemy);
    moveEnemy(enemy);
}

function moveEnemy(enemy) {
    const enemyInterval = setInterval(() => {
        enemy.style.top = (parseInt(enemy.style.top) + enemySpeed) + 'px';
        if (parseInt(enemy.style.top) > gameArea.clientHeight) {
            clearInterval(enemyInterval);
            gameArea.removeChild(enemy);
            endGame();
        }
    }, 20);
}

function checkCollision(bullet, bulletInterval) {
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => {
        const bulletRect = bullet.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();
        if (
            bulletRect.left < enemyRect.right &&
            bulletRect.right > enemyRect.left &&
            bulletRect.top < enemyRect.bottom &&
            bulletRect.bottom > enemyRect.top
        ) {
            gameArea.removeChild(bullet);
            gameArea.removeChild(enemy);
            clearInterval(bulletInterval);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            if (score % 10 === 0) {
                levelUp();
            }
        }
    });
}

function levelUp() {
    level++;
    enemySpeed++;
    if (level % 3 === 0) {
        bulletLevel++;
    }
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameInterval = setInterval(createEnemy, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    alert('Game Over!');
    resetGame();
}

function resetGame() {
    const enemies = document.querySelectorAll('.enemy');
    const bullets = document.querySelectorAll('.bullet');
    enemies.forEach((enemy) => gameArea.removeChild(enemy));
    bullets.forEach((bullet) => gameArea.removeChild(bullet));
    level = 1;
    bulletLevel = 1;
    enemySpeed = 2;
}
