let hamburger = document.querySelector(".sveriges-godaste-hamburgare");
let menu = document.querySelector(".menu");
let nav = document.querySelector("nav");
let lines = document.querySelectorAll(".line");

hamburger.addEventListener("click", toggleHamburger);

let animationComplete = true;

function toggleHamburger() {
  // Make sure the user can't spam-click the navbar until it has finished showing/hiding itself.
  if (!animationComplete) {
    return;
  }

  // If the navbar has finished animating, let the user toggle the navbar.
  animationComplete = false;
  let isOpen = nav.classList.contains("display");
  if (isOpen) {
    menu.innerText = "Meny";
    animateHamburger();
    animateNav();
  } else {
    menu.innerText = "Stäng";
    animateHamburger();
    toggleNav();
    animateNav();
  }

  nav.addEventListener(
    "animationend",
    () => {
      // We toggle the nav for the above if-statement after the animation has ended.
      // The above else-statement toggles the nav before the animation.
      if (isOpen) {
        toggleNav();
      }
      // We wait until the nav has finished animating, before letting the user opening/closing the hamburger menu again.
      animationComplete = true;
    },
    { once: true }
  );
}

function animateHamburger() {
  lines.forEach((line) => {
    line.classList.toggle("open");
  });
}

function toggleNav() {
  nav.classList.toggle("display");
}

function animateNav() {
  nav.classList.toggle("showNavbarAnimation");
  nav.classList.toggle("hideNavbarAnimation");
}
