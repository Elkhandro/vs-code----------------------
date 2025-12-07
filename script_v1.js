class ThemeManager {
  constructor() {
    this.themeToggleBtn =
      document.getElementById("theme-toggle") ||
      document.getElementById("themeToggle");
    this.htmlElement = document.documentElement;
    this.init();
  }

  init() {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Устанавливаем тему
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (prefersDark) {
      this.setTheme("dark");
    }

    // Добавляем обработчик клика
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
      this.updateButton();
    }

    // Отслеживаем изменения системной темы
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.setTheme(e.matches ? "dark" : "light");
        }
      });
  }

  setTheme(theme) {
    // Устанавливаем тему для html элемента
    if (theme === "dark") {
      this.htmlElement.setAttribute("data-theme", "dark");
    } else {
      this.htmlElement.removeAttribute("data-theme");
    }

    localStorage.setItem("theme", theme);
    this.updateButton();
  }

  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
  }

  getCurrentTheme() {
    return this.htmlElement.hasAttribute("data-theme") ? "dark" : "light";
  }

  updateButton() {
    if (!this.themeToggleBtn) return;

    const isDark = this.getCurrentTheme() === "dark";

    // Обновляем иконку
    const icon = this.themeToggleBtn.querySelector("i.bi");
    if (icon) {
      icon.className = isDark ? "bi bi-sun" : "bi bi-moon";
    }

    // Обновляем текст кнопки
    this.themeToggleBtn.innerHTML = isDark
      ? '<i class="bi bi-sun" aria-hidden="true"></i> Светлая'
      : '<i class="bi bi-moon" aria-hidden="true"></i> Тёмная';

    // Обновляем aria-label
    this.themeToggleBtn.setAttribute(
      "aria-label",
      isDark ? "Включить светлую тему" : "Включить тёмную тему"
    );
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});
