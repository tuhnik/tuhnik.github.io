var wrapper = document.getElementById("wrapper")
var canvas = document.getElementById("canvas");
var pokename = document.getElementById("pokename")
var desc = document.getElementById("desc")
var image = document.getElementById("image")
var camera = document.getElementById("camera")
var screenshot = document.getElementById("screenshot")
var height = window.innerHeight;
var width = window.innerWidth;

function Pokegen(id, gradient) {
    //Construct pokemon object
    var self = this
    self.id = id || Math.floor(Math.random() * 648) + 1
    self.name = pokedex[self.id - 1].name
    self.description = pokedex[self.id - 1].description
    self.imgurl = "svg/" + self.id + ".svg"
    self.gradient = gradient || grads[Math.floor(Math.random() * grads.length)]
}
Pokegen.prototype.canvas = function() {
    screenshot.style.display = "flex"
    document.body.style.background = "white"
    canvas.style.display = "block";
    wrapper.style.display = "none";
    canvas.width = screen.width
    canvas.height = screen.height
    var ctx = canvas.getContext("2d");
    // Get random gradient
    var grad = this.gradient
    
    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, canvas.width / 2, 0);
    grd.addColorStop(0, grad.col1);
    grd.addColorStop(1, grad.col2);
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Create new image
    var img = new Image();
    img.src = this.imgurl;
    // Draw image to canvas
    img.onload = function() {
        var ratio = img.width / img.height
        var newheight = canvas.height * 0.60
        var newwidth = ratio * newheight
        if(newwidth > canvas.width * 0.9) {
            newwidth = canvas.width * 0.9
            newheight = newwidth / ratio
        }
        var x = canvas.width / 2 - newwidth / 2
        var y = canvas.height / 2 - newheight / 2
        ctx.drawImage(img, x, y, newwidth, newheight);
    }
}
Pokegen.prototype.website = function() {
    var self = this
    camera.style.display = "block"
    document.body.style.background = "linear-gradient(90deg, " + self.gradient.col1 + " 0%, " + self.gradient.col2 + " 100%"
    pokename.style.color = self.gradient.col2
    var img = new Image();
    img.src = this.imgurl;
    image.innerHTML = "";
    image.appendChild(img)
    img.height = height / 1.5
    img.onload = function() {
            if(this.width > width * 0.8) {
                this.width = width * 0.8
            }
        }
    pokename.innerHTML = "<center>  <h3>Wild</h3><h1>" + self.name + "</h1><h3>appeared! </h3></center> "
    desc.innerHTML = "<center>" + self.description + "</center>"
}
var bulba = new Pokegen()
bulba.website()
document.addEventListener("keyup", function(ev) {
    if(ev.key === "a") {
        var gradient = bulba.gradient
        bulba = new Pokegen(null, gradient)
        bulba.canvas()
    }
    if(ev.key === "s") {
        var id = bulba.id
        bulba = new Pokegen(id)
        bulba.canvas()
    }
    if(ev.key === "d") {
        bulba = new Pokegen()
        bulba.canvas()
    }
})
document.addEventListener("wheel", function(ev) {
    bulba = new Pokegen()
    bulba.website()
})
camera.addEventListener("click", function() {
    var id = bulba.id
    var gradient = bulba.gradient
    bulba = new Pokegen(id, gradient)
    bulba.canvas()
})



chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    "id": "showName",
    "title": "Show name",
    "contexts": ["browser_action"],
    "type": "checkbox",
    "checked": true,
    "onclick": saveSettings
});
chrome.contextMenus.create({
    "id": "showDescription",
    "title": "Show description",
    "contexts": ["browser_action"],
    "type": "checkbox",
    "checked": true,
    "onclick": saveSettings
});
chrome.contextMenus.create({
    "id": "showCamera",
    "title": "Show camera",
    "contexts": ["browser_action"],
    "type": "checkbox",
    "checked": true,
    "onclick": saveSettings
});
if (localStorage["showName"] === "false") {
    pokename.style.visibility = "hidden"
    chrome.contextMenus.update("showName", {
        "checked": false
    });
}
if (localStorage["showDescription"] === "false") {
    desc.style.visibility = "hidden"
    chrome.contextMenus.update("showDescription", {
        "checked": false
    });
}
if (localStorage["showCamera"] === "false") {
    camera.style.visibility = "hidden"
    chrome.contextMenus.update("showCamera", {
        "checked": false
    });
}

function saveSettings(info) {
    if (info.menuItemId === "showCamera") {
        localStorage["showCamera"] = info.checked;
        if (localStorage["showCamera"] == "true") {
            camera.style.visibility = "visible"
        } else {
            camera.style.visibility = "hidden"
        }
    }
    if (info.menuItemId === "showName") {
        localStorage["showName"] = info.checked;
        if (localStorage["showName"] == "true") {
            pokename.style.visibility = "visible"
        } else {
            pokename.style.visibility = "hidden"
        }
    }
    if (info.menuItemId === "showDescription") {
        localStorage["showDescription"] = info.checked;
        if (localStorage["showDescription"] == "true") {
            desc.style.visibility = "visible"
        } else {
            desc.style.visibility = "hidden"
        }
    }
}