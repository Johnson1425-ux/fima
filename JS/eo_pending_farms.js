document.addEventListener('DOMContentLoaded', function() {
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main');
    const farmTableBody = document.getElementById('farmTableBody');

    // Get elements for Verify confirmation pop-up
    const verifyConfirmPopup = document.getElementById('verifyConfirmPopup');
    const verifyConfirmMessage = document.getElementById('verifyConfirmMessage');
    const confirmVerifyBtn = document.getElementById('confirmVerifyBtn');
    const cancelVerifyBtn = document.getElementById('cancelVerifyBtn');

    // Get elements for Reject confirmation pop-up
    const rejectConfirmPopup = document.getElementById('rejectConfirmPopup');
    const rejectConfirmMessage = document.getElementById('rejectConfirmMessage');
    const confirmRejectBtn = document.getElementById('confirmRejectBtn');
    const cancelRejectBtn = document.getElementById('cancelRejectBtn');

    // Variables to store farm ID for verification/rejection
    let farmIdToProcess = null;
    let farmNameToProcess = null; // To display in the confirmation message

    // Sidebar functionality
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        });
    }

    // Function to add a single pending farm row to the table
    function addPendingFarmToTable(farm, index) {
        const row = farmTableBody.insertRow();
        row.dataset.farmId = farm.farm_id; // Store farm_id for actions

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${farm.farm_id || ''}</td>
            <td>${farm.farmer_id || ''}</td>
            <td>${farm.farm_name || ''}</td>
            <td>${farm.size_acres !== undefined ? farm.size_acres : ''}</td>
            <td>${farm.village || ''}</td>
            <td>${farm.ward || ''}</td>
            <td>${farm.district || ''}</td>
            <td>${farm.crop_type || ''}</td>
            <td>${farm.date_registered || ''}</td>
            <td>
                <button class="verify-btn" data-farm-id="${farm.farm_id}" data-farm-name="${farm.farm_name}">Verify</button>
                <button class="reject-btn" data-farm-id="${farm.farm_id}" data-farm-name="${farm.farm_name}">Reject</button>
            </td>
        `;

        // Attach event listeners to the newly created buttons
        const verifyBtn = row.querySelector(`.verify-btn[data-farm-id="${farm.farm_id}"]`);
        if (verifyBtn) {
            verifyBtn.addEventListener('click', handleActionPrompt);
        }
        const rejectBtn = row.querySelector(`.reject-btn[data-farm-id="${farm.farm_id}"]`);
        if (rejectBtn) {
            rejectBtn.addEventListener('click', handleActionPrompt);
        }
    }

    // Function to handle showing the correct pop-up
    function handleActionPrompt(event) {
        farmIdToProcess = event.target.dataset.farmId;
        farmNameToProcess = event.target.dataset.farmName;
        const actionType = event.target.classList.contains('verify-btn') ? 'verify' : 'reject';

        if (actionType === 'verify') {
            verifyConfirmMessage.textContent = `Are you sure you want to verify farm "${farmNameToProcess}" (ID: ${farmIdToProcess})?`;
            verifyConfirmPopup.style.display = 'flex';
        } else if (actionType === 'reject') {
            rejectConfirmMessage.textContent = `Are you sure you want to reject farm "${farmNameToProcess}" (ID: ${farmIdToProcess})? This will move it to the rejected list.`;
            rejectConfirmPopup.style.display = 'flex';
        }
    }


    // Function to fetch and display pending farms
    function fetchAndDisplayPendingFarms() {
        fetch('./php/get_pending_farms.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success' && data.farms) {
                farmTableBody.innerHTML = ''; // Clear existing table rows
                if (data.farms.length > 0) {
                    data.farms.forEach((farm, index) => {
                        addPendingFarmToTable(farm, index);
                    });
                } else {
                    farmTableBody.innerHTML = '<tr><td colspan="10">No pending farm verification requests.</td></tr>';
                }
            } else {
                console.error('Failed to load pending farms:', data.message || 'Unknown error.');
                farmTableBody.innerHTML = '<tr><td colspan="10">Error loading pending farms.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error fetching pending farms:', error);
            farmTableBody.innerHTML = '<tr><td colspan="10">Error loading pending farms.</td></tr>';
        });
    }

    // Handle "Confirm Verify" button click
    if (confirmVerifyBtn) {
        confirmVerifyBtn.addEventListener('click', () => {
            if (farmIdToProcess) {
                const formData = new FormData();
                formData.append('farm_id', farmIdToProcess);

                fetch('php/approve_farm.php', { // **Changed to your existing approve_farm.php**
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert(data.message);
                        fetchAndDisplayPendingFarms(); // Re-fetch to update the table
                    } else {
                        alert(data.message || 'Failed to verify farm.');
                    }
                })
                .catch(error => {
                    console.error('Error verifying farm:', error);
                    alert('An error occurred during verification. Please try again.');
                })
                .finally(() => {
                    verifyConfirmPopup.style.display = 'none'; // Hide pop-up
                    farmIdToProcess = null; // Reset variables
                    farmNameToProcess = null;
                });
            }
        });
    }

    // Handle "Cancel Verify" button click
    if (cancelVerifyBtn) {
        cancelVerifyBtn.addEventListener('click', () => {
            verifyConfirmPopup.style.display = 'none'; // Hide pop-up
            farmIdToProcess = null; // Reset variables
            farmNameToProcess = null;
        });
    }

    // Handle "Confirm Reject" button click
    if (confirmRejectBtn) {
        confirmRejectBtn.addEventListener('click', () => {
            if (farmIdToProcess) {
                const formData = new FormData();
                formData.append('farm_id', farmIdToProcess);

                fetch('php/reject_farm.php', { // **Changed to your existing reject_farm.php**
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert(data.message);
                        fetchAndDisplayPendingFarms(); // Re-fetch to update the table
                    } else {
                        alert(data.message || 'Failed to reject farm.');
                    }
                })
                .catch(error => {
                    console.error('Error rejecting farm:', error);
                    alert('An error occurred during rejection. Please try again.');
                })
                .finally(() => {
                    rejectConfirmPopup.style.display = 'none'; // Hide pop-up
                    farmIdToProcess = null; // Reset variables
                    farmNameToProcess = null;
                });
            }
        });
    }

    // Handle "Cancel Reject" button click
    if (cancelRejectBtn) {
        cancelRejectBtn.addEventListener('click', () => {
            rejectConfirmPopup.style.display = 'none'; // Hide pop-up
            farmIdToProcess = null; // Reset variables
            farmNameToProcess = null;
        });
    }

    // Initial load of pending farms
    fetchAndDisplayPendingFarms();

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