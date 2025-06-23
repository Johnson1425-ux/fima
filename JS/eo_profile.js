document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const officerNameTopBar = document.getElementById("officerNameTopBar");

    // Profile detail elements
    const profileOfficerId = document.getElementById("profileOfficerId");
    const profileOfficerName = document.getElementById("profileOfficerName");
    const profileOfficerEmail = document.getElementById("profileOfficerEmail");
    const profileOfficerPhone = document.getElementById("profileOfficerPhone");
    const profileOfficerWard = document.getElementById("profileOfficerWard");
    const profileOfficerDistrict = document.getElementById("profileOfficerDistrict");

    // Password change form elements
    const passwordForm = document.getElementById("passwordForm");
    const currentPasswordField = document.getElementById("current_password");
    const newPasswordField = document.getElementById("new_password");
    const confirmPasswordField = document.getElementById("confirm_password");
    const passwordMessage = document.getElementById("passwordMessage");

    // Sidebar toggle functionality
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", function () {
            sidebar.classList.toggle("collapsed");
            document.getElementById('main').classList.toggle('collapsed'); // Also collapse main content
        });
    }

    // Function to fetch and display officer profile
    function fetchOfficerProfile() {
        fetch('php/get_officer_profile.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    const officer = data.officer;
                    officerNameTopBar.textContent = officer.full_name || 'Officer'; // Update top bar name
                    profileOfficerId.textContent = officer.officer_id || 'N/A';
                    profileOfficerName.textContent = officer.full_name || 'N/A';
                    profileOfficerEmail.textContent = officer.email || 'N/A';
                    profileOfficerPhone.textContent = officer.phone_number || 'N/A';
                    profileOfficerWard.textContent = officer.ward || 'N/A';
                    profileOfficerDistrict.textContent = officer.district || 'N/A';
                } else {
                    console.error('Failed to fetch officer profile:', data.message);
                    // Optionally display a message to the user
                    // officerNameTopBar.textContent = 'Error';
                }
            })
            .catch(error => {
                console.error('Error fetching officer profile:', error);
                // officerNameTopBar.textContent = 'Error';
            });
    }

    // Function to handle password change form submission
    if (passwordForm) {
        passwordForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const currentPassword = currentPasswordField.value;
            const newPassword = newPasswordField.value;
            const confirmPassword = confirmPasswordField.value;

            // Basic client-side validation
            if (newPassword.length < 8) {
                passwordMessage.textContent = "New password must be at least 8 characters long.";
                passwordMessage.style.color = "red";
                return;
            }
            if (newPassword !== confirmPassword) {
                passwordMessage.textContent = "New passwords do not match!";
                passwordMessage.style.color = "red";
                return;
            }

            // Send password change request to server
            fetch('php/change_password.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    current_password: currentPassword,
                    new_password: newPassword
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    passwordMessage.textContent = data.message;
                    passwordMessage.style.color = "green";
                    passwordForm.reset(); // Clear the form on success
                } else {
                    passwordMessage.textContent = data.message;
                    passwordMessage.style.color = "red";
                }
            })
            .catch(error => {
                console.error('Error changing password:', error);
                passwordMessage.textContent = 'An error occurred. Please try again.';
                passwordMessage.style.color = "red";
            });
        });
    }

    // Call fetchOfficerProfile when the page loads
    fetchOfficerProfile();

    // Sidebar active link management (keep this for general navigation)
    const navLinks = document.querySelectorAll('.sidebar a');
    const activePath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.href.includes(activePath)) {
            link.classList.add('active');
        }
    });
});