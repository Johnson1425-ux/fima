document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("php/register.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById("popupFarmerId").innerText = data.farmerId;
            document.getElementById("successPopup").style.display = "block";

            // Redirect after 4 seconds
            setTimeout(() => {
                window.location.href = "login.html";
            }, 4000);
        } else {
            alert("Registration failed. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});
