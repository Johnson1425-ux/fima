<?php
session_start();
require 'db.php'; // Adjust path as necessary, relative to this script

header('Content-Type: application/json');

// Ensure only logged-in Extension Officers can access this
// You might want to check for a specific $_SESSION['officer_id'] or role
//if (!isset($_SESSION['officer_id'])) { // Assuming 'officer_id' is set in session upon EO login
   // echo json_encode(['status' => 'error', 'message' => 'Unauthorized access.']);
//exit;
//}

// Check if farm_id is provided via POST
if (!isset($_POST['farm_id']) || empty($_POST['farm_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Farm ID not provided.']);
    exit;
}

$farmId = $_POST['farm_id'];

try {
    // Prepare the SQL statement to update the farm's status to 'Verified'
    $stmt = $conn->prepare("UPDATE farms SET status = 'Verified' WHERE farm_id = ?");

    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }

    $stmt->bind_param("i", $farmId); // 'i' for integer, assuming farm_id is an integer

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Farm approved successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Farm not found or already verified.']);
        }
    } else {
        throw new Exception("Failed to execute statement: " . $stmt->error);
    }

    $stmt->close();

} catch (Exception $e) {
    error_log("Error approving farm: " . $e->getMessage()); // Log detailed error
    echo json_encode(['status' => 'error', 'message' => 'Failed to approve farm. Please try again.']);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>