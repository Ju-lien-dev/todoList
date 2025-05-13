const form = document.getElementById("form");
let prenom = document.getElementById("prenom");
let formG = document.getElementById("form-group");
const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{3,}$/;

console.log(formG);

console.log(prenom);

function submit(e) {
  e.preventDefault();
  const nom = prenom.value;
  const existingAlert = formG.querySelector("p");

  if (existingAlert) {
    existingAlert.remove();
  }

  if (regex.test(nom) === false) {
    let alert = document.createElement("p");
    alert.textContent = "Merci d'écrire un prénom valide";

    formG.appendChild(alert);

    Object.assign(alert.style, {
      display: "flex",
      justifyContent: "center",
      color: "red",
      fontSize: "13px",
    });

    return;
  }
  localStorage.setItem("name", nom);
  window.location.href = "tasks.html";
}

form.addEventListener("submit", submit);

// Menu burger

const buttonBurger = document.getElementById("toggleButton");
buttonBurger.addEventListener("click", () => {
  alert("veuillez vous identifier");
});
