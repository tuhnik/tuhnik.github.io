let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
canvas.width = 500;
canvas.height = 500
SIZE = 50
COLS = 10
ROWS = 10
let map = []
let time = document.getElementById("time")
time.innerHTML = "<h1>Oled vanglas viibinud <br> 1 sekund.</h1>";
time.style.width = "50%";
(function() {
let timec = 1
timec++;
setInterval(()=>{
  time.innerHTML = "<h1>Oled vanglas viibinud <br>" + secondsToWords(timec) + ".</h1>"
  timec++
},1000)
}())
function update() {
  ctx.fillStyle = "#000"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  drawMap(map)
}
function initMap() {
  for (let row = 0; row < ROWS; row++) {
    map.push([])
    for (let col = 0; col < COLS; col++) {
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
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
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
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (map[row][col] == nr && col < COLS -1) {
        map[row][col] = 0
        map[row][col+=1] = nr
      }
    }
  }
}
function moveLeft(nr) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (map[row][col] == nr && col > 0) {
        map[row][col] = 0
        map[row][col-=1] = nr
      }
    }
  }
}
function moveUp(nr) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (map[row][col] == nr && row > 0) {
        map[row][col] = 0
        map[row-=1][col] = nr
      }
    }
  }
}
function moveDown(nr) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
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
//showing off my codewars solution
function secondsToWords(sec) {
  let time = {}
  time.sekund = sec % 60
  time.minut = Math.floor(sec / 60) % 60
  time.tund = Math.floor(sec / 3600) % 24
  time["päev"] = Math.floor(sec / 86400) % 365
  time.aasta = Math.floor(sec / 31536000)
  let res = []
  let str = ""
  for(key in time){
    let unit = key
    let val = time[key]
    if (val) {
      if (val > 1 && key == "sekund") key = "sekundit"
      if (val > 1 && key == "minut") key = "minutit"
      if (val > 1 && key == "tund") key = "tundi"
      if (val > 1 && key == "päev") key = "päeva"
      if (val > 1 && key == "aasta") key = "aastat"
      res.unshift(val + " " + key)}
  }
  return res.map((el, i) => {
    if (res.length == 1) return el
    if (res.length > 1) {
      if (i == res.length - 2) {
        return el + " ja "
      } else if (res.length - 1 != i) {
        return el + ", "
      } else {
        return el
      }
    }
  }).join("")
}