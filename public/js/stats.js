const app = document.getElementById("app");
const card = document.createElement("div");
const taskNumber = document.createElement("h3");
const taskDone = document.createElement("h3");
const taskToDo = document.createElement("h3");

// informations à récupérer sur le serveur
fetch("https://todoback-beta.vercel.app/todos")
  .then((res) => res.json())
  .then((data) => {
    let total = data[0].todolist.length;
    taskNumber.textContent = "Nombre total de tâches = " + total;
    console.log(data[0].todolist);
    let done = 0;
    let todo = 0;

    data[0].todolist.forEach((task) => {
      if (task.is_complete === true) {
        done++;
      } else {
        todo++;
      }
    });

    taskDone.textContent = "tâches faites =" + " " + done;
    taskToDo.textContent = "tâches à faire = " + " " + todo;

    const ctx = document.getElementById("myChart");
    const pieDiv = document.createElement("div");
    app.appendChild(pieDiv);
    pieDiv.appendChild(ctx);

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["fait", "A faire"],
        datasets: [
          {
            data: [done, todo],
            borderWidth: 1,
          },
        ],
      },
    });

    Object.assign(pieDiv.style, {
      height: "500px",
    });
  });

// Valeurs texte

// Enfants
app.appendChild(card);
card.append(taskNumber, taskDone, taskToDo);

// Propriétés de style

Object.assign(app.style, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgb(26, 188, 157)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  borderRadius: "10px",
  height: "500px",
});
Object.assign(card.style, {
  padding: "3.5% 0",
});

// Menu burger

const buttonBurger = document.getElementById("toggleButton");
buttonBurger.addEventListener("click", () => {
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});

const divMenu = document.getElementById("page-top");
let menu = document.createElement("div");
const pages = document.createElement("div");
const acc = document.createElement("p");
const listPages = document.createElement("p");

acc.textContent = "Accueil";
listPages.textContent = "Liste des taches";

divMenu.appendChild(menu);
menu.appendChild(pages);
pages.append(acc, listPages);

acc.addEventListener("click", () => {
  window.location.href = "index.html";
});

listPages.addEventListener("click", () => {
  window.location.href = "tasks.html";
});

Object.assign(pages.style, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

Object.assign(acc.style, {
  width: "20%",
  textAlign: "center",
  color: "white",
  cursor: "pointer",
});

Object.assign(listPages.style, {
  width: "20%",
  textAlign: "center",
  color: "white",
  cursor: "pointer",
});

Object.assign(menu.style, {
  display: "none",
  position: "fixed",
  top: "70px",
  right: "0px",
  height: "auto",
  width: "100%",
  zIndex: "9999",
  backgroundColor: "rgb(44, 62, 80)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
});
