document.addEventListener('DOMContentLoaded', function() {
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main');
    const openFormBtn = document.getElementById('openFormBtn');
    const popupForm = document.getElementById('popupForm');
    const cancelFormBtn = document.getElementById('cancelFormBtn');
    const farmForm = document.getElementById('farmForm');
    const farmTableBody = document.getElementById('farmTableBody');

    // Custom confirmation pop-up elements
    const deleteConfirmPopup = document.getElementById('deleteConfirmPopup');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

    // Variable to store the farmId that needs to be deleted
    let farmIdToDelete = null;
    let farmNameToDelete = null; // To display in the confirmation message

    // Sidebar functionality
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        });
    }

    // Handle "Add Farm" button click to show popup
    if (openFormBtn) {
        openFormBtn.addEventListener('click', function() {
            farmForm.reset();
            // Always set form for registering new farm when 'Add Farm' is clicked
            document.querySelector('#popupForm h3').textContent = 'Register Farm';
            farmForm.action = 'php/register_farm.php'; 
            popupForm.style.display = 'flex'; // Show the popup
        });
    }

    // Handle "Cancel" button click to hide popup
    if (cancelFormBtn) {
        cancelFormBtn.addEventListener('click', function() {
            popupForm.style.display = 'none'; // Hide the popup
            farmForm.reset(); // Clear the form fields
        });
    }

    // Handle farm registration form submission
    if (farmForm) {
        farmForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(farmForm); // Collect form data
            
            fetch(farmForm.action, { // Use the dynamically set action URL (php/register_farm.php)
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);
                    popupForm.style.display = 'none'; // Hide popup
                    farmForm.reset(); // Clear form
                    fetchAndDisplayFarms(); // Re-fetch and display all farms to update the table
                } else {
                    alert(data.message || 'Operation failed.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    }

    // Event delegation for Delete button
    if (farmTableBody) {
        farmTableBody.addEventListener('click', function(event) {
            const target = event.target;

            // Handle Delete button click
            if (target.classList.contains('delete-btn')) {
                const row = target.closest('tr');
                farmIdToDelete = row.dataset.farmId; // Get farm_id from row
                farmNameToDelete = row.cells[1].textContent; // Get farm name for confirmation message

                if (farmIdToDelete && farmNameToDelete) {
                    confirmMessage.textContent = `Are you sure you want to delete farm "${farmNameToDelete}" (ID: ${farmIdToDelete})? This action cannot be undone.`;
                    deleteConfirmPopup.style.display = 'flex'; // Show the custom pop-up
                }
            }
        });
    }

    // Event listeners for custom confirmation pop-up buttons
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            if (farmIdToDelete) {
                fetch('php/delete_farm.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `farm_id=${farmIdToDelete}` // Send farm_id to PHP
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'success') {
                        alert(data.message);
                        fetchAndDisplayFarms(); // Re-fetch and display all farms
                    } else {
                        alert(data.message || 'Failed to delete farm.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting farm:', error);
                    alert('An error occurred while deleting the farm. Please try again.');
                })
                .finally(() => {
                    deleteConfirmPopup.style.display = 'none'; // Hide pop-up
                    farmIdToDelete = null; // Reset variables
                    farmNameToDelete = null;
                });
            }
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            deleteConfirmPopup.style.display = 'none'; // Hide pop-up
            farmIdToDelete = null; // Reset variables
            farmNameToDelete = null;
        });
    }

    // Function to add a single farm row to the table
    function addFarmToTable(farm) {
        const row = farmTableBody.insertRow(); // Insert a new row at the end
        row.dataset.farmId = farm.farm_id; // Store farm_id on the row for future reference

        const rowIndex = farmTableBody.rows.length; // This will be the current number of rows

        row.innerHTML = `
            <td>${rowIndex}</td>
            <td>${farm.farm_name || ''}</td>
            <td>${farm.size_acres !== undefined ? farm.size_acres : ''}</td>
            <td>${farm.village || ''}</td>
            <td>${farm.ward || ''}</td>
            <td>${farm.district || ''}</td>
            <td><span class="status-badge ${farm.status.toLowerCase()}">${farm.status || 'N/A'}</span></td>
            <td>
                <button class="delete-btn">Delete</button>
            </td>
        `;
    }

    // Function to fetch all farms and display them in the table
    function fetchAndDisplayFarms() {
        fetch('php/get_my_farms.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success' && data.farms) {
                farmTableBody.innerHTML = ''; // Clear existing table rows
                data.farms.forEach((farm) => {
                    addFarmToTable(farm); // Pass the entire farm object
                });
            } else {
                console.error('Failed to load farms:', data.message || 'No farms found.');
                // Colspan adjusted to 8 columns (7 data columns + 1 action column)
                farmTableBody.innerHTML = '<tr><td colspan="8">No farms registered yet.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error fetching farms:', error);
            // Colspan adjusted to 8 columns
            farmTableBody.innerHTML = '<tr><td colspan="8">Error loading farms.</td></tr>';
        });
    }

    // Call fetchAndDisplayFarms when the page loads
    fetchAndDisplayFarms();

    // Event listener for sidebar links to manage active class
    const navLinks = document.querySelectorAll('.sidebar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const activePath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.href.includes(activePath)) {
            link.classList.add('active');
        }
    });

});