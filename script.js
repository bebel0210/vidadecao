const menuButton = document.querySelector("[data-menu-button]");
const navigation = document.querySelector("[data-nav]");
const pageLinks = navigation?.querySelectorAll("a") ?? [];

function closeMenu() {
  if (!menuButton || !navigation) return;
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const willOpen = !navigation.classList.contains("is-open");
  navigation.classList.toggle("is-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", willOpen);
});

pageLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 1040) closeMenu();
});

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const header = document.querySelector("[data-header]");

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealTargets = document.querySelectorAll(
  ".hospital-intro, .hospital-showcase, .team-heading, .team-card, .section-heading, .service-list article, .structure-photo, .structure-copy, .location-copy, .location-map, .faq-grid > div"
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("has-reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -48px" }
  );

  revealTargets.forEach((target, index) => {
    target.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 70}ms`);
    revealObserver.observe(target);
  });
}
