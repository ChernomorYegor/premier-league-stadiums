const infoSlides = document.querySelectorAll(".info-slider > div");
const imageSlides = document.querySelectorAll(".image-slider > div");

const btnDirection = document.querySelector(".btn-direction");
const btnDown = document.querySelector(".btn-down");
const btnUp = document.querySelector(".btn-up");
const btnsClubs = document.querySelectorAll(".clubs > li > button");

let isHorizontal = false;
let isAnimating = false;
let currentSlideIndex = 0;

function hideSlide(infoSlidesDirection, imageSlidesDirection) {
  isAnimating = true;

  infoSlides[currentSlideIndex].classList.add(infoSlidesDirection);
  imageSlides[currentSlideIndex].classList.add(imageSlidesDirection);

  infoSlides[currentSlideIndex].addEventListener("animationend", function() {
    this.classList.remove("current", infoSlidesDirection);
  });

  imageSlides[currentSlideIndex].addEventListener("animationend", function() {
    this.classList.remove("current", imageSlidesDirection);
  });
}

function changeSlideIndex(index) {
  currentSlideIndex = (index + imageSlides.length) % imageSlides.length;
}

function showSlide(infoSlidesDirection, imageSlidesDirection) {
  infoSlides[currentSlideIndex].classList.add("next", infoSlidesDirection);
  imageSlides[currentSlideIndex].classList.add("next", imageSlidesDirection);

  infoSlides[currentSlideIndex].addEventListener("animationend", function() {
    this.classList.remove("next", infoSlidesDirection);
    this.classList.add("current");
  });

  imageSlides[currentSlideIndex].addEventListener("animationend", function() {
    this.classList.remove("next", imageSlidesDirection);
    this.classList.add("current");
  });

  isAnimating = false;
}

btnDirection.addEventListener("click", function() {
  isHorizontal = !isHorizontal;
  btnDown.classList.toggle("horizontal");
  btnUp.classList.toggle("horizontal");
});

btnDown.addEventListener("click", function() {
  if (!isAnimating) {
    if (isHorizontal) {
      hideSlide("hide-to-right", "hide-to-right");
      changeSlideIndex(currentSlideIndex - 1);
      showSlide("show-to-right", "show-to-right");
    } else {
      hideSlide("hide-up", "hide-down");
      changeSlideIndex(currentSlideIndex - 1);
      showSlide("show-up", "show-down");
    }
  }
});

btnUp.addEventListener("click", function() {
  if (!isAnimating) {
    if (isHorizontal) {
      hideSlide("hide-to-left", "hide-to-left");
      changeSlideIndex(currentSlideIndex + 1);
      showSlide("show-to-left", "show-to-left");
    } else {
      hideSlide("hide-down", "hide-up");
      changeSlideIndex(currentSlideIndex + 1);
      showSlide("show-down", "show-up");
    }
  }
});

btnsClubs.forEach(function(club, clubIndex) {
  club.addEventListener("click", function() {
    if (!isAnimating) {
      if (isHorizontal) {
        if (clubIndex < currentSlideIndex) {
          hideSlide("hide-to-right", "hide-to-right");
          currentSlideIndex = clubIndex;
          showSlide("show-to-right", "show-to-right");
        } else {
          hideSlide("hide-to-left", "hide-to-left");
          currentSlideIndex = clubIndex;
          showSlide("show-to-left", "show-to-left");
        }
      }
      if (!isHorizontal) {
        if (clubIndex < currentSlideIndex) {
          hideSlide("hide-up", "hide-down");
          currentSlideIndex = clubIndex;
          showSlide("show-up", "show-down");
        } else {
          hideSlide("hide-down", "hide-up");
          currentSlideIndex = clubIndex;
          showSlide("show-down", "show-up");
        }
      }
    }
  })
})