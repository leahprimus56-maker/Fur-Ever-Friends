let pets = [];
let index = 0;

/* LOAD FROM API */
async function loadPets() {
  try {
    let response = await fetch("https://freetestapi.com/api/v1/dogs");
    pets = await response.json();
    showPets();
  } catch (error) {
    console.log("Error:", error);
  }
}

/* DISPLAY */
function showPets() {
  let container = document.getElementById("pet-container");
  container.innerHTML = "";

  for (let i = index; i < index + 3 && i < pets.length; i++) {
    let pet = pets[i];

    container.innerHTML += `
      <div class="pet">
        <img src="https://placedog.net/200/150?random=${i}">
        <p>${pet.name}</p>
      </div>
    `;
  }
}