var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var c = canvas.getContext('2d')
document.body.style.background = "linear-gradient(to bottom, #076585, #fff)";
var palett = {
    $color1: rgba(246, 81, 29, 1),
    $color2: rgba(255, 180, 0, 1),
    $color3: rgba(0, 166, 237, 1),
    $color4: rgba(127, 184, 0, 1),
    $color5: rgba(13, 44, 84, 1)
}
function rgba(a, b, c, d) {
    return "rgba(" + a + ", " + b + ", " + c + ", " + d + ")"
}
function randomcol(obj) {
    var keys = Object.keys(obj)
    while (randomcol.last === result || !result) {
        var result = obj[keys[keys.length * Math.random() << 0]]
    }
    randomcol.last = result
    return result
};
function Word(x, y, dy, text, size) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.color = randomcol(palett);
    this.font = "Bradley Hand ITC";
    this.text = text;
    this.generate = function () {
        c.font = size + "px " + this.font;
        c.fillStyle = this.color
        var metrics = c.measureText(this.text);
        c.shadowColor = "grey";
        cshadowOffsetX = 5;
        c.shadowOffsetY = 5;
        c.shadowBlur = 7;
        c.fillText(this.text, this.x - metrics.width / 2, this.y);
    }
    this.update = function () {
        if (this.y > canvas.height) {
            this.dy = -this.dy
            this.color = randomcol(palett);
            this.font = getRandomFont();
        } else {
            this.dy += 1
        }
        this.y += this.dy
        this.generate()
    }
}
var word = new Word(canvas.width / 2, canvas.height / 2, 1.2, "JAVASCRIPT", 200)
var many = []
for (i = 0; i < 25; i++) {
    var one = new Word(canvas.width * Math.random(), (canvas.height / 3) * Math.random(), Math.random() * 2, "Javascript!", Math.floor(Math.random() * 40 + 30))
    many.push(one)
}
var megaword = new Word(canvas.width / 2, -canvas.height, 1.2, "JAVASCRIPT", 300)
var small = new Word(canvas.width - 150, canvas.height / 1.1, 2, "Made with JavaScript <3", 20)
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate)
    word.update()
    many.forEach(function (el) {
        el.update()
    })
    megaword.update()
    small.update()
}
animate()
function getRandomFont() {
    var arr = "Trebuchet MS, Lucida Console, Monospace, Comic Sans MS, Impact, Papyrus, Bradley Hand ITC, cursive, Bookman Old Style, Century Gothic, Monotype Corsiva, Tahoma".split(", ")
    var result = arr[Math.floor(Math.random() * arr.length)]
    return result;
}