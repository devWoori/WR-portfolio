// ie에서 노션 클릭 시 edge열리도록
function clickNotion(url) {
  let urlPrefix = "";
  // IE11, Windows 10일 때 Edge 새창으로 열기
  if (
    (document.documentMode === 11) &
    (navigator.userAgent.indexOf("Windows NT 10.0") > -1)
  ) {
    urlPrefix = "microsoft-edge";
  }
  return urlPrefix + url;
}

const wrap = document.querySelector(".wrap");
const header = document.querySelector(".header__inner");
const headerLogo = document.querySelector(".header__logo");
const visual = document.querySelector(".visual");
const visualInner = document.querySelector(".visual__inner");
let controller = new ScrollMagic.Controller();

// header 애니메이션
let detectTop = function () {
  window.addEventListener("scroll", function () {
    let scrollLocation = document.documentElement.scrollTop;
    if (scrollLocation > 0) {
      header.classList.add("scrollOn");
    } else {
      header.classList.remove("scrollOn");
    }
  });
};
detectTop();

// visual section 고정
let visualScene = new ScrollMagic.Scene({
  triggerHook: 0,
  duration: "20%",
})
  .setPin(visual)
  .on("end", function () {
    visual.classList.add("fixed");
  })
  .addTo(controller);

// Scroll animation
let visualSvgFadeleft = new ScrollMagic.Scene({
    trrigerElement: visualInner,
    triggerHook: 0.2,
    duration: 500,
  }).setTween(".svg_text", 0.5, { x: "-50%", opacity: 0 }),
  visualTextFadeRight = new ScrollMagic.Scene({
    trrigerElement: visualInner,
    triggerHook: 0.2,
    duration: 500,
  }).setTween(".visual-text__word", 0.5, { x: "50%", opacity: 0 }),
  bgChange1 = new ScrollMagic.Scene({
    triggerElement: ".about",
    triggerHook: 0.2,
    duration: 500,
  }).setClassToggle("body", "body-white"),
  bgChange2 = new ScrollMagic.Scene({
    triggerElement: ".skills",
    triggerHook: 0.2,
    duration: 500,
  }).setClassToggle("body", "body-gray");
controller.addScene([
  visualSvgFadeleft,
  visualTextFadeRight,
  bgChange1,
  bgChange2,
]);

// 요소 애니메이션
let elementAnimation = function (item) {
  let items, winH;

  const initModule = function () {
    if (item.length > 1) {
      items = document.querySelectorAll(item);
    } else {
      items = document.querySelector(item);
    }
    winH = window.innerHeight - 100;
    _addEventHandlers();
  };

  let _addEventHandlers = function () {
    window.addEventListener("scroll", _checkPosition);
    window.addEventListener("load", _checkPosition);
    window.addEventListener("resize", initModule);
  };

  let _checkPosition = function () {
    if (item.length > 1) {
      for (var i = 0; i < items.length; i++) {
        let posFromTop = items[i].getBoundingClientRect().top;
        if (winH > posFromTop) {
          items[i].classList.add("active");
        } else {
          items[i].classList.remove("active");
        }
      }
    } else {
      items.classList.add("active");
    }
  };

  return {
    init: initModule,
  };
};

elementAnimation(".about__inner").init();
elementAnimation(".about-text").init();
elementAnimation(".skills__inner").init();
elementAnimation(".skills-list").init();
elementAnimation(".works__inner").init();
elementAnimation(".works-list").init();
elementAnimation(".contact").init();
elementAnimation(".contact-info").init();

// 페이지 로드 시 로딩 화면
let loadingDoneEvt = function () {
    // visual 애니메이션
    this.setTimeout(function () {
      document.body.classList.remove("loading"),
        document.body.classList.add("loading--hide"),
        gsap
          .timeline()
          .fromTo(
            ".header__logo",
            { opacity: 0, x: -500 },
            { opacity: 1, x: 0 }
          )
          .fromTo(
            ".header__email",
            { opacity: 0, x: 500 },
            { opacity: 1, x: 0 }
          )
          .fromTo(
            ".svg_text",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, ease: "easeInOut" }
          )
          .fromTo(
            ".visual-text__word",
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, ease: "easeInOut" }
          );
      controller.scrollTo(0);
    }, 800);
  },
  initCommon = function () {
    loadingDoneEvt(),
      headerLogo.addEventListener("click", function (e) {
        e.preventDefault(), controller.scrollTo(0);
      });
  };
window.addEventListener("load", initCommon);
