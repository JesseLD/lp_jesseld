document.addEventListener("DOMContentLoaded", function () {
  animNavBar();
});

function animNavBar() {
  const nav = document.querySelector("nav");
  const links = nav.querySelectorAll("a");

  links.forEach((link, index) => {
    // Set a delay for each link's animation
    // link.style.transitionDelay = `2s`;

    link.addEventListener("mouseenter", function () {
      link.classList.add("active");
    });

    link.addEventListener("mouseleave", function () {
      link.classList.remove("active");
    });
  });
}

const typed = new Typed("#typed", {
  strings: [
    "Web Developer",
    "Backend Dev",
    "Frontend Dev",
    "Mobile Dev",
    "Flutter Dev",
    "React Dev",
    "Node Dev",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1500,
  loop: true,
});

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});
