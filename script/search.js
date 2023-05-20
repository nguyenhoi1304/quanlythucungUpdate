"use strict";

const findBtn = document.getElementById("find-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.querySelector("#tbody");

//Bắt đầu  sẽ hiển thị toàn bộ thú cưng
renderTableData(petArr);

function renderTableData(arr) {
  tableBodyEl.innerHTML = "";
  arr.forEach((item) => {
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
                      item.dewormed
                        ? "bi-check-circle-fill"
                        : "bi-x-circle-fill"
                    }"></i></td>
                    <td><i class="bi ${
                      item.sterilized
                        ? "bi-check-circle-fill"
                        : "bi-x-circle-fill"
                    }"></i></td>
                    <td>${new Date(item.date).getDate()}/${
      new Date(item.date).getMonth() + 1
    }/${new Date(item.date).getFullYear()}</td>
      
  </td>
    `;
    tableBodyEl.appendChild(row);
  });
}

// Thêm all các breed vào InputBreed
breedArr.forEach((item) => {
  const option = document.createElement("option");
  option.innerHTML = `${item.breed}`;
  breedInput.appendChild(option);
});

// Bắt sự kiện tìm kiếm
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;
  //includes : kiểm tra xem có tồn tại trong chuỗi hay không trả về giá trị True/ false
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  if (vaccinatedInput.checked) {
    petArrFind = petArrFind.filter(
      (pet) => pet.vaccinated === vaccinatedInput.checked
    );
  }
  if (dewormedInput.checked) {
    petArrFind = petArrFind.filter(
      (pet) => pet.dewormed === dewormedInput.checked
    );
  }
  if (sterilizedInput.checked) {
    petArrFind = petArrFind.filter(
      (pet) => pet.sterilized === sterilizedInput.checked
    );
  }
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  renderTableData(petArrFind);
});
