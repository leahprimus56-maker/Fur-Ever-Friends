import { setAuthUsers } from "./auth.js";
import { logout } from "./auth.js";
import { login } from "./auth.js";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await login(email, password);

        alert("Login successful!");

        window.location.href = "index.html";

    } catch (error) {
        alert("Login failed: " + error.message);
    }
});

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

loginBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});

logoutBtn.addEventListener("click", async () => {
  await logout();
  window.location.href = "index.html";
});

let petsData = [];
let filteredPets = [];
let currentPage = 1;
const petsPerPage = 2;
let loggedIn = false;

setAuthUsers(
  (user) => {
    loggedIn = true;
    console.log("Logged in:", user.email);
  },
  () => {
    loggedIn = false;
    console.log("Not logged in");
  }
);

document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  initScroll();
  initActions();
  loadPets();
});

function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.getAttribute("data-filter");
      filterPets(type);
    });
  });
}

function initScroll() {
  const adoptNav = document.getElementById("adoptNav");

  if (adoptNav) {
    adoptNav.addEventListener("click", function (e) {
      e.preventDefault();

      const petSection = document.getElementById("browse-pets");
      if (petSection) {
        petSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }
}

async function loadPets() {
  try {
    const res = await fetch("pets.json");
    if (!res.ok) throw new Error("Cannot load pets.json");

    const data = await res.json();
    petsData = data.pets;
    filteredPets = petsData;

    displayPets();
  } catch (error) {
    console.error("ERROR:", error);
    const container = document.getElementById("browse-pets");
    if (container) container.innerHTML = "<p>Error loading pets.</p>";
  }
}

function filterPets(type) {
  currentPage = 1;

  if (type === "all") {
    filteredPets = petsData;
  } else {
    filteredPets = petsData.filter(p =>
      p.type.toLowerCase() === type.toLowerCase()
    );
  }

  displayPets();
}

function displayPets() {
  const container = document.getElementById("browse-pets");
  if (!container) return;

  container.innerHTML = "";

  const start = (currentPage - 1) * petsPerPage;
  const petsToShow = filteredPets.slice(start, start + petsPerPage);

  if (petsToShow.length === 0) {
    container.innerHTML = "<p>No pets found.</p>";
    updatePagination();
    return;
  }

  petsToShow.forEach(pet => {
    const statusClass =
      pet.status === "Available" ? "available" : "adopted";

    container.innerHTML += `
      <div class="pet-card" data-id="${pet.id}">
        <img src="${pet.image}" alt="${pet.name}">
        
        <div class="pet-info">
          <h3>${pet.name} <small>(#${pet.id})</small></h3>
          <span class="status ${statusClass}">${pet.status}</span>

          <div class="pet-details">
            <p><b>Type:</b> ${pet.type} | <b>Breed:</b> ${pet.breed}</p>
            <p><b>Age:</b> ${pet.age} | <b>Gender:</b> ${pet.gender}</p>
            <p><b>Sterilized:</b> ${pet.sterilized} | <b>Health:</b> ${pet.healthIssues}</p>
          </div>

          <p class="description">${pet.description}</p>

          <div class="actions">
            <button class="sponsor-btn" data-action="sponsor">Sponsor</button>
            <button class="adopt-btn" data-action="adopt">Adopt</button>
          </div>
        </div>
      </div>
    `;
  });

  updatePagination();
}

function initActions() {
  const modalOverlay = document.getElementById("modalOverlay");

  function openModal() {
    if (modalOverlay) modalOverlay.style.display = "flex";
  }

  function closeModal() {
    if (modalOverlay) modalOverlay.style.display = "none";
  }

  document.addEventListener("click", function (e) {

    if (
      e.target.classList.contains("adopt-btn") ||
      e.target.classList.contains("sponsor-btn")
    ) {
      if (!loggedIn) {
        openModal();
      } else {
        const action = e.target.getAttribute("data-action");

        window.location.href =
          action === "adopt"
            ? "adoptionForm.html"
            : "donationForm.html";
      }
    }

    if (
      e.target.classList.contains("close-modal") ||
      e.target.id === "modalOverlay"
    ) {
      closeModal();
    }

    if (
      e.target.classList.contains("modal-login-btn") ||
      e.target.classList.contains("modal-signup-btn")
    ) {
      window.location.href = "login.html";
    }

  });
}

window.nextPage = function () {
  if (currentPage * petsPerPage < filteredPets.length) {
    currentPage++;
    displayPets();
  }
};

window.prevPage = function () {
  if (currentPage > 1) {
    currentPage--;
    displayPets();
  }
};

function updatePagination() {
  const totalPages =
    Math.ceil(filteredPets.length / petsPerPage) || 1;

  const pageInfo = document.getElementById("pageInfo");

  if (pageInfo) {
    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;
  }

}
document.addEventListener("DOMContentLoaded", function () {

  let slides = document.querySelectorAll(".slide");
  let index = 0;

  function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }

  // MAKE BUTTONS WORK
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;

  // Auto slide
  setInterval(nextSlide, 3000);
});