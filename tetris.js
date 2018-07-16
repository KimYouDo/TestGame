var canvas = document.getElementById("myCanvas");
var wx = document.documentElement.clientWidth;
var wy = document.documentElement.clientHeight;

if(wx<wy*1.7){
  wx=canvas.width =wx;
  wy=canvas.height=wx*0.6;
}
else{
  wx=canvas.width =wy*1.7;
  wy=canvas.height=wy;
}
var ctx = canvas.getContext("2d");
var ballRadius = canvas.height*0.02;
var x = canvas.width*0.8;
var y = canvas.height*0.7;
var x2 =  canvas.width*0.2;
var y2 = canvas.height*0.7;
var dx = 3;
var dy = -3;
var dx2 = -3;
var dy2 = -3;
var paddleHeight = canvas.height*0.2;
var paddleWidth = canvas.width*0.1;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = canvas.height*0.03;
var brickHeight = canvas.height*0.03;
var score = 0;
var lives = 3;
var relativeX = 0;
var relativeY = 0;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

if (canvas.requestFullscreen) {
canvas.requestFullscreen();
relativeX=1;
} else if (canvas.webkitRequestFullscreen) {
canvas.webkitRequestFullscreen();
relativeX=wx;
relativeY=wy;
} else if (canvas.mozRequestFullScreen) {
canvas.mozRequestFullScreen();
relativeX=3;
} else if (canvas.msRequestFullscreen) {
canvas.msRequestFullscreen();
relativeX=4;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);


function buttonTest(){
ctx.beginPath();
ctx.drawImage(Rturn, wx*0.04, wy*0.8, wy*0.1, wy*0.2);
ctx.drawImage(Lturn, wx*0.9, wy*0.8, wy*0.1, wy*0.2);
ctx.fill();
ctx.closePath();
}

function drawrelativeX() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("relativeX: "+relativeX+" relativeX: "+relativeY, 8, 50);
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
        leftPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
        rightPressed = false;
    }
}

function mouseDownHandler(e) {
    relativeX = e.clientX - canvas.offsetLeft;
    relativeY = e.clientY;
    if(relativeX > 0 && relativeX < wx*0.1 && relativeY > wy*0.9 && relativeY < wy ) {
      leftPressed = true;
      rightPressed = false;
    }
    else if(relativeX > wx*0.9 && relativeX < wx && relativeY > wy*0.9 && relativeY < wy ) {
      rightPressed = true;
      leftPressed = false;
    }
}


function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    if(dy>0)
                       dy+=1;
                    else
                      dy-=1;

                }
                if(x2 > b.x && x2 < b.x+brickWidth && y2 > b.y && y2 < b.y+brickHeight) {
                    dy2 = -dy2;
                    if(dy2>0)
                       dy2+=1;
                    else
                       dy2-=1;
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#6a22ff";
    ctx.fill();
    ctx.closePath();
}

function drawBall2() {
    ctx.beginPath();
    ctx.arc(x2, y2, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#95dd00";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.drawImage(img1, paddleX, wy-paddleHeight, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
}

function drawPaddleR() {
    ctx.beginPath();
    ctx.drawImage(img2, paddleX, wy-paddleHeight, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
}

function drawPaddleL() {
    ctx.beginPath();
    ctx.drawImage(img3, paddleX, wy-paddleHeight, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (Math.random() * (wx*0.9))+(wx*0.05);
                var brickY = (Math.random() * (wy*0.3))+(wy*0.1);;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.arc(brickX, brickY, ballRadius/2, 0, Math.PI*2);
                ctx.fillStyle = "#F4FA58";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(back, 0, 0, wx, wy);
    drawBall();
    drawBall2();
    drawScore();
    drawLives();
    drawBricks();
    buttonTest();
    drawrelativeX();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        score++;
    }
    else if(y + dy > canvas.height-ballRadius) {
        dy = -3;
        score++;
    }
    else if(y + dy < ballRadius) {
        dy = -dy;
        score++;
    }

    if(x2 + dx2 > canvas.width-ballRadius || x2 + dx2 < ballRadius) {
      dx2 = -dx2;
        score++;
    }
    else if(y2 + dy2 > canvas.height-ballRadius) {
        dy2 = -3;
        score++;
    }
    else if(y2 + dy2 < ballRadius) {
        dy2 = -dy2;
        score++;
    }


    if(y + dy > wy-paddleHeight && x > paddleX && x < paddleX + paddleWidth) {
      //  lives--;
        if(!lives) {
            alert("GAME OVER");
            document.location.reload();
                        }
        else {
          x = canvas.width*0.8;
          y = canvas.height*0.7;
          x2 =  canvas.width*0.2;
          y2 = canvas.height*0.7;
            dx = 3;
            dy = -3;
            dx2 = -3;
            dy2 = -3;
            paddleX = (canvas.width-paddleWidth)/2;
                        }
        }

        if(y2 + dy2 > wy-paddleHeight && x2 > paddleX && x2 < paddleX + paddleWidth) {
        //    lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
                            }
            else {
              x = canvas.width*0.8;
              y = canvas.height*0.7;
              x2 =  canvas.width*0.2;
              y2 = canvas.height*0.7;
                dx = 3;
                dy = -3;
                dx2 = -3;
                dy2 = -3;
                paddleX = (canvas.width-paddleWidth)/2;
                            }
            }

            if(rightPressed && paddleX < canvas.width-paddleWidth) {
                paddleX += 7;
                drawPaddleL();
            }
            else if(leftPressed && paddleX > 0) {
                paddleX -= 7;
                drawPaddleR();
            }
            else{
              drawPaddle();
            }

    x += dx;
    y += dy;
    x2 += dx2;
    y2 += dy2;

    requestAnimationFrame(draw);
}

draw();
