var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

let intervalId
// Automatic SlideShow
function play() {
    var slideIndex = 0;
    intervalId = setInterval(() => {
        var slides = document.getElementsByClassName("mySlides");

        slideIndex++;

        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        currentSlide(slideIndex)
    }, 5000); // Change image every 5 seconds}
}
play()

function pause() {
    clearInterval(intervalId)
}

document.getElementById("startCycle").addEventListener("click", play)
document.getElementById("stopCycle").addEventListener("click", pause)

//** $("mySlides fade").fadIn(600); **//

$(document).keyup(function (touche) { // on écoute l'évènement keyup()

    var appui = touche.which || touche.keyCode; // le code est compatible tous navigateurs grâce à ces deux propriétés

    if (appui == 39) { // si le code de la touche est égal à 37 (gauche)
        plusSlides(1)
    } else if (appui == 37) { // si le code de la touche est égal à 39 (droite)
        plusSlides(-1)
    } else if (appui == 32) { // si le code de la touche est égal à 32 (espace)
        pause()
    } else if (appui == 13) { // si le code de la touche est égal à 13 (entrer)
        play()
    }

});

const dots = document.querySelectorAll('.dot');
dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
        const index = parseInt(dot.dataset.index)
        currentSlide(index)
    });
})

/*** Code touches clavier
KEY_LEFT	= 37;
KEY_RIGHT	= 39;
KEY_SPACE	= 32; 
KEY_ENTER	= 13;
***/