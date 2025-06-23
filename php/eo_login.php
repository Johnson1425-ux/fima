<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

$response = ['status' => 'error', 'message' => 'Invalid credentials.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $officerId = $_POST['officer_id'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($officerId) || empty($password)) {
        $response['message'] = 'Please enter both officer ID and password.';
        echo json_encode($response);
        exit;
    }

    try {
        // Prepare statement to fetch officer details
        $stmt = $conn->prepare("SELECT officer_id, password_hash, full_name FROM extension_officers WHERE officer_id = ?");
        if (!$stmt) {
            throw new Exception("Database prepare error: " . $conn->error);
        }

        $stmt->bind_param("s", $officerId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $officer = $result->fetch_assoc();
            // Verify the submitted password against the hashed password from the database
            if (password_verify($password, $officer['password_hash'])) {
                // Password is correct, set session variables
                $_SESSION['officer_id'] = $officer['officer_id'];
                $_SESSION['officer_name'] = $officer['full_name']; // Store name for display
                $_SESSION['logged_in'] = true;

                $response = ['status' => 'success', 'message' => 'Login successful!', 'redirect' => 'eo_dashboard.html'];
            } else {
                // Password does not match
                $response['message'] = 'Invalid Officer ID or password.';
            }
        } else {
            // Officer ID not found
            $response['message'] = 'Invalid Officer ID or password.';
        }

        $stmt->close();

    } catch (Exception $e) {
        error_log("Login error: " . $e->getMessage()); // Log the error for debugging
        $response['message'] = 'An internal server error occurred. Please try again later.';
    } finally {
        if (isset($conn) && $conn) {
            $conn->close();
        }
    }
}
echo json_encode($response);
?>