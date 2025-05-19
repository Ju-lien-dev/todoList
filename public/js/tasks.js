// Je pointe mes éléments HTML
let task = document.getElementById("app");
let nom = localStorage.getItem("name");
let list2 = [];
let taskList = [];
let finalList = [];

function updateFinalList() {
  finalList = [...taskList, ...list2];
}

// Je crée ma div
let div = document.createElement("div");
let form = document.createElement("div");
let divTask = document.createElement("div");
let deletedDiv = document.createElement("div");

// Je déclare les enfants
div.appendChild(form);
task.append(div, deletedDiv);
div.appendChild(divTask);

// Conditions d'affichage
if (nom !== null) {
  let message = document.createElement("h2");
  message.textContent = "Bonjour " + nom;
  task.insertBefore(message, div);
  message.style.color = "black";
  message.style.paddingBottom = "4%";
} else {
  window.location.href = "index.html";
}
const savedTasks = JSON.parse(localStorage.getItem("Taches")) || [];
list2.push(...savedTasks);

fetch("https://todoback-beta.vercel.app/todos")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    taskList.push(...data[0].todolist);

    updateFinalList();
    console.log(finalList);

    finalList.forEach((item) => {
      renderTask(item);
    });

    // Les différents éléments de mon formulaire de soumission de taches
    const subText = document.createElement("div");
    let submit = document.createElement("button");
    let text = document.createElement("input");
    text.type = "text";
    (text.placeholder = "écrivez une tache à réaliser"),
      (submit.textContent = "Nouvelle Tache");

    Object.assign(submit.style, {
      marginTop: "1%",
      borderRadius: "5px",
      height: "30px",
      width: "200px",
    });

    Object.assign(text.style, {
      margin: "1%",
      borderRadius: "5px",
      height: "30px",
      width: "400px",
    });

    submit.addEventListener("click", () => {
      generateTask(text.value, tags.value, select.value);
      text.value = "";
      tags.value = "";
    });

    const subTag = document.createElement("div");
    let tags = document.createElement("input");
    tags.type = "text";
    tags.placeholder = "Entrez un ou plusieurs tags";

    Object.assign(tags.style, {
      margin: "1%",
      borderRadius: "5px",
      height: "30px",
      width: "400px",
    });

    const done = document.createElement("div");
    const select = document.createElement("select");

    const option1 = document.createElement("option");
    option1.value = "false";
    option1.textContent = "Tâche non réalisée";

    const option2 = document.createElement("option");
    option2.value = "true";
    option2.textContent = "Tâche réalisée";

    Object.assign(select.style, {
      margin: "1%",
      borderRadius: "5px",
      height: "30px",
      width: "400px",
    });

    select.appendChild(option1);
    select.appendChild(option2);
    done.appendChild(select);
    form.appendChild(done);

    form.append(subText, subTag, done, submit);
    subText.append(text);
    subTag.append(tags);

    function generateTask(texte, tags, state) {
      const newTask = {
        id: generateId(),
        text: texte,
        created_at: new Date().toISOString(),
        Tags: [tags],
        is_complete: state === "true",
      };
      fetch("https://todoback-beta.vercel.app/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((res) => res.json())
        .then(() => {
          list2.push(newTask);
          updateFinalList();
          renderTask(newTask);
        });
    }

    // Fonction qui sert a créer une nouvelle ligne a chaque nouvelle tache
    function renderTask(item) {
      let card = document.createElement("div");
      let p = document.createElement("p");
      let button = document.createElement("button");
      p.textContent = item.text;
      button.textContent = "En savoir plus";

      divTask.appendChild(card);
      card.appendChild(p);
      card.appendChild(button);

      Object.assign(card.style, {
        height: "40px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "rgb(26, 188, 157)",
        margin: "2%",
        padding: "2px 2px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      });

      Object.assign(button.style, {
        border: "1px solid black",
        borderRadius: "10px",
        // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.13)",
      });
      Object.assign(p.style, {
        marginLeft: "20px",
        display: "flex",
        height: "100%",
        alignItems: "center",
      });

      Object.assign(div.style, {
        display: "flex",
        flexDirection: "column-reverse",
        backgroundColor: "rgb(44, 62, 80)",
        borderRadius: "10px",
        padding: "2% ",
      });

      Object.assign(form.style, {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      });

      // permet ici de transférer une information, ici une ID dans l url

      const url = "item.html?id=";

      button.addEventListener("click", () => {
        window.location.href = url + item.id;
      });
    }

    function generateId() {
      const allIds = [...taskList, ...list2].map((item) => item.id);
      return Math.max(0, ...allIds) + 1;
    }

    //récupération des données effacées

    let deletedItem = localStorage.getItem("deletedItem");

    if (deletedItem) {
      const parsedItem = JSON.parse(deletedItem);
      console.log(parsedItem);
      renderDeletedTask(parsedItem);

      function renderDeletedTask(item) {
        let card = document.createElement("div");
        let p = document.createElement("p");
        let titre = document.createElement("h3");
        let button = document.createElement("button");
        let buttonSup = document.createElement("button");
        p.textContent = item.text;
        button.textContent = "Récupérer la tâche";
        buttonSup.textContent = "supprimer";
        titre.textContent = "Dernière tâche supprimée";

        deletedDiv.append(titre, card);
        card.appendChild(p);
        card.append(button, buttonSup);

        buttonSup.addEventListener("click", () => {
          localStorage.removeItem("deletedItem");
          deletedDiv.innerHTML = "";
        });

        Object.assign(titre.style, {
          padding: "4% 0",
        });

        Object.assign(card.style, {
          height: "40px",
          display: "flex",
          // justifyContent: "space-between",
          backgroundColor: "rgb(255, 161, 161)",
          margin: "2%",
          padding: "2px 2px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        });

        Object.assign(button.style, {
          marginLeft: "35%",
          border: "1px solid black",
          borderRadius: "10px",
        });
        Object.assign(buttonSup.style, {
          color: "rgb(255, 0, 0)",
          marginLeft: "2%",
          border: "1px solid black",
          borderRadius: "10px",
          // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.13)",
        });
        Object.assign(p.style, {
          marginLeft: "20px",
          display: "flex",
          height: "100%",
          alignItems: "center",
        });

        Object.assign(div.style, {
          display: "flex",
          flexDirection: "column-reverse",
          backgroundColor: "rgb(44, 62, 80)",
          borderRadius: "10px",
          padding: "2% ",
        });

        Object.assign(form.style, {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        });

        button.addEventListener("click", (e) => {
          console.log(e);
          generateTask(
            parsedItem.text,
            parsedItem.Tags[0],
            parsedItem.is_complete.toString()
          );
          localStorage.removeItem("deletedItem");
          deletedDiv.innerHTML = "";
        });
      }
    }
  });

// Menu deroulant

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
const stats = document.createElement("p");
stats.textContent = "Statistiques";
acc.textContent = "Accueil";

divMenu.appendChild(menu);
menu.appendChild(pages);
pages.append(acc, stats);

acc.addEventListener("click", () => {
  window.location.href = "index.html";
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
