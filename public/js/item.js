const params = new URLSearchParams(window.location.search);
const taskId = params.get("id");
const div = document.getElementById("app");
const list = document.createElement("ul");
const sup = document.createElement("button");
const popSup = document.createElement("div");
const popButtons = document.createElement("div");

div.appendChild(list);
div.appendChild(sup);
div.appendChild(popSup);
popSup.appendChild(popButtons);

console.log(div);

Object.assign(div.style, {
  padding: "10% 10%",
  height: "400px",
  backgroundColor: "rgb(26, 188, 158)",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
});

Object.assign(list.style, {
  listStyle: "none",
  textAlign: "center",
  fontSize: "20px",
});

sup.textContent = "Supprimer la tache";
sup.addEventListener("click", () => {
  popSup.style.display = "flex";
});

Object.assign(sup.style, {
  height: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
});

Object.assign(popSup.style, {
  display: "none",
  flexDirection: "column-reverse",
  justifyContent: "flex-end",
  position: "fixed",
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "110px",
  width: "400px",
  backgroundColor: "rgb(255, 255, 255)",
  zIndex: "9999",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
});

let buttonSup = document.createElement("button");
let buttonCxl = document.createElement("button");
let p = document.createElement("p");

buttonSup.textContent = "supprimer";
buttonCxl.textContent = "annuler";
p.textContent = "Etes vous sur de vouloir supprimer la tache?";
p.style.textAlign = "center";

popSup.appendChild(p);
popButtons.appendChild(buttonSup);
popButtons.appendChild(buttonCxl);

Object.assign(popButtons.style, {
  display: "flex",
  justifyContent: "space-evenly",
});
Object.assign(buttonCxl.style, {
  height: "30px",
  width: "120px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
});
Object.assign(buttonSup.style, {
  height: "30px",
  width: "120px",
  borderRadius: "10px",
  backgroundColor: "rgba(203, 16, 16, 0.5)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
});

buttonCxl.addEventListener("click", (e) => {
  popSup.style.display = "none";
});

buttonSup.addEventListener("click", () => {
  fetch("https://todoback-beta.vercel.app/todos")
    .then((res) => res.json())
    .then((data) => {
      const todoList = data[0].todolist;
      const task = todoList.find((t) => t.id == taskId);
      console.log(task);
      localStorage.setItem("deletedItem", JSON.stringify(task));
      fetch(`https://todoback-beta.vercel.app/todos/${taskId}/`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          alert("Tâche supprimée avec succès !");
          window.location.href = "tasks.html";
        } else {
          alert("Erreur lors de la suppression.");
        }
      });
    });
});

fetch("https://todoback-beta.vercel.app/todos")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const todoList = data[0].todolist;
    const task = todoList.find((t) => t.id == taskId);

    if (!task) {
      document.body.textContent = "Tache introuvable";
      return;
    } else {
      const infos = [
        ["Id", taskId],
        ["Tâche", task.text],
        ["Créé le", task.created_at],
        ["Tags", task.Tags.join(" / ")],
        task.is_complete ? ["Statut", "terminée"] : ["Statut", "A faire"],
      ];

      infos.forEach(([label, value]) => {
        const li = document.createElement("li");
        li.textContent = `${label} : ${value}`;
        list.appendChild(li);
      });
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = task.is_complete
        ? "Marquer comme à faire"
        : "Marquer comme terminée";

      Object.assign(toggleBtn.style, {
        marginTop: "5px",
        height: "30px",
        borderRadius: "10px",
        backgroundColor: "rgb(52, 152, 219)",
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      });

      toggleBtn.addEventListener("click", () => {
        const updatedTask = {
          ...task,
          is_complete: !task.is_complete,
        };

        fetch(`https://todoback-beta.vercel.app/todos/${taskId}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }).then((res) => {
          if (res.ok) {
            alert("Statut mis à jour !");
            window.location.reload();
          } else {
            alert("Erreur lors de la mise à jour.");
          }
        });
      });

      div.appendChild(toggleBtn);
    }
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
const stats = document.createElement("p");
stats.textContent = "Statistiques";
acc.textContent = "Accueil";
listPages.textContent = "Liste des taches";

divMenu.appendChild(menu);
menu.appendChild(pages);
pages.append(acc, listPages, stats);

acc.addEventListener("click", () => {
  window.location.href = "index.html";
});

listPages.addEventListener("click", () => {
  window.location.href = "tasks.html";
});

stats.addEventListener("click", () => {
  window.location.href = "stat.html";
});

Object.assign(pages.style, {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

Object.assign(stats.style, {
  width: "20%",
  textAlign: "center",
  color: "white",
  cursor: "pointer",
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
