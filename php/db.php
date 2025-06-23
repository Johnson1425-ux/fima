<?php
$host = 'localhost';
$db   = 'fims'; // Correct database name
$user = 'root';
$pass = ''; // Use your MySQL password if set

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>