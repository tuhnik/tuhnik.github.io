var canvas = document.getElementById("canvas")
canvas.height = 640
canvas.width = 640
var ctx = canvas.getContext("2d")
let box = 32
let snake = []
let d = "RIGHT"
var img = new Image();
img.src = 'carrot.png';
// img.onload = function(){
//     ctx.drawImage(img, 0, 0)
// }
let foodcolors = "#2ecc71 #f1c42b #e77e23 #e74c3c #f39c24 #d35316 #c0392b #17a084 #27ae5f".split(" ")
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.width / box)) * box,
    color: foodcolors[Math.floor(Math.random() * foodcolors.length)]
}
let score = 0;
let highscore = localStorage.getItem("highscore") || 0
let interval = 100;
snake[0] = { x: 4 * box, y: 4 * box }
snake[1] = { x: 3 * box, y: 4 * box }

function draw() {
    clearScreen()
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "white" : "#3598dc"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.lineWidth = 5;
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    drawFood()
        //vana pea
    let snakeX = snake[0].x
    let snakeY = snake[0].y
    if(dirCache.length) {
        d = dirCache[0]
        dirCache.shift()
    }
    if(d == "LEFT") snakeX -= box
    if(d == "UP") snakeY -= box
    if(d == "RIGHT") snakeX += box
    if(d == "DOWN") snakeY += box
        //powerup
    if(snakeX == food.x && snakeY == food.y) {
        //console.log("nom")
        goFaster(1)
        score++
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.width / box)) * box,
            color: foodcolors[Math.floor(Math.random() * foodcolors.length)]
        }
    } else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    showScore(score)
    showHighScore()
    snake.unshift(newHead)
    if(snakeX + box < box || snakeX + box > canvas.width / box * box || snakeY + box < box || snakeY + box > canvas.width / box * box || checkCollision(snake)) {
        dirCache = []
        showGameOver()
        clearInterval(game)
    }
    dirChangeLimit = false
}
let game = setInterval(draw, interval)
var dirChangeLimit = false
var dirCache = []
document.onkeydown = function(evt) {
    if(evt.key != "ArrowLeft" && evt.key != "ArrowRight" && evt.key != "ArrowUp" && evt.key != "ArrowDown") {
        return;
    }
    if(!dirChangeLimit) {
        if(evt.key == "ArrowLeft" && d != "RIGHT") d = "LEFT"
        if(evt.key == "ArrowUp" && d != "DOWN") d = "UP"
        if(evt.key == "ArrowRight" && d != "LEFT") d = "RIGHT"
        if(evt.key == "ArrowDown" && d != "UP") d = "DOWN"
        dirChangeLimit = true
    } else {
        var nextd;
        if(evt.key == "ArrowLeft" && d != "LEFT") nextd = "LEFT"
        if(evt.key == "ArrowUp" && d != "UP") nextd = "UP"
        if(evt.key == "ArrowRight" && d != "RIGHT") nextd = "RIGHT"
        if(evt.key == "ArrowDown" && d != "DOWN") nextd = "DOWN"
        if(nextd && dirCache[dirCache.length - 1] !== nextd) {
            dirCache.push(nextd)
        }
    }
}

function showScore(score) {
    ctx.font = '66px  BigBlue_TerminalPlus';
    ctx.fillStyle = 'rgba(142, 142, 142, 0.5)'
    ctx.textBaseline = 'top';
    var txt = 'SCORE: ' + score
    ctx.fillText(txt, (canvas.width - ctx.measureText(txt).width) / 2, 10);
    if(score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", score)
    }
}

function showHighScore(score) {
    ctx.font = '20px  BigBlue_TerminalPlus';
    ctx.fillStyle = '#e91e6354'
    ctx.textBaseline = 'top';
    var txt = 'HIGHSCORE: ' + highscore
    ctx.fillText(txt, (canvas.width - ctx.measureText(txt).width) / 2, 76);
}

function showGameOver() {
    ctx.font = '66px BigBlue_TerminalPlus';
    ctx.fillStyle = 'rgba(142, 142, 142, 0.5)'
    ctx.textBaseline = 'bottom';
    var txt = 'GAME OVER'
    ctx.fillText(txt, (canvas.width - ctx.measureText(txt).width) / 2, canvas.height - 5);
}

function goFaster(step) {
    clearInterval(game)
    interval -= step;
    game = setInterval(draw, interval)
}

function clearScreen() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function drawFood() {
    ctx.shadowBlur = 10;
    ctx.shadowColor = food.color;
    ctx.fillStyle = food.color;
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = 5;
    
    ctx.fillRect(food.x + 2.5, food.y + 2.5, box -5, box -5)
    //ctx.strokeRect(food.x, food.y, box, box);
    ctx.shadowBlur = 0;
    
    // ctx.imageSmoothingEnabled = false
    // ctx.drawImage(img, 0, 0, 32, 32, food.x, food.y, box, box)
}

function checkCollision(arr) {
    for(let i = 4; i < arr.length; i++) {
        if(arr[0].x == arr[i].x && arr[0].y == arr[i].y) {
            console.log("collided!")
            return true
        }
    }
    return false
}

