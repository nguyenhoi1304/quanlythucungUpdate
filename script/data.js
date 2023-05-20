"use strict";

const btnImport = document.querySelector("#import-btn");
const btnExport = document.querySelector("#export-btn");
const fileInput = document.querySelector("#input-file");

btnExport.addEventListener("click", function () {
  const isExport = confirm("Bạn xác nhận chắc chắn muốn Export?");
  if (isExport) {
    saveStaticDataToFile();
  }
});

function saveStaticDataToFile() {
  var blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  //Lưu file
  saveAs(blob, "petData.json");
  //Dùng thư viện FileSaver.Js
}

btnImport.addEventListener("click", function () {
  if (!fileInput.value) {
    alert("Vui lòng chọn file muốn import!");
  } else {
    //Xác nhận import
    const isImport = confirm("Bạn xác nhận chắc chắn muốn Import?");
    if (isImport) {
      const file = fileInput.files[0];
      console.log(file);
      const reader = new FileReader();
      console.log(reader);
      //sự kiện load dữ liệu từ file lên
      reader.addEventListener(
        "load",
        function () {
          //Kiểm tra cấu trúc của file có hợp lệ với định dạng yêu cầu hay không
          //   const isValidateFile = checkFile(JSON.parse(reader.result));
          //   if (isValidateFile) {
          //Lưu dữ liệu vào localStorage
          saveToStorage("petArr", JSON.parse(reader.result));
          //Thông báo import thành công
          alert("Import thành công!");
          //   }
        },
        false
      );

      //Đoc file
      if (file) {
        reader.readAsText(file);
      }

      //Reset file input
      fileInput.value = "";
    }
  }
});
