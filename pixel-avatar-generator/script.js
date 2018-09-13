var c = document.getElementById("canvas");
var data = {
    head: 3,
    eyes: 6,
    hair: 6,
    nose: 4,
    misc: 4,
    mouth: 4
}
Object.keys(data).forEach((el) => {     
            document.getElementById(el).addEventListener("click", () => pickNext(el))
    })
var ctx = c.getContext("2d");
c.height = 200;
c.width = 200;
ctx.imageSmoothingEnabled = false;
var images = {}

for(var key in data) {
    for(var i = 1; i < data[key] + 1; i++) {
        (function(){
            var img = new Image();
            img.src = "img/" + key + i  + ".png";
            img.joonista = function() {
                ctx.drawImage(img, 0, 0, 200, 200);
            }
            images[key] = images[key] || {}
            images[key].list = images[key].list || []
            images[key].current = Math.floor(Math.random() * (images[key].list.length + 1));
            images[key].list.push(img)
        }())    
    }
}
function createFace() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(var key in images) {
        var index = images[key].current
        images[key].list[index].joonista()
    }
}
function pickNext(el) {
    var index = images[el].current
    index = (index == images[el].list.length - 1) ? 0 : index + 1;
    images[el].current = index
    createFace();
}
setTimeout(createFace, 200)