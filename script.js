/* script.js */

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Проверка сохраненной темы
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    updateBtnText(true);
  }

  themeToggleBtn.addEventListener("click", () => {
    const isDark = body.getAttribute("data-theme") === "dark";

    if (isDark) {
      body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      updateBtnText(false);
    } else {
      body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      updateBtnText(true);
    }
  });

  function updateBtnText(isDark) {
    themeToggleBtn.textContent = isDark ? "☀️ Светлая" : "🌙 Тёмная";
  }
});
