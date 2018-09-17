let url = "https://flipboard.com/@raimoseero/feed-nii8kd0sz?rss"
let KEY = "kHiS1fTW8g9kDfN3HU1oOAOYcJwXbxnHiA0G78uZ"
let loading = document.getElementById("loading")
fetch("https://cors-anywhere.herokuapp.com/" + url).then((res) => {
    res.text().then((htmlTxt) => {
        let domParser = new DOMParser()
        let doc = domParser.parseFromString(htmlTxt, 'text/html')
        loading.style.display = "none"
        doc = doc.getElementsByTagName("script")[2].innerText.trim()
        doc = JSON.parse(doc.slice(doc.indexOf("{"), doc.lastIndexOf("}") + 1))
        let path = url.replace("https://flipboard.com", "").replace("?rss", "")
        process(doc.sections.sectionsByPath[path].items)
    })
}).catch(() => {
    loading.innerHTML = "Fetching failed..."
})

function process(arr) {
    arr.forEach((el, i) => {
        if(i < 1) return;
        let title = el.title
        let content = el.excerpt
        let image = el.image ? '<img src="' + el.image.mediumURL + '">' : ""
        let author = el.authorDisplayName || ""
        let topic = el.topics.length ? "<br>#" + el.topics[0].title : ""
        let url = el.sourceURL
        let card = document.createElement('div');
        card.className = "card"
        let card_image = document.createElement('div');
        card_image.className = "card-image"
        card_image.innerHTML = image
        card_content = document.createElement('div');
        card_content.className = "card-content"
        card_content.onclick = getArticle.bind(null, url)
        card_content.innerHTML = `<div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${title}</p>
            <p class="subtitle is-6"><i>${author}</i></p>
          </div>
        </div>
        <div class="content">${content}</a>.
          <a href="#">${topic}</a>
          <br>
        </div>
      </div>`
        if(image) {
            card.append(card_image)
        }
        card.append(card_content)
        document.body.append(card)
    })
}

function getArticle(url) {
    fetch('https://mercury.postlight.com/parser?url=' + url, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": KEY
        }
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        let myWindow = window.open("", "");
        myWindow.document.title = json.title
        myWindow.document.body.innerHTML = `<h1>${json.title}</h1>` + json.content;
    });
}