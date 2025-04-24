const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const link = document.getElementById(`link-${id}`);

    console.log(link);
    console.log(id)

    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, {
  threshold: 0.6 // Quanto da seção precisa estar visível (60%)
});

// Observar todas as seções
sections.forEach(section => {
  observer.observe(section);
});