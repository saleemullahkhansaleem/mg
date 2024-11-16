const slider = document.querySelectorAll(".slide");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const firstNav = document.getElementById("firstNav");
const secondNav = document.getElementById("secondNav");
const navItems = document.querySelectorAll("#secondNav > div");
const heroSection = document.getElementById("hero-section");
const storySection = document.getElementById("story-section");
const whySection = document.getElementById("why-section");
const logo = document.getElementById("logo");
const closeMenu = document.getElementById("closeMenu");
const navElement = document.getElementById("menuModel");
const closeVideo = document.getElementById("closeVideo");
const openVideo = document.getElementById("openVideo");
const videoModel = document.getElementById("videoModel");
const videoDoorButton = document.getElementById("videoDoorButton");
const videoDoorLeft = document.getElementById("videoDoorLeft");
const videoDoorRight = document.getElementById("videoDoorRight");
const videoStamp = document.getElementById("videoStamp");

// Slider Animation
let translateXAmount = 0;
const movePercentage = 106;
const getLimit = () => (window.innerWidth >= 768 ? 318 : 424);

const updateSlider = () => {
  slider.forEach((s) => {
    s.style.transform = `translateX(${translateXAmount}%)`;
  });
};

nextButton.addEventListener("click", () => {
  if (translateXAmount > 0) {
    translateXAmount -= movePercentage;
    updateSlider();
  }
});

prevButton.addEventListener("click", () => {
  if (translateXAmount < getLimit()) {
    translateXAmount += movePercentage;
    updateSlider();
  }
});

// Navigation Animation
const handleNavScroll = () => {
  if (window.scrollY > 50) {
    firstNav.classList.remove("md:block");
    secondNav.classList.replace("md:translate-x-40", "md:translate-x-0");
  } else {
    firstNav.classList.add("md:block");
    secondNav.classList.replace("md:translate-x-0", "md:translate-x-40");
  }
};

// Navigation Background and Logo Color Change
const toggleNavBg = () => {
  const isHeroOutOfView = heroSection.getBoundingClientRect().bottom < 0;
  const isStoryOutOfView = storySection.getBoundingClientRect().bottom < 0;
  const isWhySectionInView =
    whySection.getBoundingClientRect().top <= 0 &&
    whySection.getBoundingClientRect().bottom >= 0;

  navItems.forEach((item) => {
    item.classList.toggle("bg-black", !isWhySectionInView && isHeroOutOfView);
    item.classList.toggle("bg-white", isWhySectionInView || !isHeroOutOfView);
  });
  logo.setAttribute(
    "fill",
    isWhySectionInView || !isStoryOutOfView ? "#fff" : "#000"
  );
};

// Attach Event Listeners
window.addEventListener("scroll", () => {
  handleNavScroll();
  toggleNavBg();
});

// Transition Observer
const transition = (oldClass, newClass) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle(newClass, entry.isIntersecting);
    });
  });
  document.querySelectorAll(oldClass).forEach((el) => observer.observe(el));
};

transition(".hide", "show");
transition(".only-hide", "only-show");
transition(".hidden-left", "show");
transition(".hidden-right", "show");

// Menu Handlers
secondNav.addEventListener("click", () => {
  navElement.classList.replace("top-full", "top-0");
  navElement.classList.replace("max-h-0", "max-h-[2000px]");
});

closeMenu.addEventListener("click", () => {
  navElement.classList.replace("top-0", "top-full");
  navElement.classList.replace("max-h-[2000px]", "max-h-0");
});

// Video Modal Handlers
openVideo.addEventListener("click", () => {
  videoModel.classList.replace("hidden", "flex");
});

closeVideo.addEventListener("click", () => {
  videoModel.classList.replace("flex", "hidden");
});

// Video Door Animation
videoDoorButton.addEventListener("click", () => {
  videoDoorLeft.classList.add("-translate-x-full");
  videoDoorRight.classList.add("translate-x-full");
  videoStamp.classList.add("translate-x-full");

  const iframe = document.querySelector("iframe");
  const videoSrc = iframe.getAttribute("src");

  if (!videoSrc.includes("autoplay=1")) {
    iframe.setAttribute(
      "src",
      `${videoSrc}${videoSrc.includes("?") ? "&" : "?"}autoplay=1`
    );
  }
});
