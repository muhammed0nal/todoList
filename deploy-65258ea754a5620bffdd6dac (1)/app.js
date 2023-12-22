const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clear");
const addInput = document.getElementById("addInput");

const ul = document.getElementById("ul");

let gorevList = [];
if (localStorage.getItem("gorevList") !== null) {
  gorevList = JSON.parse(localStorage.getItem("gorevList"));
}
const filters = document.querySelectorAll(".container-top div");

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", deleteAll);

let isItUptade = false;
let uptadeId;
createTask("all");

function addTask(e) {
  if (addInput.value == "") {
    alert("Görev Girmelisin");
  } else {
    if (!isItUptade) {
      gorevList.push({
        id: gorevList.length,
        text: addInput.value,
        durum: "continuing",
      });
    } else {
      gorevList.forEach((element) => {
        if (element.id == uptadeId) {
          element.text = addInput.value;
        }
        isItUptade = false;
      });
    }
    createTask(document.querySelector("div.active").id);
    localStorage.setItem("gorevList", JSON.stringify(gorevList));
  }

  e.preventDefault();
}
function deleteAll(e) {
  gorevList.splice(0, gorevList.length);
  createTask("all");
  localStorage.setItem("gorevList", JSON.stringify(gorevList));
  e.preventDefault();
}

function createTask(filter) {
  let completed;
  ul.innerText = "";
  let li;
  gorevList.forEach((element) => {
    if (element.durum == "complete") {
      completed = "checked";
    } else {
      completed = "";
    }
    if (filter == element.durum || filter == "all") {
      li = `<li>
            <div>
              <input type="checkbox" onclick="uptadeDurum(this)" id="${element.id}" ${completed}/>
              <label for="${element.id}" class="${completed}">${element.text}</label>
            </div>
            <div>
              <button onclick="deleteTask(${element.id})" id="${element.id}">Sil</button>
              <button onclick='uptadeTask(${element.id},"${element.text}")' id="${element.id}">Düzenle</button>
            </div>
          </li>`;
      ul.insertAdjacentHTML("beforeend", li);
    }
    addInput.value = "";
  });
}

function deleteTask(id) {
  gorevList.forEach((element, index) => {
    if (element.id == id) {
      gorevList.splice(index, 1);
    }
    createTask(document.querySelector("div.active").id);
    localStorage.setItem("gorevList", JSON.stringify(gorevList));
  });
}

function uptadeTask(id, textName) {
  isItUptade = true;
  addInput.value = textName;
  uptadeId = id;
  addInput.focus();
}

function uptadeDurum(selecetedTask) {
  let label = selecetedTask.nextElementSibling;
  let newDurum;
  if (selecetedTask.checked) {
    label.classList.add("checked");
    newDurum = "complete";
  } else {
    label.classList.remove("checked");
    newDurum = "continuing";
  }
  gorevList.forEach((el) => {
    if (el.id == selecetedTask.id) {
      el.durum = newDurum;
    }
  });
  createTask(document.querySelector("div.active").id);
  localStorage.setItem("gorevList", JSON.stringify(gorevList));
}

filters.forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelector("div.active").classList.remove("active");
    el.classList.add("active");
    createTask(el.id);
    localStorage.setItem("gorevList", JSON.stringify(gorevList));
  });
});
