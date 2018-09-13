var clock = document.getElementById("clock")
var hint = localStorage.getItem("hint") || 0;
function tick() {
    var arr = []
    var d = new Date().toTimeString().split(" ")[0].replace(/:/g, "").split("")
    if (hint == 0) {
        showHint([""])
        blockNumbers(hint)
    }
    if (hint == 1) {
        showHint()
        blockNumbers(hint)
    }
    if (hint == 2 || hint == 3) {
        showHint(d)
        blockNumbers(hint)
    }
    d.forEach(function (el, ind) {
        var num = dec2bin(el, 4).split("")
        arr.push(num)
    })
    updateClock(arr)
}
function dec2bin(nr, bits) {
    var bin = new Number(nr).toString(2)
    while (bin.length < bits) {
        bin = "0" + bin;
    }
    return bin;
}
function updateClock(num) {
    num.forEach(function (el, ind) {
        el.forEach(function (el2, ind2) {
            var el = document.getElementsByClassName("col")[ind].getElementsByClassName("item")[ind2]
            if (el2 == 1) {
                el.className = "item lit";
            } else {
                el.className = "item dim";
            }
        })
    })
}
var bin = 8
for (i = 0; i < 6; i++) {
    var col = document.createElement("div");
    col.className = "col"
    clock.appendChild(col)
    for (j = 0; j < 4; j++) {
        var div = document.createElement("div");
        div.className = "item"
        div.innerHTML = "<p>" + bin + "</p>"
        bin = bin - bin / 2
        if (bin < 1) {
            bin = 8
        }
        col.appendChild(div)
    }
}
function showHint(arr) {
    document.getElementById("help").innerHTML = ""
    var arr = arr || ["H", "H", "M", "M", "S", "S"]
    for (i = 0; i < arr.length; i++) {
        var div = document.createElement("div");
        div.className = "item"
        div.innerHTML = arr[i]
        document.getElementById("help").appendChild(div)
    }
}
tick()
setInterval(tick, 1000)
document.addEventListener("click", function () {
    hint++
    if (hint > 3) {
        hint = 0
    }
    localStorage.setItem("hint", hint)
    tick()
})
function blockNumbers(nr){
if(nr == 3){
    document.querySelectorAll(".item p").forEach(function (el) {
        el.style.display = "block"
    })
}
else {
    document.querySelectorAll(".item p").forEach(function (el) {
        el.style.display = "none"
    })
}
}