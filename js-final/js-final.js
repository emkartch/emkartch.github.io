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

    let bricks = [];

    for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    }

    function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    }

    function mouseMoveHandler(e) {
        const relativeX = e.clientX - gameCanvas.offsetLeft;
        if (relativeX > 0 && relativeX < gameCanvas.width) {
          paddleX = relativeX - paddleWidth / 2;
        }
      }

    function collisionDetection() {
        for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
            if (
                x > b.x &&
                x < b.x + brickWidth &&
                y > b.y &&
                y < b.y + brickHeight
            ) {
                dy = -dy;
                b.status = 0;
                volumeNum += 4;
                volumeText.textContent = String(volumeNum);
                if (volumeNum === 100) {
                    alert("Volume Set: 100")
                    document.location.reload();
                }

            }
            }
        }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#646F4B";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, gameCanvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#646F4B";
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
            ctx.fillStyle = "#646F4B";
            ctx.fill();

            ctx.font = "12pt Arial";
            ctx.fillStyle = "#DFE9DF";
            ctx.fillText("4", brickX+6, brickY+20);

            ctx.closePath();
            }
        }
        }
    }
    
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
            if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            } else {
            alert("Volume Set: " + String(volumeNum));
            document.location.reload();
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


