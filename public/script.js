let pets = [
  {name: "Max", breed: "Golden Retriever"},
  {name: "Bella", breed: "Bulldog"},
  {name: "Rocky", breed: "Poodle"},
  {name: "Luna", breed: "Beagle"},
  {name: "Milo", breed: "Terrier"}
];

let index = 0;

/* SHOW PETS */
function showPets() {
  let container = document.getElementById("pet-container");
  container.innerHTML = "";

  for (let i = index; i < index + 3 && i < pets.length; i++) {
    let pet = pets[i];

    container.innerHTML +=
      "<div class='pet'>" +
      "<h4>" + pet.name + "</h4>" +
      "<p>" + pet.breed + "</p>" +
      "</div>";
  }
}

/* NEXT */
function next() {
  if (index + 3 < pets.length) {
    index += 3;
    showPets();
  }
}

/* PREVIOUS */
function prev() {
  if (index - 3 >= 0) {
    index -= 3;
    showPets();
  }
}

/* STORIES */
function toggleStory(el) {
  let p = el.querySelector("p");
  p.classList.toggle("hidden");
}

/* SCROLL */
function scrollToPets() {
  document.getElementById("featured").scrollIntoView();
}

/* SIGNUP */
function signup() {
  alert("Signup coming soon!");
}

/* START */
showPets();