<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

$response = ['status' => 'error', 'message' => 'Unauthorized access.'];

// Ensure only logged-in Extension Officers can access this
if (!isset($_SESSION['officer_id']) || !$_SESSION['logged_in']) {
    echo json_encode($response);
    exit;
}

$officerId = $_SESSION['officer_id'];

try {
    // Prepare statement to fetch officer details (excluding password_hash for security)
    $stmt = $conn->prepare("SELECT officer_id, full_name, email, phone_number, ward, district FROM extension_officers WHERE officer_id = ?");
    if (!$stmt) {
        throw new Exception("Database prepare error: " . $conn->error);
    }

    $stmt->bind_param("s", $officerId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $officer = $result->fetch_assoc();
        $response = ['status' => 'success', 'officer' => $officer];
    } else {
        $response['message'] = 'Officer profile not found.';
    }

    $stmt->close();

} catch (Exception $e) {
    error_log("Get Officer Profile error: " . $e->getMessage());
    $response['message'] = 'An internal server error occurred while fetching profile.';
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}
echo json_encode($response);
?>