/* script.js - улучшенная версия */

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

    // Сохраняем фокус на кнопке после переключения
    themeToggleBtn.focus();
  });

  // Управление фокусом в модальных окнах
  const modal = document.getElementById("contactModal");
  if (modal) {
    modal.addEventListener("show", () => {
      const firstInput = modal.querySelector("input, textarea, button");
      if (firstInput) firstInput.focus();
    });
  }

  // Добавить клавиатурную навигацию
  document.addEventListener("keydown", (e) => {
    // Закрытие модальных окон по Escape
    if (e.key === "Escape") {
      const openModal = document.querySelector("dialog[open]");
      if (openModal) {
        openModal.close();
        const triggerBtn = document.querySelector('[aria-expanded="true"]');
        if (triggerBtn) triggerBtn.focus();
      }
    }
  });

  function updateBtnText(isDark) {
    const icon = themeToggleBtn.querySelector("i");
    const text =
      themeToggleBtn.querySelector(".theme-toggle__text") || themeToggleBtn;

    if (icon) {
      icon.className = isDark ? "bi bi-sun" : "bi bi-moon";
      icon.setAttribute("aria-hidden", "true");
    }

    if (
      text.textContent.includes("Тёмная") ||
      text.textContent.includes("Светлая")
    ) {
      text.textContent = isDark ? "☀️ Светлая" : "🌙 Тёмная";
    }

    // Обновить aria-label
    themeToggleBtn.setAttribute(
      "aria-label",
      isDark ? "Включить светлую тему" : "Включить тёмную тему"
    );
  }

  // Инициализация прогресс-баров
  document.querySelectorAll(".progress-bar").forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
});
