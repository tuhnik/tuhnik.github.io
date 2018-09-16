const c = document.getElementById("c");
const ctx = c.getContext("2d");
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
c.height = 440;
c.width = 440;
let invaders = []
function preloadImages(urls,  callback) {
  var loadedCounter = 0;
  var toBeLoadedNumber = urls.length;
  urls.forEach(function (url) {
    preloadImage(url, function () {
      loadedCounter++;
      if (loadedCounter == toBeLoadedNumber) {
         callback();
      }
    });
  });
  function preloadImage(url, anImageLoadedCallback) {
    var img = new Image();
    img.src = "img/" + url;
    img.onload = anImageLoadedCallback;
    invaders.push(img)
  }
}
preloadImages("1.png, 2.png, 3.png, 4.png, 5.png, 6.png, 7.png, 8.png, ship.png".split(", "), function () {
  createAndDraw("")
});
const offset = c.height / 50;
const sWH = (c.height / 5) - (offset / 2.5);
const row = c.width / sWH;
const col = c.height / sWH;
const input = document.getElementById("getName");
const map = [];
function clearCanvas() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, c.width, c.height);
}
function drawMap(map, shipPos) {
  clearCanvas();
  ctx.fillStyle = "#000";
  map.forEach((row, i) => {
    let cctr = 0
    row.forEach((col, j) => {
      cctr+=1
      if (map[i][j] < 8) {
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(invaders[map[i][j]], j * sWH + offset + cctr, i * sWH + offset, sWH - 5, sWH)
      }
    });
  });
  ctx.drawImage(invaders[8], sWH * shipPos + offset, sWH * 4, sWH, sWH)
}
input.addEventListener("keyup", function () {
  createAndDraw(input.value)
});
function convertHash(hash) {
  return md5(hash).split("").map(el => (parseInt(el, 16)))
}
function createAndDraw(string) {
  const arr1 = convertHash(string).splice(0, 5)
  const arr2 = convertHash(string).splice(5, 5)
  const arr3 = convertHash(string).splice(10, 5)
  const arr4 = convertHash(string).splice(15, 5)
  const arr5 = convertHash(string).splice(20, 5)
  let total = 0;
  for (var i in arr5) {
    total += arr5[i];
  }
  drawMap([arr1, arr2, arr3, arr4], Math.abs(Math.floor(total.map(15, 75, 0, 6))))
}