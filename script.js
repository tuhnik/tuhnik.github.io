var image = document.createElement("IMG");
image.src="aardvark.svg";
image.setAttribute('class', 'aardvark');
$("body").append(image);


$( document ).ready(()=>{
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        console.log('callback - particles.js config loaded');
      });

})




