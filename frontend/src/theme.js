// Theme logic for Eye to Eye App
export function applyTheme(theme) {
  let appliedTheme = theme;
  if (theme === 'device') {
    appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', appliedTheme);
}

export function getSavedTheme() {
  return localStorage.getItem('eye2eye_theme') || 'device';
}

export function saveTheme(theme) {
  localStorage.setItem('eye2eye_theme', theme);
  applyTheme(theme);
}

// Call on app load
export function initTheme() {
  applyTheme(getSavedTheme());
}
