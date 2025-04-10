document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const header = document.querySelector("header");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check if theme preference is saved in localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.toggle("bright-mode", savedTheme === "bright");
    themeToggle.innerHTML =
      savedTheme === "bright"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  }

  // Day/Night view toggle
  themeToggle.addEventListener("click", () => {
    const isDarkMode = body.classList.toggle("bright-mode");
    themeToggle.innerHTML = isDarkMode
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';

    // Save theme preference in localStorage
    localStorage.setItem("theme", isDarkMode ? "bright" : "dark");
  });

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    header.classList.toggle("expanded"); // Toggle the expanded class to show/hide the menu
    const navigationList = document.querySelector("#navigation-list-mobile");
    navigationList.classList.toggle("show"); // Toggle the visibility of the menu
  });

  document.querySelectorAll("#navigation-list-desktop li").forEach((li) => {
    li.addEventListener("click", () => {
      const anchor = li.querySelector("a");
      if (anchor) {
        anchor.click();
      }
    });
  });
  document.querySelectorAll("#navigation-list-mobile li").forEach((li) => {
    li.addEventListener("click", () => {
      const anchor = li.querySelector("a");
      if (anchor) {
        anchor.click();
      }
    });
  });

  const searchButton = document.getElementById("search-button");
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  const mainBody = document.querySelector(".main-body");

  // Show the search overlay when search button is clicked
  searchButton.addEventListener("click", () => {
    searchOverlay.classList.remove("hidden");
    searchInput.focus();
  });

  // Hide the search overlay when clicked outside or pressing ESC key
  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.add("hidden");
      searchInput.value = "";
      searchResults.innerHTML = ""; // Clear previous search results
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchOverlay.classList.add("hidden");
      searchInput.value = "";
      searchResults.innerHTML = ""; // Clear previous search results
    }
  });

  // Function to generate a project card
  function createProjectCard(title, imgSrc, description, link) {
    return `
            <div class="project-card-search">
                <div class="card-body-image">
                    <img src="${imgSrc}" alt="${title}">
                </div>
                <div class="card-body">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <a href="${link}">Read More</a>
                </div>
            </div>
        `;
  }

  // Search for matching text in project files
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = ""; // Clear previous search results

    if (query) {
      const projectFiles = [
        {
          path: "./Files/Projects/project1.html",
          title: "2D Dungeon Generator",
          image: "./Files/Pictures/Projekt1.jpg",
          description:
            "D dungeon generator using BSP algorithm made in Godot using GDScript.",
        },
        {
          path: "./Files/Projects/project2.html",
          title: "Maze Dive",
          image: "./Files/Pictures/Projekt2.jpg",
          description:
            "Maze Dive is a low-poly, 3D first-person shooter (FPS) roguelike game made in Unity.",
        },
        {
          path: "./Files/Projects/project3.html",
          title: "Sulfur Bishop",
          image: "./Files/Pictures/WIPFullHD.jpg",
          description: "2D top down action game - WORK IN PROGRESS.",
        },
      ];

      // Filter and create cards for matching projects
      const matches = projectFiles.filter((project) => {
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
        );
      });

      if (matches.length > 0) {
        matches.forEach((project) => {
          const card = createProjectCard(
            project.title,
            project.image,
            project.description,
            project.path
          );
          searchResults.innerHTML += card;
        });
      } else {
        searchResults.innerHTML = `<p>No results found for "<strong>${query}</strong>".</p>`;
      }
    }
  });

  // Path to your PDF file
  const url = "./Files/PDF/Jakub_Resume-3.pdf";

  // Get the canvas element
  const canvas = document.querySelector(".pdf-canvas");
  const context = canvas.getContext("2d");

  // Load the PDF document using PDF.js
  pdfjsLib
    .getDocument(url)
    .promise.then((pdf) => {
      pdf.getPage(1).then((page) => {

        const scale = 1; 
        const viewport = page.getViewport({ scale: scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
          canvasContext: context,
          viewport: viewport,
        });
      });
    })
    .catch((error) => {
      console.error("Error loading PDF:", error);
    });
});
