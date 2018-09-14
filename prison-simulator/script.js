 var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 500;
canvas.height = 500
SIZE = 50
COLS = 10
ROWS = 10
var map = []
var time = document.getElementById("time")
var timec = 1;
time.innerHTML = "<h1>Oled vanglas viibinud <br>" + yourTime(timec) + ".</h1>";
timec++;
setInterval(()=>{
    time.innerHTML = "<h1>Oled vanglas viibinud <br>" + yourTime(timec, true) + ".</h1>"
    timec++
},1000)
function update() {
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    drawMap(map)
}
function initMap() {
    for (var row = 0; row < ROWS; row++) {
        map.push([])
        for (var col = 0; col < COLS; col++) {
            map[row].push(0)
        }
    }
    map[6][6] = 1
}
initMap()
function drawRect(y, x, col) {
    ctx.fillStyle = col
    ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE)
}
function drawMap(arr) {
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (arr[row][col] == 0) {
                drawRect(row, col, "#000")
            }
            if (arr[row][col] == 1) {
                drawRect(row, col, "#FFF")
            }
        }
    }
}
setInterval(update, 1000 / 24)
function moveRight(nr) {
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (map[row][col] == nr && col < COLS -1) {
                map[row][col] = 0
                map[row][col+=1] = nr
            }
        }
    }
}
function moveLeft(nr) {
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (map[row][col] == nr && col > 0) {
                map[row][col] = 0
                map[row][col-=1] = nr
            }
        }
    }
}
function moveUp(nr) {
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (map[row][col] == nr && row > 0) {
                map[row][col] = 0
                map[row-=1][col] = nr
            }
        }
    }
}
function moveDown(nr) {
    for (var row = 0; row < ROWS; row++) {
        for (var col = 0; col < COLS; col++) {
            if (map[row][col] == nr && row < ROWS -1) {
                map[row][col] = 0
                map[row+=1][col] = nr
            }
        }
    }
}
document.addEventListener("keydown", function(ev){
if(ev.key == "ArrowLeft"){
    moveLeft(1)
}
if(ev.key == "ArrowRight"){
    moveRight(1)
}
if(ev.key == "ArrowUp"){
    moveUp(1)
}
if(ev.key == "ArrowDown"){
    moveDown(1)
}
})
function yourTime(sec, check) {
    var min = Math.floor(sec / 60)
    var hour = Math.floor(min / 60)
    var day = Math.floor(hour / 24)
    var week = Math.floor(day / 7)
    var year = Math.floor(day / 365)
    sec = sec - min * 60;
    min = min - hour * 60;
    hour = hour - day * 24;
    day = day - week * 7;
    week = week - year * 52;
    var str = "";
    if (!check) {
        if (year) str += year + " aastat ";
        if (week) str += week + " nädalat ";
        if (day) str += day + " päeva ";
        if (hour) str += hour + " tundi ";
        if (min) str += min + " minutit ";
        if (sec) str += sec + " sekundit";
        return (str)
    } else {
        if (year) return year + " aastat";
        if (week) return week + " nädalat";
        if (day) return day + " päeva";
        if (hour) return hour + " tundi";
        if (min) return min + " minutit";
        if (sec) return sec + " sekundit";
    }}