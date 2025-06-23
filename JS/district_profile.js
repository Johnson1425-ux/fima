document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");
  const main = document.getElementById("main");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    main.classList.toggle("collapsed");
  });

  const form = document.getElementById("changePasswordForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");
    const currentPassword = inputs[0].value;
    const newPassword = inputs[1].value;
    const confirmPassword = inputs[2].value;

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    // Simulate success message
    alert("Password updated successfully.");
    form.reset();
  });
});
