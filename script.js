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
const heathyPetBtn = document.querySelector("#healthy-btn");
const calculateBMIBtn = document.querySelector("#CalcBMI-btn");
const BMI = document.querySelector("#BMI");

const tableBodyEl = document.querySelector("#tbody");

renderTableData(petArr);

//Bắt sự kiện typeInput
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

//Submit Form and get data từ Form
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
    clearInput();
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

    // Kiểm tra Id có phải duy nhất không
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must be unique!");
        isValidate = false;
        break;
      }
    }

    return isValidate;
  }
});

//clearInput
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  colorInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// renderTableData
function renderTableData(arr) {
  tableBodyEl.innerHTML = "";
  arr.forEach((item) => {
    console.log(typeof item.date);
    const row = document.createElement("tr"); // create thẻ tr
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
         <button class="btn btn-danger" onclick="deletePet('${
           item.id
         }')">Delete</button>
     </td>
</td>
  `;
    tableBodyEl.appendChild(row);
  });
}

//DeletePet
function deletePet(petId) {
  for (let i = 0; i < petArr.length; i++) {
    if (petId === petArr[i].id && confirm("Are you sure?")) {
      petArr.splice(i, 1);
      saveToStorage("petArr", petArr);
      renderTableData(petArr);
      break;
    }
  }
}

//Show Healthy Pet
let healthCheck = true;

heathyPetBtn.addEventListener("click", function () {
  if (healthCheck === true) {
    const healthyPetArr = [];
    petArr.filter(function (item) {
      if (item.vaccinated && item.dewormed && item.sterilized) {
        healthyPetArr.push(item);
      }
      return healthyPetArr;
    });

    //Hiển thị thú khỏe mạnh
    renderTableData(healthyPetArr);
    heathyPetBtn.innerText = "Show all Pet";
    healthCheck = false;
  } else {
    renderTableData(petArr);
    heathyPetBtn.innerText = "Show Healthy Pet";
    healthCheck = true;
  }
});
