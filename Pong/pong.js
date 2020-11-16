var canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

function drawLine() {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke()
    ctx.closePath();
}


function drawPaddle() {
    if (this.paddleY < 0) {
        this.paddleY = 0;
    } else if (this.paddleY + this.paddleHeight > canvas.height) {
        this.paddleY = canvas.height - this.paddleHeight;
    }


    if (this.downPressed) {
        this.paddleY += 5;
    }
    if (this.upPressed) {
        this.paddleY -= 5;
    }
    ctx.beginPath();
    ctx.rect(this.x, this.paddleY, 10, this.paddleHeight);
    ctx.fill();
    ctx.closePath();
}

class Score {
    constructor(x, y, side) {
        this.value = 0;
        this.x = x;
        this.y = y;
    }
    drawScore() {
        ctx.beginPath();
        ctx.font = '60px Arial';
        ctx.fillText(this.value, this.x, this.y);
    }
}
class Paddle {
    constructor(x, score, side) {
        this.x = x;
        this.paddleHeight = 80;
        this.paddleY = (canvas.height - this.paddleHeight) / 2
        this.upPressed = false;
        this.downPressed = false;
        this.score = score;
        this.side = side;
    }

    isCollision() {
        if (ball.y > this.paddleY - ball.radius && ball.y < this.paddleY + this.paddleHeight + ball.radius && ball.side == this.side) {
            return true;
        }
        return false;
    }
}

var scoreLeft = new Score(canvas.width / 2 - 50, 60);
var scoreRight = new Score(canvas.width / 2 + 20, 60);
var paddleLeft = new Paddle(0, scoreLeft, 'left');
var paddleRight = new Paddle(canvas.width - 10, scoreRight, 'right');

var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: -10,
    dy: -5,
    side: 'right',
    setSide() {
        if (this.x < canvas.width / 2) {
            this.side = 'left';
            console.log(this.side);
        } else if (this.x > canvas.width / 2) {
            this.side = 'right';
            console.log(this.side);
        }
    },
    drawBall() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < 0 + this.radius) {
            this.dy = -this.dy;
        }
        if (this.x + this.dx < 0 + this.radius || this.x + this.dx > canvas.width - this.radius) {
            this.setSide();
            var onLeft = paddleLeft.isCollision();
            var onRight = paddleRight.isCollision();
            // debugger;
            if (onLeft || onRight) {
                this.dx = -this.dx;
            } else {
                if (this.side == 'left') {
                    paddleRight.score.value += 1;
                    this.x = canvas.width - 40;
                    this.y = canvas.height / 2;
                    this.side = 'right';
                } else if (this.side == 'right') {
                    paddleLeft.score.value += 1;
                    this.x = 40;
                    this.y = canvas.height / 2;
                    this.side = 'left';
                }
                if (checkWinner.call(paddleLeft) || checkWinner.call(paddleRight)) {
                    document.location.reload();
                }
            }
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

function checkWinner() {
    if (this.score.value == 10) {
        alert(this.side + ' wins');
        return true;
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine();
    drawPaddle.call(paddleLeft);
    drawPaddle.call(paddleRight);
    paddleLeft.score.drawScore();
    paddleRight.score.drawScore();
    ball.drawBall();
    requestAnimationFrame(draw);
}


$(document).on('keydown', e => {
    if (e.key == 'ArrowDown') {
        paddleRight.downPressed = true;
    } else if (e.key == 'ArrowUp') {
        paddleRight.upPressed = true;
    } else if (e.key == 's') {
        paddleLeft.downPressed = true;
    } else if (e.key == 'w') {
        paddleLeft.upPressed = true;
    }
});
$(document).on('keyup', e => {
    if (e.key == 'ArrowDown') {
        paddleRight.downPressed = false;
    } else if (e.key == 'ArrowUp') {
        paddleRight.upPressed = false;
    } else if (e.key == 's') {
        paddleLeft.downPressed = false;
    } else if (e.key == 'w') {
        paddleLeft.upPressed = false;
    }
});


draw();