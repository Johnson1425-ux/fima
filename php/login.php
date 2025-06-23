<?php
session_start();
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $farmer_id = trim($_POST['farmer_id']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT * FROM farmers WHERE farmer_id = ?");
    $stmt->bind_param("s", $farmer_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $farmer = $result->fetch_assoc();

        if (password_verify($password, $farmer['password_hash'])) {
            $_SESSION['farmer_id'] = $farmer['farmer_id'];
            file_put_contents(__DIR__ . '/session_from_login.log', print_r($_SESSION, true));
            header("Location: ../dashboard.html"); // Stay within php folder
            exit;
        } else {
            header("Location: ../login.html?error=Incorrect+ID+or+Password");
            exit;
        }
    } else {
        header("Location: ../login.html?error=Incorrect+ID+or+Password");
        exit;
    }
}
?>
