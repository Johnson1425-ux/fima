document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });

    // Function to fetch and display dashboard counts
    async function fetchDashboardCounts() {
        try {
            // Fetch Farmer Count
            const farmerCountResponse = await fetch('php/get_farmer_count.php');
            const farmerCountData = await farmerCountResponse.json();
            if (farmerCountData.status === 'success') {
                document.getElementById("farmerCount").textContent = farmerCountData.count;
            } else {
                console.error('Failed to fetch farmer count:', farmerCountData.message);
                document.getElementById("farmerCount").textContent = '--';
            }

            // Fetch Farm Count (Total Verified Farms)
            const farmCountResponse = await fetch('php/get_verified_farm_count.php');
            const farmCountData = await farmCountResponse.json();
            if (farmCountData.status === 'success') {
                document.getElementById("farmCount").textContent = farmCountData.count;
            } else {
                console.error('Failed to fetch farm count:', farmCountData.message);
                document.getElementById("farmCount").textContent = '--';
            }

            // Fetch Pending Verification Requests Count
            const verificationCountResponse = await fetch('php/get_pending_farm_count.php');
            const verificationCountData = await verificationCountResponse.json();
            if (verificationCountData.status === 'success') {
                document.getElementById("verificationCount").textContent = verificationCountData.count;
            } else {
                console.error('Failed to fetch verification count:', verificationCountData.message);
                document.getElementById("verificationCount").textContent = '--';
            }

        } catch (error) {
            console.error('Error fetching dashboard counts:', error);
            document.getElementById("farmerCount").textContent = '--';
            document.getElementById("farmCount").textContent = '--';
            document.getElementById("verificationCount").textContent = '--';
        }
    }

    // Function to fetch and display officer ID using get_officer_profile.php
    async function fetchOfficerId() {
        try {
            const officerProfileResponse = await fetch('php/get_officer_profile.php');
            const officerProfileData = await officerProfileResponse.json();
            // Check if the status is 'success' and the 'officer' object exists and contains 'officer_id'
            if (officerProfileData.status === 'success' && officerProfileData.officer && officerProfileData.officer.officer_id) {
                document.querySelector(".officer-id").textContent = officerProfileData.officer.officer_id;
            } else {
                console.error('Failed to fetch officer ID or officer_id not found in profile data:', officerProfileData.message || 'Unknown error');
                document.querySelector(".officer-id").textContent = 'Officer ID: N/A';
            }
        } catch (error) {
            console.error('Error fetching officer profile:', error);
            document.querySelector(".officer-id").textContent = 'Officer ID: Error';
        }
    }

    // Call the functions to fetch counts and officer ID when the page loads
    fetchDashboardCounts();
    fetchOfficerId();

    // Event listener for sidebar links (if applicable, ensure consistent behavior across pages)
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