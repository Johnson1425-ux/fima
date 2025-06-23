document.addEventListener("DOMContentLoaded", () => {
  const popupForm = document.getElementById("popupForm");
  const addPriceBtn = document.getElementById("addPriceBtn");
  const cancelBtn = document.getElementById("cancelFormBtn");
  const priceForm = document.getElementById("priceForm");
  const priceTableBody = document.getElementById("priceTableBody");
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
    });

  let editingRow = null;

  function renderRow(data) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.crop}</td>
      <td>${data.unit}</td>
      <td>${data.price}</td>
      <td>${data.market}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;

    row.querySelector(".edit-btn").addEventListener("click", () => {
      document.getElementById("formTitle").textContent = "Edit Market Price";
      document.getElementById("crop").value = data.crop;
      document.getElementById("unit").value = data.unit;
      document.getElementById("price").value = data.price;
      document.getElementById("market").value = data.market;
      editingRow = row;
      popupForm.style.display = "flex";
    });

    row.querySelector(".delete-btn").addEventListener("click", () => {
      row.remove();
    });

    priceTableBody.appendChild(row);
  }

  priceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const crop = document.getElementById("crop").value.trim();
    const unit = document.getElementById("unit").value.trim();
    const price = document.getElementById("price").value.trim();
    const market = document.getElementById("market").value.trim();

    const priceData = { crop, unit, price, market };

    if (editingRow) {
      editingRow.innerHTML = `
        <td>${crop}</td>
        <td>${unit}</td>
        <td>${price}</td>
        <td>${market}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;

      editingRow.querySelector(".edit-btn").addEventListener("click", () => {
        document.getElementById("formTitle").textContent = "Edit Market Price";
        document.getElementById("crop").value = crop;
        document.getElementById("unit").value = unit;
        document.getElementById("price").value = price;
        document.getElementById("market").value = market;
        popupForm.style.display = "flex";
        editingRow = editingRow;
      });

      editingRow.querySelector(".delete-btn").addEventListener("click", () => {
        editingRow.remove();
      });

      editingRow = null;
    } else {
      renderRow(priceData);
    }

    popupForm.style.display = "none";
    priceForm.reset();
    document.getElementById("formTitle").textContent = "Add Market Price";
  });

  addPriceBtn.addEventListener("click", () => {
    editingRow = null;
    document.getElementById("formTitle").textContent = "Add Market Price";
    priceForm.reset();
    popupForm.style.display = "flex";
  });

  cancelBtn.addEventListener("click", () => {
    popupForm.style.display = "none";
    priceForm.reset();
  });
});
