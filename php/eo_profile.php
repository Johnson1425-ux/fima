<?php
session_start();

// Check if the officer is NOT logged in or session is invalid
if (!isset($_SESSION['officer_id']) || !$_SESSION['logged_in']) {
    // Redirect to the login page if not authenticated
    header("Location: login.html"); 
    exit();
}

// If authenticated, include the content of the HTML file
include('eo_profile.html'); // Adjust path if eo_profile.html is in a different directory
?>