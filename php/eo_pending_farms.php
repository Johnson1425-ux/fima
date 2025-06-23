<?php
session_start(); // Start the session

// Check if the officer is NOT logged in or session is invalid

if (!isset($_SESSION['officer_id']) || !$_SESSION['logged_in'])) {
    // Redirect to the login page if not authenticated
    header("Location: login.html"); // Adjust path if login.html is in a different directory
    exit(); // Stop execution to prevent the HTML from being displayed
}

// If authenticated, include the content of the HTML file
include('eo_pending_farms.html'); // Adjust path if eo_pending_farms.html is in a different directory
?>