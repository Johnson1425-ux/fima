document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addFarmerBtn");
    const popup = document.getElementById("farmerPopup");
    const closeBtn = document.getElementById("closePopup");
    const form = document.getElementById("farmerForm");
    const tableBody = document.getElementById("farmerTableBody");
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");
    const confirmDeletePopup = document.getElementById("confirmDeletePopup");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
    let rowToDelete = null; // To store the row that is about to be deleted

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
    });

    addBtn.addEventListener("click", () => {
        popup.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        form.reset();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll("input");
        const name = inputs[0].value;
        const phone = inputs[1].value;
        const ward = inputs[2].value;
        const farmerID = `FRM-${Math.floor(Math.random() * 10000)}`;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${farmerID}</td>
            <td>${name}</td>
            <td>${phone}</td>
            <td>${ward}</td>
            <td class="action-buttons">
                <button class="delete-btn">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
        popup.style.display = "none";
        form.reset();
    });

    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            rowToDelete = e.target.closest("tr");
            confirmDeletePopup.style.display = "flex"; 
        }
    });

    confirmDeleteBtn.addEventListener("click", () => {
        if (rowToDelete) {
            rowToDelete.remove();
            rowToDelete = null;
        }
        confirmDeletePopup.style.display = "none";
    });

    cancelDeleteBtn.addEventListener("click", () => {
        rowToDelete = null;
        confirmDeletePopup.style.display = "none";
    });
});