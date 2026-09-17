const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const yearElement = document.querySelector("#current-year");

// Menampilkan tahun saat ini di footer
yearElement.textContent = new Date().getFullYear();

// Menu navigasi mobile
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Dark mode dan light mode
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  body.dataset.theme = "dark";
  themeIcon.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  const isDark = body.dataset.theme === "dark";

  if (isDark) {
    delete body.dataset.theme;
    localStorage.setItem("portfolio-theme", "light");
    themeIcon.textContent = "☾";
  } else {
    body.dataset.theme = "dark";
    localStorage.setItem("portfolio-theme", "dark");
    themeIcon.textContent = "☀";
  }
});

// Animasi elemen saat masuk viewport
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Menandai menu sesuai section yang sedang aktif
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});