"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.querySelector("#tbody");
const containerForm = document.querySelector("#container-form");

renderDataTableEdit(petArr);

//RenderDataTable
function renderDataTableEdit(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th>${item.id}</th>
      <td>${item.name}</td>
       <td>${item.age}</td>
       <td>${item.type}</td>
       <td>${item.weight} kg</td>
       <td>${item.length} cm</td>
       <td>${item.breed}</td>
       <td><i class="bi-square-fill" style="color: ${item.color};"></i></td>
                  
                  <td><i class="bi ${
                    item.vaccinated
                      ? "bi-check-circle-fill"
                      : "bi-x-circle-fill"
                  }"></i></td>
                  <td><i class="bi ${
                    item.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
                  }"></i></td>
                  <td><i class="bi ${
                    item.sterilized
                      ? "bi-check-circle-fill"
                      : "bi-x-circle-fill"
                  }"></i></td>
                  <td>${new Date(item.date).getDate()}/${
      new Date(item.date).getMonth() + 1
    }/${new Date(item.date).getFullYear()}</td>
     <td>
         <button class="btn btn-danger" onclick="startEditPet('${
           item.id
         }')">Edit</button>
     </td>
</td>
        `;
    tableBodyEl.appendChild(row);
  });
}

function startEditPet(petId) {
  containerForm.classList.remove("hide");
  const pet = petArr.find((item) => item.id === petId);

  console.log(pet.color);
  console.log(colorInput.value);
  idInput.value = petId;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  renderBreed();

  breedInput.value = pet.breed;
}

typeInput.addEventListener("click", renderBreed);

function renderBreed() {
  breedInput.innerHTML = "<option> Select Breed </option>";

  //lọc và hiển thị giống loài
  if (typeInput.value === "Dog") {
    const breedDog = breedArr.filter((item) => item.type === "Dog");
    breedDog.forEach((item) => {
      const option = document.createElement("option");
      option.innerHTML = `${item.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    const breedCat = breedArr.filter((item) => item.type === "Cat");
    breedCat.forEach((item) => {
      const option = document.createElement("option");
      option.innerHTML = `${item.breed}`;
      breedInput.appendChild(option);
    });
  }
}

submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    color: colorInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    // date: new Date(),
  };

  const validate = validateData(data);
  if (validate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    data.date = petArr[index].date;

    petArr[index] = data;
    saveToStorage("petArr", petArr);

    //Ẩn form đi và hiện lại bảng dữ liệu thú cưng
    containerForm.classList.add("hide");
    renderDataTableEdit(petArr);
  }

  //ValidateData
  function validateData(data) {
    const isValidate = true;

    if (data.id.trim() === "") {
      alert("Id cannot be left blank");
      isValidate = false;
    }

    if (data.name.trim() === "") {
      alert("name cannot be left blank");
      isValidate = false;
    }

    if (isNaN(data.age)) {
      alert("Age cannot be left blank");
      isValidate = false;
    }
    if (data.type === "Select Type") {
      alert("Please select Type");
      isValidate = false;
    }

    if (1 > data.age || data.age > 15) {
      alert("Age must be between 1 and 15!");
      isValidate = false;
    }

    if (isNaN(data.weight)) {
      alert("Weight cannot be left blank");
      isValidate = false;
    }
    if (1 > data.weight || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      isValidate = false;
    }
    if (isNaN(data.length)) {
      alert("Length cannot be left blank");
      isValidate = false;
    }
    if (1 > data.length || data.length > 100) {
      alert("Length must be between 1 and 100!");
      isValidate = false;
    }

    if (data.breed === "Select Breed") {
      alert("Please select Breed");
      isValidate = false;
    }
    return isValidate;
  }
});
