const themeToggle = document.getElementById('theme-toggle');
const emailButton = document.getElementById('email-button');
const html = document.documentElement;

function getTheme() {
  return html.getAttribute('data-theme') ||
         localStorage.getItem('theme') || 
         (window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? 'dark' : 'light');
}

function updateThemeIcon(theme) {
  const iconName = theme === 'dark' ? 'sun' : 'moon';
  const newIcon = document.createElement('i');
  newIcon.setAttribute('data-lucide', iconName);
  newIcon.classList.add('icon');
  newIcon.id = 'theme-icon';
  
  const currentIcon = document.getElementById('theme-icon');
  currentIcon.replaceWith(newIcon);
  lucide.createIcons();
  
  document.getElementById('theme-icon').classList.add('icon-enter');
}

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function initTheme() {
  const currentTheme = getTheme();
  html.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  
  const iconName = currentTheme === 'dark' ? 'sun' : 'moon';
  document.getElementById('theme-icon').setAttribute('data-lucide', iconName);
  lucide.createIcons();
}

themeToggle.addEventListener('click', () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

emailButton.addEventListener('click', () => {
  window.location.href = 'mailto:gkokkinis@protonmail.com';
});

initTheme();
