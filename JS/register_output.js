document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("outputForm");
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const farmName = document.getElementById("farmName").value;
        const crop = document.getElementById("crop").value;
        const quantity = document.getElementById("quantity").value;
        const date = document.getElementById("date").value;

        alert(`Output Registered:\nFarm: ${farmName}\nCrop: ${crop}\nQty: ${quantity}kg\nDate: ${date}`);

        form.reset();
    });
});
