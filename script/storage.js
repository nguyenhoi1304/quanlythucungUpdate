// "use strict";

const toogle = document.getElementById("sidebar");
toogle.addEventListener("click", function () {
  toogle.classList.toggle("active");
});

const data1 = {
  id: "P001",
  name: "Symph",
  age: 4,
  color: "blue",
  type: "Dog",
  weight: 12,
  length: 35,
  breed: "Doberman Plnscher",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
};
const data2 = {
  id: "P002",
  name: "Charlie Tux",
  age: 5,
  color: "yellow",
  type: "Cat",
  weight: 12,
  length: 22,
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: false,
  date: new Date(),
};

const breed1 = {
  breed: "Doberman Plnscher",
  type: "Dog",
};
const breed2 = {
  breed: "Tabby",
  type: "Cat",
};

//lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
  //gán dữ liệu để test
  saveToStorage("petArr", [data1, data2]);
}

const petArr = getFromStorage("petArr") ?? [];

///////////////////////////////////////////////////

//lấy dữ liệu breedArr
// ?? nếu vế trái null or undefine thì sẽ lấy vế phải
const breedArr = getFromStorage("breedArr") ?? [];
if (!getFromStorage("breedArr")) {
  //gán dữ liệu để test
  saveToStorage("breedArr", [breed1, breed2]);
}

//Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
