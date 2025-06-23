document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage'); // For displaying messages

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            loginMessage.textContent = ''; // Clear previous messages
            loginMessage.style.color = 'red'; // Default to red for errors

            const formData = new FormData(loginForm);

            fetch('php/eo_login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    // Handle HTTP errors, though login.php returns JSON for errors too
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    loginMessage.style.color = 'green';
                    loginMessage.textContent = data.message;
                    // Redirect to the dashboard upon successful login
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        // Fallback if no redirect URL is provided by PHP
                        window.location.href = '../eo_dashboard.html';
                    }
                } else {
                    loginMessage.textContent = data.message || 'Login failed. Please try again.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                loginMessage.textContent = 'An error occurred. Please try again later.';
            });
        });
    }
});