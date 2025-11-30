/* script.js - универсальный для всех страниц */

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const htmlElement = document.documentElement;

  // Проверка сохраненной темы
  const savedTheme = localStorage.getItem("theme") || "light";

  // Установка начальной темы
  htmlElement.setAttribute("data-bs-theme", savedTheme);
  updateBtnText(savedTheme === "dark");

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Смена темы
    htmlElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateBtnText(newTheme === "dark");
  });

  function updateBtnText(isDark) {
    const icon = themeToggleBtn.querySelector("i");
    const text = themeToggleBtn.querySelector(".theme-toggle__text");

    if (icon) {
      icon.className = isDark ? "bi bi-sun" : "bi bi-moon";
    }
    if (text) {
      text.textContent = isDark ? " Светлая" : " Тёмная";
    }
  }
});
// image-optimizer.js - добавляем в script.js
function optimizeImages() {
  // Lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Retina detection
  if (window.devicePixelRatio > 1) {
    document.documentElement.classList.add("retina");
  }
}

// Инициализация при загрузке
document.addEventListener("DOMContentLoaded", optimizeImages);
