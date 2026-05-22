const links = Array.from(document.querySelectorAll(".nav-link"));
const sections = links
  .map((link) => document.getElementById(link.dataset.section))
  .filter(Boolean);

const setActive = (id) => {
  links.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === id);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) setActive(visible.target.id);
  },
  { rootMargin: "-30% 0px -55% 0px", threshold: [0.08, 0.2, 0.45] }
);

sections.forEach((section) => observer.observe(section));

const preview = document.querySelector(".floating-preview");
const previewImage = preview?.querySelector("img");
const rows = Array.from(document.querySelectorAll(".work-row"));

rows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    const image = row.dataset.image;
    if (!preview || !previewImage || !image) return;
    previewImage.src = image;
    preview.classList.add("is-visible");
  });

  row.addEventListener("focus", () => {
    const image = row.dataset.image;
    if (!preview || !previewImage || !image) return;
    previewImage.src = image;
    preview.classList.add("is-visible");
  });

  row.addEventListener("mouseleave", () => preview?.classList.remove("is-visible"));
  row.addEventListener("blur", () => preview?.classList.remove("is-visible"));
});

document.addEventListener("mousemove", (event) => {
  if (!preview || window.innerWidth < 980) return;
  const maxX = window.innerWidth - preview.offsetWidth - 24;
  const maxY = window.innerHeight - preview.offsetHeight - 24;
  const x = Math.min(event.clientX + 28, maxX);
  const y = Math.min(event.clientY - 80, maxY);
  preview.style.left = `${Math.max(24, x)}px`;
  preview.style.right = "auto";
  preview.style.top = `${Math.max(80, y)}px`;
});

const contactForm = document.querySelector(".contact-strip");
contactForm?.addEventListener("submit", () => {
  const button = contactForm.querySelector("button");
  if (!button) return;
  button.textContent = "Opening";
  setTimeout(() => {
    button.textContent = "Submit";
  }, 1600);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
