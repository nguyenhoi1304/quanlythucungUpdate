"use strict";

const inputBreed = document.querySelector("#input-breed");
const inputType = document.querySelector("#input-type");
const btnSubmit = document.querySelector("#submit-btn");
const tableBodyEl = document.querySelector("#tbody");

//Hiển thị danh sách
renderTableBreed(breedArr);

btnSubmit.addEventListener("click", function () {
  const data = {
    breed: inputBreed.value,
    type: inputType.value,
  };

  const isValidate = validateData(data);

  if (isValidate) {
    //thêm dữ liệu vào mảng breed
    breedArr.push(data);
    //Lưu dữ liệu lại
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
    deleteForm();
  }

  function validateData(data) {
    const isValidate = true;
    if (data.breed === "") {
      alert("Breed cannot be left blank");
      isValidate = false;
    }
    if (data.type === "Select Type") {
      alert("Please select Type");
      isValidate = false;
    }
    return isValidate;
  }
});

// RenderTableData;
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";
  breedArr.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th>${index + 1}</th>
        <td>${item.breed}</td>
        <td>${item.type}</td>
       <td>
            <button class="btn btn-danger" onclick="deleteBreed('${
              item.breed
            }')">Delete</button>
       </td>
        `;
    tableBodyEl.appendChild(row);
  });
}

function deleteForm() {
  inputBreed.value = "";
  inputType.value = "Select Type";
}

//DeleteBreed
function deleteBreed(breed) {
  const isDelete = confirm("Are you sure?");
  if (isDelete) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        //xóa dòng dữ liệu khỏi mảng
        breedArr.splice(i, 1);
        //cập nhật lại dữ liệu mới dưới local storage
        saveToStorage("breedArr", breedArr);
        //gọi hàm hiển thị lại
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
