var socket = io()
var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d");

WIDTH = 960
HEIGHT = 960
canvas.width = WIDTH
canvas.height = WIDTH
var size = 24
var row = HEIGHT / size
var col = WIDTH / size
var showGrid = true;
var color
var mouseX
var mouseY
var cursors = []

var screen = document.getElementById("canvas")
var onscreen = screen.getContext("2d")

screen.width = WIDTH
screen.height = HEIGHT

function drawMap(arr) {
    drawColbox()
    row = arr[0].length
    col = arr[0].length
    size = canvas.width / row
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            ctx.fillStyle = arr[i][j]
            ctx.fillRect(j * size, i * size, size, size)
        }
    }
    gridctx.clearRect(0, 0, WIDTH, HEIGHT)
    drawGrid(gridctx)
}
screen.onmousedown = function(evt) {
    console.log("click")
    if(evt.which == 1) {
        //setHistory(mouseX, mouseY)
        canvas.isDrawing = true;
        getMouseXY(evt)
        sendCursor(mouseX, mouseY)
        sendCoords(Math.floor(mouseX / size), Math.floor(mouseY / size), color)
    }
};
document.onmouseup = function(e) {
    canvas.isDrawing = false;
};
screen.onmousemove = function(evt) {
    getMouseXY(evt)
    sendCursor(mouseX, mouseY)
    if(canvas.isDrawing) {
        //setHistory(mouseX, mouseY)
        sendCoords(Math.floor(mouseX / size), Math.floor(mouseY / size), color)
    }
}
document.onmousemove = function(evt) {
    getMouseXY(evt)
    sendCursor(mouseX, mouseY)
}

function drawDot(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x * size, y * size, size, size)
        // grid.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
        // drawGrid(grid.getContext("2d"))
        // drawGrid(grid.getContext("2d"))
}
socket.on("update", (data) => {
    drawDot(data.x, data.y, data.color)
        //drawMap(data)
})
socket.on("map", (arr) => {
    drawMap(arr)
})
socket.on("cursor", (data) => {
    var found = false
    for(var i = 0; i < cursors.length; i++) {
        if(cursors[i].id == data.id) {
            cursors[i].mouseX = data.mouseX
            cursors[i].mouseY = data.mouseY
            cursors[i].color = data.color
            found = true;
            break;
        }
    }
    if(!found) {
        cursors.push(data)
    }
})
socket.on('left', function(id) {
    console.log("lahkus: " + id)
});
var drawHistory = []
var oldCoords = {}

function sendCoords(x, y, color) {
    drawDot(x, y, color)
    var data = {
        x,
        y,
        color
    }
    if(data.x !== oldCoords.x || data.y !== oldCoords.y || data.color !== oldCoords.color) {
        oldCoords.x = data.x
        oldCoords.y = data.y
        oldCoords.color = data.color
        console.log("emitting")
        socket.emit('data', data)
    }
}

function sendCursor(mouseX, mouseY) {
    socket.emit('cursor', {
        mouseX,
        mouseY,
        color,
        id: socket.id
    })
}

function getMouseXY(evt) {
    var rect = screen.getBoundingClientRect();
    mouseX = evt.clientX - rect.left
    mouseY = evt.clientY - rect.top
    console.log("X: " + mouseX + " Y: " + mouseY)
}
document.addEventListener("keypress", (ev) => {
    console.log(ev)
    if(ev.key == "Enter") {
        !showGrid ? showGrid = true : showGrid = false
    }
    if(ev.key == " ") {
        color = getColor(ctx, mouseX, mouseY) || color
        drawColbox()
        sendCursor(mouseX, mouseY)
    }
    if(ev.key == "z") {
        if(drawHistory.length) {
            sendCoords(drawHistory[0].x, drawHistory[0].y, drawHistory[0].color)
            drawHistory.shift()
        }
    }
})

function clearScreen() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}
screen.onmouseleave = function() {
    mouseX = -99;
    mouseY = -99;
    sendCursor(mouseX, mouseY)
};

function drawCursor(x, y, color, ctx) {
    // if(!x || !y) {
    //     return;
    // }
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0000008f";
    ctx.strokeRect(x - (size / 2) + 2 + 3.5, y - (size / 2) + 2 + 3.5, size - 2, size - 2);
    ctx.strokeStyle = color + "cf";
    ctx.strokeRect(x - (size / 2) + 1.5, y - (size / 2) + 1.5, size - 2, size - 2);
    ctx.stroke();
}

function setHistory(mouseX, mouseY) {
    var data = {
        x: Math.floor(mouseX / size),
        y: Math.floor(mouseY / size),
        color: getColor(ctx, mouseX, mouseY),
    }
    if(drawHistory.length < 1) {
        drawHistory.unshift(data)
    } else if(data.x != drawHistory[0].x && data.y != drawHistory[0].y) {
        drawHistory.unshift(data)
    }
    console.log(mouseX)
    console.log(data.x)
    console.log(drawHistory[0].x)
    console.log(JSON.stringify(drawHistory))
}
var grid = createLayer()
gridctx = grid.getContext("2d")

function drawGrid(ctx) {
    for(let i = 1; i < row; i++) {
        ctx.strokeStyle = "#c1c5cf2b";
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(i * size, 0);
        ctx.lineTo(size * i, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(0, i * size);
        ctx.lineTo(canvas.width, i * size);
        ctx.stroke();
    }
}

function createLayer() {
    var canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    return canvas
}
var cursorLayer = createLayer()
cursorLayerCtx = cursorLayer.getContext("2d")

function render() {
    //onscreen.clearRect(0, 0, WIDTH, HEIGHT) miks?
    if(!color) color == "#000000"
    cursorLayerCtx.clearRect(0, 0, WIDTH, HEIGHT)
    for(let i = 0; i < cursors.length; i++) {
        drawCursor(cursors[i].mouseX, cursors[i].mouseY, cursors[i].color, cursorLayerCtx)
    }
    drawCursor(mouseX, mouseY, color, cursorLayerCtx)
    onscreen.drawImage(canvas, 0, 0)
    if(showGrid) {
        //grid.getContext("2d").clearRect(0, 0, 640, 640)
        onscreen.drawImage(grid, 0, 0)
    }
    onscreen.drawImage(cursorLayer, 0, 0)
    requestAnimationFrame(render)
}
render()

function getColor(ctx, x, y) {
    function rgbToHex(r, g, b) {
        if(r > 255 || g > 255 || b > 255) throw "Invalid color component";
        return((r << 16) | (g << 8) | b).toString(16);
    }
    var p = ctx.getImageData(x, y, 1, 1).data
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    return hex
}