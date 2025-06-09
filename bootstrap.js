const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Update icon based on current theme
const updateThemeIcon = (theme) => {
  const useTag = themeIcon.querySelector("use");
  useTag.setAttribute("href", theme === "dark" ? "#moon-fill" : "#sun-fill");
};

// Get and apply stored theme
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-bs-theme", currentTheme);
updateThemeIcon(currentTheme);

// Toggle logic
themeToggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-bs-theme");
  const next = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-bs-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});
