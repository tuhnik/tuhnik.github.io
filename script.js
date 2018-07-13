var image = document.createElement("IMG");
image.src="aardvark.svg";
image.setAttribute('class', 'aardvark');



$( document ).ready(()=>{
    particlesJS.load('particles-js', 'assets/particles.json', function() {
        $("body").append(image);
      });

})




