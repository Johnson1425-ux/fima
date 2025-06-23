document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");

    // Toggle sidebar visibility
    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
        main.classList.toggle("collapsed");
    });

    // Form submission simulation (for frontend only)
    const profileForm = document.querySelector(".profile-form");
    const passwordForm = document.querySelector(".password-form");

    profileForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Profile details saved (simulation only — no backend connected).");
    });

    passwordForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
        } else {
            alert("Password updated (simulation only — no backend connected).");
        }
    });
});
