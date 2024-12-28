document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const header = document.querySelector("header");
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Hamburger menu toggle
    hamburger.addEventListener("click", () => {
        header.classList.toggle("expanded"); // Toggle the expanded class to show/hide the menu
        const navigationList = document.querySelector("#navigation-list");
        navigationList.classList.toggle("show"); // Toggle the visibility of the menu
    });

    // Day/Night view toggle
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
});
