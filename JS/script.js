document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const header = document.querySelector("header");
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check if theme preference is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('bright-mode', savedTheme === 'bright');
        themeToggle.innerHTML = savedTheme === 'bright' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // Day/Night view toggle
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('bright-mode');
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save theme preference in localStorage
        localStorage.setItem('theme', isDarkMode ? 'bright' : 'dark');
    });

    // Hamburger menu toggle
    hamburger.addEventListener("click", () => {
        header.classList.toggle("expanded"); // Toggle the expanded class to show/hide the menu
        const navigationList = document.querySelector("#navigation-list-mobile");
        navigationList.classList.toggle("show"); // Toggle the visibility of the menu
    });
});
