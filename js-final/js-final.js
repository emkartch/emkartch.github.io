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

    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickWidth = 80;
    const brickHeight = 30;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;


    var volumeText = document.querySelector('#volumeNum');
    var volumeNum = 0;


    var volumeArray = [1,2,3,4,5,6,7,8,9,10,11,12,12]


    
    const randomItem = arr => arr.splice((Math.random() * arr.length) | 0, 1);







    let bricks = [];

    for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1, text: "" };
    }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

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
                volumeNum += b.text;
                volumeText.textContent = String(volumeNum);

            }
            }
        }
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, gameCanvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
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
            ctx.fillStyle = "#0095DD";
            ctx.fill();

            const brickText = randomItem(volumeArray)
            bricks[c][r].text = brickText

            console.log(brickText)

            ctx.font = "12pt Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(String(brickText), brickX+5, brickY+20);

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
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
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
    }

// GAME CONTROLS

// VOLUME CODE

    // var volumeCanvas = document.getElementById('volumeCanvas');
    // var context = volumeCanvas.getContext('2d');
    // var volume = 0;
    // var r = 255; 
    // var g = 0; 
    // var b = 0;
    // var volX = 200;
    // var volY = 50;

    // function volDraw(volume) {

    //     context.clearRect(0, 0, 80, 300);

    //     //bar
    //     r = 384 - Math.floor(volume / 100 * 384);
    //     g = Math.floor(volume / 100 * 512);
        
    //     if (r < 0) { r = 0; }
    //     if (r > 255) { r = 255; }
    //     if (g < 0) { g = 0; }
    //     if (g > 255) { g = 255; }
        
    //     context.fillStyle = "rgb(0,0,0)";
    //     context.fillRect(volX, volY, 50, 200);
        
    //     context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    //     context.fillRect(volX, volY - volume * 2 + 200, 50, volume * 2);
        
    //     //text
    //     var percent = Math.floor(volume);
    //     var textWidth = context.measureText("0").width;
    //     var digits = Math.floor(Math.log10(percent)) + 1;
    //     if (digits <= 0) {
    //         digits = 1;
    //     }
    //     var offsetx = textWidth * digits;
        
    //     context.fillStyle = "rgb(255,255,255)";
    //     context.fillText(percent, volX + 40 - offsetx, volY + 75);
    //     context.font = "24px Arial";
    //     context.textBaseline = "top";
    //     context.strokeStyle = "rgb(0,0,0)";
    //     context.strokeText(percent, volX + 40 - offsetx, volY + 75);
        
    //     //emoji
    //     if (volume > 66) {
    //         index = 3;
    //     }
    //     else if (volume > 33) {
    //         index = 2;
    //     }
    //     else if (volume > 0) {
    //         index = 1;
    //     }
    //     else {
    //         index = 0;
    //     }
        
    //     context.fillText(speaker[index], volY + 10, volY + 200);

    // }

// VOLUME CODE

// RUN CODE

    function setVolume() {
        let intervalGame = setInterval(draw, 5);
    }
    
    document.getElementById("runButton").addEventListener("click", function () {
        setVolume();
        this.disabled = true;
    });

// RUN CODE


