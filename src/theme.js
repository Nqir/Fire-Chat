const theme = document.body.getAttribute("data-bs-theme");

export function switchTheme() {
    let theme = document.body.getAttribute("data-bs-theme");
    if (theme === "dark") {
        document.body.setAttribute("data-bs-theme", "light");
        localStorage.setItem('theme', 'light');
    } else if (theme === "light") {
        document.body.setAttribute("data-bs-theme", "dark");
        localStorage.setItem('theme', 'dark');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute("data-bs-theme", savedTheme);
    }
});