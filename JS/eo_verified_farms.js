document.addEventListener("DOMContentLoaded", () => {
    const toggleSidebarBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById('main');
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
        toggleSidebarBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
            mainContent.classList.toggle("collapsed"); 
        });
    }

    // Function to add a single verified farm row to the table
    function addVerifiedFarmToTable(farm, index) {
        const row = farmTableBody.insertRow();
        row.dataset.farmId = farm.farm_id; // Store farm_id if needed for actions

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${farm.farmer_id || ''}</td>
            <td>${farm.farm_name || ''}</td>
            <td>${farm.village || ''}, ${farm.ward || ''}, ${farm.district || ''}</td>
            <td>${farm.crop_type || ''}</td>
            <td>${farm.size_acres !== undefined ? farm.size_acres : ''}</td>
            <td>${farm.date_registered || ''}</td>
            <td>
                <button class="delete-btn" data-farm-id="${farm.farm_id}" data-farm-name="${farm.farm_name}">Delete</button>
            </td>
        `;
    }

    // Function to fetch all verified farms and display them in the table
    function fetchAndDisplayVerifiedFarms() {
        fetch('php/get_verified_farms.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success' && data.farms) {
                farmTableBody.innerHTML = '';
                if (data.farms.length > 0) {
                    data.farms.forEach((farm, index) => {
                        addVerifiedFarmToTable(farm, index);
                    });
                } else {
                    farmTableBody.innerHTML = '<tr><td colspan="8">No verified farms found.</td></tr>';
                }
            } else {
                console.error('Failed to load verified farms:', data.message || 'Unknown error.');
                farmTableBody.innerHTML = '<tr><td colspan="8">Error loading verified farms.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error fetching verified farms:', error);
            farmTableBody.innerHTML = '<tr><td colspan="8">Error loading verified farms.</td></tr>';
        });
    }

    // Event delegation for Delete buttons
    if (farmTableBody) {
        farmTableBody.addEventListener('click', function(event) {
            const target = event.target;
            
            // Handle Delete button click
            if (target.classList.contains('delete-btn')) {
                farmIdToDelete = target.dataset.farmId; // Get farmId from button
                farmNameToDelete = target.dataset.farmName; // Get farmName from button

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
                fetch('../php/delete_farm.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `farm_id=${farmIdToDelete}`
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert(data.message);
                        fetchAndDisplayVerifiedFarms(); // Re-fetch to update the table
                    } else {
                        alert(data.message || 'Failed to delete farm.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting farm:', error);
                    alert('An error occurred during deletion. Please try again.');
                })
                .finally(() => {
                    deleteConfirmPopup.style.display = 'none'; // Hide pop-up
                    farmIdToDelete = null; // Reset variable
                    farmNameToDelete = null;
                });
            }
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            deleteConfirmPopup.style.display = 'none'; // Hide pop-up
            farmIdToDelete = null; // Reset variable
            farmNameToDelete = null;
        });
    }

    // Initial load of verified farms when the page is ready
    fetchAndDisplayVerifiedFarms();

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