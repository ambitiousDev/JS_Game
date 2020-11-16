var canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

const SPEED = 2;

var snake = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    turnUp: false,
    turnDown: false,
    turnLeft: false,
    turnRight: false,
    dx: SPEED,
    dy: 0,
    head: 'right',
    drawSnake() {
        if (this.turnUp) {
            this.dx = 0;
            this.dy = -SPEED;
        } else if (this.turnDown) {
            this.dx = 0;
            this.dy = SPEED;
        } else if (this.turnLeft) {
            this.dx = -SPEED;
            this.dy = 0;
        } else if (this.turnRight) {
            this.dx = SPEED;
            this.dy = 0;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0) {
            this.x = canvas.width;
        } else if (this.x > canvas.width) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = canvas.height
        } else if (this.y > canvas.height) {
            this.y = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(this.x, this.y, 15, 15);
        ctx.fill();
        ctx.closePath();
    }

}

function appromaxitely(a, b) {
    return Math.abs(a - b) < 10;
}

var bait = {
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    drawBait() {
        if (appromaxitely(snake.x, this.x) && appromaxitely(snake.y, this.y)) {
            this.x = Math.floor(Math.random() * canvas.width);
            this.y = Math.floor(Math.random() * canvas.height);
        }
        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 10);
        ctx.fill();
        ctx.closePath();
    }
}

function draw() {
    snake.drawSnake();
    bait.drawBait();
    requestAnimationFrame(draw);
}

$(document).on('keydown', e => {
    if (e.key == 'ArrowUp') {
        snake.turnUp = true;
        snake.head = 'up';
    } else if (e.key == 'ArrowDown') {
        snake.turnDown = true;
        snake.head = 'down';
    } else if (e.key == 'ArrowLeft') {
        snake.turnLeft = true;
        snake.head = 'left';
    } else if (e.key == 'ArrowRight') {
        snake.turnRight = true;
        snake.head = 'right';
    };
    // console.log(snake.head);
});
$(document).on('keyup', e => {
    if (e.key == 'ArrowUp') {
        snake.turnUp = false;
    } else if (e.key == 'ArrowDown') {
        snake.turnDown = false;
    } else if (e.key == 'ArrowLeft') {
        snake.turnLeft = false;
    } else if (e.key == 'ArrowRight') {
        snake.turnRight = false;
    };
});

draw();