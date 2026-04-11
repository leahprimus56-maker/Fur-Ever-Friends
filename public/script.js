let pets = ["Pet1", "Pet2", "Pet3", "Pet4", "Pet5"];

let index = 0;

function showPets() {
  let container = document.getElementById("pet-container");
  container.innerHTML = "";

  for (let i = index; i < index + 3 && i < pets.length; i++) {
    container.innerHTML += "<div class='pet'>" + pets[i] + "</div>";
  }
}

function next() {
  if (index + 3 < pets.length) {
    index += 3;
    showPets();
  }
}

function prev() {
  if (index - 3 >= 0) {
    index -= 3;
    showPets();
  }
}

function toggleStory(el) {
  let hidden = el.querySelector(".hidden");
  hidden.style.display =
    hidden.style.display === "block" ? "none" : "block";
}

function scrollToPets() {
  document.getElementById("featured").scrollIntoView();
}

function signup() {
  alert("Signup");
}

showPets();