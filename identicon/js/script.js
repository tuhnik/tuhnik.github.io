let c = document.getElementById("c")
c.width = 440
c.height = 440
let offset = 20
let ctx = c.getContext("2d")
ctx.imageSmoothingEnabled= false

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
let input = document.getElementById("input")
input.addEventListener("keyup", function(ev){
    createMap(input.value)
})


function createMap(str) {
    let map = []
    //https://flatuicolors.com/palette/es
    let cols = "#d34410, #40407a,#706fd3,#f7f1e3,#34ace0,#33d9b2,#2c2c54,#9d9dd4,#aaa69d,#227093,#218c74,#ff5252,#ff793f,#d1ccc0,#ffb142,#ffda79".split(",")
    let source = split(binarify(hash(str)),5)
    map[0] = source[0]
    map[1] = source[1]
    map[2] = source[2]
    map[3] = source[1]
    map[4] = source[0]
    col1Hash = parseInt(hash(str).toString().substr(1,2))
    col2Hash = parseInt(hash(str).toString().substr(3,2))
    let col1 = Math.floor(col1Hash.map(0, 99, 0, cols.length -1))
    let col2 = Math.floor(col2Hash.map(0, 99, 0, cols.length -1))
    if(col1 == col2) {
        (col2 < cols.length)? col2++:col2--
    }
    ctx.fillStyle = cols[col1]
    ctx.fillRect(0, 0, c.width, c.height);
    drawIt(map, cols[col1], cols[col2])
}
function drawIt(map, color1, color2){
        map.forEach((row, rowi) => {
            row.forEach((el, eli) => {
                if(el) {
                    ctx.fillStyle = color1;
                    ctx.fillRect(offset  + 80 * rowi, 80 * eli + offset, 80, 80);
                } else {
                    ctx.fillStyle = color2;
                    ctx.fillRect(offset  + 80 * rowi, 80 * eli + offset, 80, 80);
                }
            })
        })
}
function hash(str) {
    var p1 = 2654435761, p2 = 1597334677, h1 = 0xdeadbeef | 0, h2 = 0x41c6ce57 | 0;
    for (var i = 0; i < str.length; i++)
        ch = str.charCodeAt(i), h1 = Math.imul(h1 + ch, p1), h2 = Math.imul(h2 + ch, p2);
    h1 = Math.imul(h1 ^ h1 >>> 16, p2), h2 = Math.imul(h2 ^ h2 >>> 15, p1);
    return (h2 & 2097151) * 4294967296 + h1;
};
function binarify(n){
   let arr = n.toString().split("").splice(-15)
   arr = arr.map(el =>{
       return (el < 5)?0:1
   })
   return arr
}
function split(arr, howMany) {
    var newArr = []; start = 0; end = howMany;
    for(var i=1; i<= Math.ceil(arr.length / howMany); i++) {
        newArr.push(arr.slice(start, end));
        start = start + howMany;
        end = end + howMany
    }
    return newArr
}

createMap("")