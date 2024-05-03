// GAME CONTROLS

var gameCanvas = document.getElementById('gameCanvas');
var ctx = gameCanvas.getContext('2d');

let x = gameCanvas.width / 2;
let y = gameCanvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (gameCanvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const brickRowCount = 4;
const brickColumnCount = 5;
const brickWidth = 80;
const brickHeight = 30;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;


var volumeText = document.querySelector('#volumeNum');
var volumeNum = 0;


var volumeArray = [1,1,1,1,2,2,2,2,3,3,4,5,6,7,8,9,10,10,11,12];

const removeRandom = (array) => {
    const random = Math.floor(Math.random() * array.length);
    const el = array.splice(random, 1)[0];
    return el;
};


function reload() {
    document.location.reload();
}

let bricks = [];
let colors = ["#e81416","#ffa500","#79c314","#487de7"];

for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1, text: removeRandom(volumeArray), background: colors[r]};
    };
};

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
};

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
};

function mouseMoveHandler(e) {
    const relativeX = e.clientX - gameCanvas.offsetLeft;
    if (relativeX > 0 && relativeX < gameCanvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
};

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (
                    x + 10 > b.x &&
                    x - 10 < b.x + brickWidth &&
                    y + 10 > b.y &&
                    y - 10 < b.y + brickHeight
                ) {
                    dy = -dy;
                    b.status = 0;
                    volumeNum += b.text;
                    volumeText.textContent = String(volumeNum);
                    if (volumeNum === 100) {
                        gameOver = true;
                        handleGameLost();
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#808080";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, gameCanvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#808080";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].background;
                ctx.fill();

                ctx.font = "12pt monospace";
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                const centerX = brickX + brickWidth / 2;
                const centerY = brickY + brickHeight / 2;

                ctx.fillText(String(bricks[c][r].text), centerX, centerY);

                ctx.closePath();
            }
        }
    }
};

function draw() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > gameCanvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > gameCanvas.height - ballRadius) {
        if (x + 10 > paddleX && x - 10 < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            if (!gameOver) {
                gameOver = true;
                handleGameLost();
            }
        }
    }

    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > gameCanvas.width) {
            paddleX = gameCanvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

let gameOver = false;

function handleGameLost() {
    alert("Volume Set: " + String(volumeNum));
    window.location.reload();
}

// GAME CONTROLS

// RUN CODE

function setVolume() {
    draw();
}

document.getElementById("runButton").addEventListener("click", function () {
    setVolume();
    this.disabled = true;
});

// RUN CODE