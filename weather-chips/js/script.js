let plop = document.getElementsByTagName("audio")[0];
let arr = JSON.parse(localStorage.getItem("arr")) || []
function getData(city) {
    let unit = "C"
    let url = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where u=\'' + unit + '\' AND woeid in (select woeid from geo.places(1) where text="' + city + '")&format=json';
    $.get(url, function (data) {
        processData(data)
    })
}
function processData(data) {
    if (!data.query.results || !data.query.results.channel.location) {
        $(".input").addClass("error")
        setTimeout(function () {
            $(".input").removeClass("error")
        }, 500)
        $(".input").effect("shake")
        return;
    }
    let linn = data.query.results.channel.location.city
    let riik = data.query.results.channel.location.country
    let temp = data.query.results.channel.item.condition.temp
    function dataExists(data) {
        return arr.some(function (el) {
            return el.linn == linn;
        });
    }
    let obj = {
        linn: linn,
        riik: riik,
        temp: temp
    }
    if (!dataExists(obj)) {
        arr.push(obj)
    }
    displayData(linn + ", " + riik + " " + "<b>" + temp + "°C" + "</b>")
    localStorage.setItem("arr", JSON.stringify(arr));
}
function displayData(data) {
    let div = $('<div class="chip"/>').hide().appendTo("#data").html(data);
    div.show("fast")
    let close = $('<div class="close"/>').appendTo(div).html("✖").click(function () {
        $(this).closest('.chip').hide('fast', function () {
            plop.play();
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].linn == $(this).text().split(",")[0]) {
                    arr.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem("arr", JSON.stringify(arr));
            this.remove()
        });
    });
}
$(".input").keypress(function (ev) {
    if (ev.key == "Enter") {
        getData($(".input").val())
        $(".input").val("")
    }
})
//should probably use recursive method
arr.forEach(function (el) {
    getData(el.linn)
})