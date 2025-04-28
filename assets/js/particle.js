tsParticles.load("tsparticles", {
  background: {
    color: {
      value: "#03090E" // cor de fundo
    }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 100, duration: 0.4 }
    }
  },
  particles: {
    color: { value: "#007AFF" }, // azul primário
    links: {
      color: "#007AFF",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: { enable: true },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: false,
      speed: 2,
      straight: false
    },
    number: {
      density: { enable: true, area: 800 },
      value: 60
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 5 } }
  },
  detectRetina: true
});