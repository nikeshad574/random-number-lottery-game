// holds data from local storage
var personsData = {};
// total person count of local storage
var totalPersons = 0;

//from home.html
const homeInputName = document.getElementById("name");
const inputDisplayArea = document.querySelector(".input-display-area");
const Rollnum = document.getElementById("Rollnum");
const Rollname = document.getElementById("Rollname");
const nameList = document.getElementById("lists");

function updateLocal() {
  //update local
  localStorage.setItem("personsData", JSON.stringify(personsData));
  retrieveLocal();
}

function retrieveLocal() {
  //retrieve local
  const storedData = localStorage.getItem("personsData");
  personsData = JSON.parse(storedData);

  if (!personsData) {
    updateList();
    personsData = {};
  }

  //update count from local
  totalPersons = Object.keys(personsData).length;

  updateList();
}

function updateList() {
  nameList.innerHTML = "";
  for (let key in personsData) {
    // if (personsData[key].id === num) {
    //   return true;
    // }
    nameList.innerHTML += `<li>
                                <p>${personsData[key].id}</p>
                                <p>${personsData[key].name}</p>
                                <span onclick="deleteOne(${key})">remove</span>
                            </li>`;
  }

  if (totalPersons == 0) {
    nameList.innerHTML = "<li>feeling so empty</li>";
  }
}

homeInputName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addInputName();
  }
});

function addInputName() {
  if (homeInputName.value.length > 0) {
    inputDisplayArea.classList.remove("input-active");
    inputDisplayArea.classList.add("display-active");

    var random = 0;
    Rollname.textContent = homeInputName.value;

    let interval = setInterval(() => {
      random = Math.floor(Math.random() * 100);
      Rollnum.textContent = random;
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      let id = condtnRandomizer(random, 100);

      Rollnum.textContent = id;
      personsData[totalPersons + 1] = { id: id, name: homeInputName.value };

      updateLocal();

      setTimeout(() => {
        homeInputName.value = "";
        inputDisplayArea.classList.add("input-active");
        inputDisplayArea.classList.remove("display-active");
        homeInputName.focus();
      }, 2500);
    }, 3000);
  }
}

function localHasNumber(num) {
  for (let key in personsData) {
    if (personsData[key].id === num) {
      return true;
    }
  }
  return false;
}

//conditional randomizer
function condtnRandomizer(num, limit) {
  if (localHasNumber(num)) {
    num = Math.floor(Math.random() * limit);
    condtnRandomizer(num, limit);
  }
  return num;
}

//deleting only one
function deleteOne(id) {
  delete personsData[id];
  updateLocal();
}

//admin function
function resetAll() {
  personsData = {};
  updateLocal();
}

retrieveLocal();
