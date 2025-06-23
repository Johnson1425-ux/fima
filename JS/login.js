document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const farmerId = document.getElementById("farmer_id");
    const password = document.getElementById("password");

    form.addEventListener("submit", function (e) {
        if (farmerId.value.trim() === "" || password.value.trim() === "") {
            e.preventDefault();
            showError("Please fill in both Farmer ID and Password.");
        }
    });

    // Check for ?error= in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get("error");
    if (errorParam) {
        showError(decodeURIComponent(errorParam));
    }

    function showError(message) {
        let existingPopup = document.querySelector(".error-popup");
        if (existingPopup) {
            existingPopup.remove();
        }

        const popup = document.createElement("div");
        popup.className = "error-popup";
        popup.innerHTML = `
            <div class="popup-card">
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 5000);
    }
});
