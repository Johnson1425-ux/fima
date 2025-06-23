document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const toggleSidebar = document.getElementById("toggleSidebar");
    const farmerFormPopup = document.getElementById("farmerForm"); // The add farmer form popup
    const addFarmerForm = document.getElementById("addFarmerForm"); // The form itself
    const farmersTableBody = document.getElementById("farmersTable"); // The tbody for farmers table

    // Custom Delete Confirmation Pop-up elements
    const deleteFarmerConfirmPopup = document.getElementById('deleteFarmerConfirmPopup');
    const confirmFarmerMessage = document.getElementById('confirmFarmerMessage');
    const confirmDeleteFarmerBtn = document.getElementById('confirmDeleteFarmerBtn');
    const cancelDeleteFarmerBtn = document.getElementById('cancelDeleteFarmerBtn');

    let farmerIdToDelete = null; // To store the ID of the farmer to be deleted
    let farmerNameToDelete = null; // To store the name for the confirmation message

    toggleSidebar.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        document.getElementById('main').classList.toggle('collapsed'); // Also collapse main content
    });

    document.getElementById("addFarmerBtn").addEventListener("click", () => {
        addFarmerForm.reset(); // Clear form on open
        farmerFormPopup.style.display = "flex";
    });

    document.getElementById("cancelFarmerFormBtn").addEventListener("click", () => {
        farmerFormPopup.style.display = "none";
        addFarmerForm.reset();
    });

    // Handle Add Farmer form submission
    addFarmerForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(addFarmerForm);

        try {
            const response = await fetch('php/add_farmer.php', { // New PHP script to add farmers
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert(data.message);
                farmerFormPopup.style.display = "none";
                addFarmerForm.reset();
                fetchAndDisplayFarmers(); // Refresh the farmer list
            } else {
                alert(data.message || 'Failed to add farmer.');
            }
        } catch (error) {
            console.error('Error adding farmer:', error);
            alert('An error occurred while adding the farmer. Please try again.');
        }
    });

    // Function to add a single farmer row to the table
    function addFarmerToTable(farmer) {
        const row = document.createElement("tr");
        row.dataset.farmerId = farmer.farmer_id; // Store farmer_id on the row

        row.innerHTML = `
            <td>${farmer.farmer_id || ''}</td>
            <td>${farmer.first_name || ''} ${farmer.middle_name ? farmer.middle_name + ' ' : ''}${farmer.last_name || ''}</td>
            <td>${farmer.phone || ''}</td>
            <td>${farmer.email || ''}</td>
            <td>${farmer.village || ''}</td>
            <td>${farmer.ward || ''}</td>
            <td>${farmer.district || ''}</td>
            <td class="action-btns">
                <button class="delete-btn" data-farmer-id="${farmer.farmer_id}" data-farmer-name="${farmer.first_name || ''} ${farmer.last_name || ''}">Delete</button>
            </td>
        `;
        farmersTableBody.appendChild(row);
    }

    // Function to fetch and display all farmers
    async function fetchAndDisplayFarmers() {
        try {
            const response = await fetch('php/get_all_farmers.php');
            const data = await response.json();

            if (data.status === 'success' && data.farmers) {
                farmersTableBody.innerHTML = '';
                if (data.farmers.length > 0) {
                    data.farmers.forEach(farmer => {
                        addFarmerToTable(farmer);
                    });
                } else {
                    farmersTableBody.innerHTML = '<tr><td colspan="8">No farmers registered yet.</td></tr>';
                }
            } else {
                console.error('Failed to load farmers:', data.message || 'No farmers found.');
                farmersTableBody.innerHTML = '<tr><td colspan="8">Error loading farmers.</td></tr>';
            }
        } catch (error) {
            console.error('Error fetching farmers:', error);
            farmersTableBody.innerHTML = '<tr><td colspan="8">Error loading farmers.</td></tr>';
        }
    }

    // Initial load of farmers when the page loads
    fetchAndDisplayFarmers();

    // Event delegation for delete buttons
    if (farmersTableBody) {
        farmersTableBody.addEventListener('click', function(event) {
            const target = event.target;
            if (target.classList.contains('delete-btn')) {
                farmerIdToDelete = target.dataset.farmerId;
                farmerNameToDelete = target.dataset.farmerName;

                if (farmerIdToDelete && farmerNameToDelete) {
                    confirmFarmerMessage.textContent = `Are you sure you want to delete farmer "${farmerNameToDelete}" (ID: ${farmerIdToDelete})? This action cannot be undone.`;
                    deleteFarmerConfirmPopup.style.display = 'flex'; // Show custom pop-up
                }
            }
        });
    }

    // Custom Delete Confirmation - Yes button
    if (confirmDeleteFarmerBtn) {
        confirmDeleteFarmerBtn.addEventListener('click', async () => {
            if (farmerIdToDelete) {
                try {
                    const response = await fetch('php/delete_farmer.php', { // New PHP script to delete farmer
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `farmer_id=${farmerIdToDelete}`
                    });
                    const data = await response.json();

                    if (data.status === 'success') {
                        alert(data.message);
                        fetchAndDisplayFarmers(); // Refresh list after deletion
                    } else {
                        alert(data.message || 'Failed to delete farmer.');
                    }
                } catch (error) {
                    console.error('Error deleting farmer:', error);
                    alert('An error occurred during deletion. Please try again.');
                } finally {
                    deleteFarmerConfirmPopup.style.display = 'none'; // Hide pop-up
                    farmerIdToDelete = null; // Reset
                    farmerNameToDelete = null;
                }
            }
        });
    }

    // Custom Delete Confirmation - Cancel button
    if (cancelDeleteFarmerBtn) {
        cancelDeleteFarmerBtn.addEventListener('click', () => {
            deleteFarmerConfirmPopup.style.display = 'none'; // Hide pop-up
            farmerIdToDelete = null; // Reset
            farmerNameToDelete = null;
        });
    }


    // Sidebar active link management
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