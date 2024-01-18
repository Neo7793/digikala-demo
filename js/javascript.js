"use strict";

///////////////////////////////////////////

const classify = document.querySelector(".classify");
const classifyMenu = document.querySelector(".classify__menu");
const overlay = document.querySelector(".overlay");
const classifyItems = document.querySelectorAll(".classify__menu__items");
const btnGoToTop = document.querySelector(".goToTop");
const headerTop = document.querySelector(".header");
const exlpainMore = document.querySelector(".moreExpand");
const explainRight = document.querySelector(".footer__explain__right");
const explainLeftItems = document.querySelectorAll(
  ".footer__explain__left__items"
);
let exlpainMoreText = exlpainMore.textContent;
///////////////////////////////////////////

// hover menu classify

const hoverMenu = function (e) {
  classifyMenu.classList.add("active");
  classifyItems[0].classList.add("active");
};

const hoverClose = function () {
  classifyMenu.classList.remove("active");
  classifyItems[0].classList.add("remove");
};
classify.addEventListener("mouseover", hoverMenu);
classify.addEventListener("mouseleave", hoverClose);
classifyMenu.addEventListener("mouseover", hoverMenu);
classifyMenu.addEventListener("mouseleave", hoverMenu);
classifyItems.forEach((hover, i) => {
  const classifyMenuLeft = hover.querySelector(".classify__menu__items__left");

  hover.addEventListener("mouseover", function () {
    classifyMenuLeft.classList.add("active");
  });
  hover.addEventListener("mouseleave", function () {
    classifyMenuLeft.classList.remove("active");
  });
});

//////////////

// scroll to top
btnGoToTop.addEventListener("click", function () {
  headerTop.scrollIntoView({ behavior: "smooth" });
});

//////////////

// show all explain
exlpainMore.addEventListener("click", function () {
  explainRight.classList.toggle("active-explain");
  explainLeftItems.forEach((i) => i.classList.toggle("active-image"));
  if (exlpainMore.textContent === exlpainMoreText) {
    exlpainMore.textContent = "بستن";
  } else {
    exlpainMore.textContent = exlpainMoreText;
  }
});

//////////////

// Slider
const picSlider = function () {
  const slides = document.querySelectorAll(".slider");
  const btnRight = document.querySelector(".slider-btn--right");
  const btnLeft = document.querySelector(".slider-btn--left");
  const calcSliderWidth = document.querySelector(".calc-slider-width");
  const dots = document.querySelector(".picture-dot__contents");
  let curSlide = 0;
  const maxSlides = slides.length;
  const sliderWidth = calcSliderWidth.offsetWidth;

  // functionality
  const createDots = function () {
    slides.forEach((_, i) => {
      dots.insertAdjacentHTML(
        "beforeend",
        `<span class="dots" data-slide ="${i}"></span>`
      );
    });
  };

  // activate dots
  const activateDots = function (slide) {
    document
      .querySelectorAll(".dots")
      .forEach((dot) => dot.classList.remove("active-dots"));
    document
      .querySelector(`.dots[data-slide="${slide}"]`)
      .classList.add("active-dots");
  };
  //
  const goToSlider = function (slide, width) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${width * -(i - slide)}px)`;
    });
  };
  const nextSlide = function () {
    if (curSlide === maxSlides - 1) {
      curSlide = 0;
    } else {
      curSlide++;
      goToSlider(curSlide, sliderWidth);
      activateDots(curSlide, sliderWidth);
    }
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlides - 1;
    } else {
      curSlide--;
    }
    goToSlider(curSlide, sliderWidth);
    activateDots(curSlide, sliderWidth);
  };
  setInterval(nextSlide, 5000);

  const init = function () {
    goToSlider(0, sliderWidth);
    createDots();
    activateDots(0);
  };
  init();

  //event handler
  btnRight.addEventListener("click", prevSlide);
  btnLeft.addEventListener("click", nextSlide);
  // keypress for slider
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") nextSlide();
    if (e.key === "ArrowRight") prevSlide();
  });
  // dot for slider
  dots.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots")) {
      const { slide } = e.target.dataset;
      goToSlider(slide, sliderWidth);
      activateDots(slide);
    }
  });
};

picSlider();

const containerSlider = function () {
  const containerSlide = document.querySelectorAll(".container-slider");
  const containerContent = document.querySelector(
    ".slider-items__container__content"
  );
  const btnContainerLeft = document.querySelector(".container-btn--left");
  const btnContainerRight = document.querySelector(".container-btn--right");
  const calcContainerWidth = document.querySelector(".container-width");
  const brandParent = document.querySelector(".brand__bottom");
  const brandItems = document.querySelectorAll(".brand__bottom__items");
  const btnBrandNext = document.querySelector(".next-brand");
  const btnBrandPrev = document.querySelector(".prev-brand");
  const mostSellParent = document.querySelector(".mostSell__bottom");
  const mostSellItems = document.querySelectorAll(".mostSell__bottom__items");
  const btnMostSellNext = document.querySelector(".next-mostSell");
  const btnMostSellprev = document.querySelector(".prev-mostSell");
  const brandParentWidth = brandParent.offsetWidth;
  const brandItemsWidth = brandItems[0].offsetWidth;
  const mostSellParentWidth = mostSellParent.offsetWidth;
  const mostSellitemsWidth = mostSellItems[0].offsetWidth;
  const ContainerWidth = calcContainerWidth.offsetWidth;
  const containerContentWidth = containerContent.offsetWidth;
  let visibleContainer = 0;
  let visibleBrand = 1;
  let visibleMostSell = -2;
  let curSlide = 0;
  // calc number of visible items
  containerSlide.forEach((i) => {
    const itemsRect = i.getBoundingClientRect();
    if (
      itemsRect.right >= ContainerWidth &&
      itemsRect.left <= containerContentWidth
    ) {
      visibleContainer++;
    }
  });
  brandItems.forEach((i) => {
    const itemsRect = i.getBoundingClientRect();
    if (
      itemsRect.right >= brandItemsWidth &&
      itemsRect.left <= brandParentWidth
    ) {
      visibleBrand++;
    }
  });
  mostSellItems.forEach((i) => {
    const itemsRect = i.getBoundingClientRect();
    if (
      itemsRect.right >= mostSellitemsWidth &&
      itemsRect.left <= mostSellParentWidth
    ) {
      visibleMostSell++;
    }
  });

  ///

  const goToSlider = function (items, slide, width) {
    const translateXValue = slide * width;
    items.style.transform = `translateX(${translateXValue}px)`;
    console.log(translateXValue);
    console.log(slide);
  };

  const nextSlide = function (max, slide, width) {
    if (curSlide === max) {
      curSlide = 0;
    } else {
      curSlide++;
      goToSlider(slide, curSlide, width);
    }
  };
  const prevSlide = function (max, slide, width) {
    if (curSlide === 0) {
      curSlide = max;
    } else {
      curSlide--;
    }
    goToSlider(slide, curSlide, width);
  };
  goToSlider(containerContent, 0, ContainerWidth);
  btnContainerRight.addEventListener("click", function () {
    nextSlide(visibleContainer, containerContent, ContainerWidth);
  });
  btnContainerLeft.addEventListener("click", function () {
    prevSlide(visibleContainer, containerContent, ContainerWidth);
  });
  btnBrandNext.addEventListener("click", function () {
    nextSlide(visibleBrand, brandParent, brandItemsWidth);
  });
  btnBrandPrev.addEventListener("click", function () {
    prevSlide(visibleBrand, brandParent, brandItemsWidth);
  });
  btnMostSellNext.addEventListener("click", function () {
    nextSlide(visibleMostSell, mostSellParent, mostSellitemsWidth);
  });
  btnMostSellprev.addEventListener("click", function () {
    prevSlide(visibleMostSell, mostSellParent, mostSellitemsWidth);
  });
};
containerSlider();
