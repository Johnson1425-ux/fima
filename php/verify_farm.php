<?php
session_start();
require 'db.php'; // Adjust path

header('Content-Type: application/json');

// Authentication check: Ensure only a logged-in EO can verify
// if (!isset($_SESSION['eo_id']) || $_SESSION['user_role'] !== 'extension_officer') {
//     echo json_encode(['status' => 'error', 'message' => 'Unauthorized access.']);
//     exit;
// }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$farmIdToVerify = trim($_POST['farm_id'] ?? '');

if (empty($farmIdToVerify)) {
    echo json_encode(['status' => 'error', 'message' => 'Farm ID is required for verification.']);
    exit;
}

try {
    $stmt = $conn->prepare("UPDATE farms SET status = 'Verified' WHERE farm_id = ? AND status = 'Pending'");
    if (!$stmt) {
        throw new Exception("Failed to prepare update statement: " . $conn->error);
    }
    $stmt->bind_param("s", $farmIdToVerify); // Assuming farm_id is string, change to "i" if integer
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to verify farm: " . $stmt->error);
    }

    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Farm verified successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Farm not found or already verified.']);
    }
    $stmt->close();

} catch (Exception $e) {
    error_log("Farm verification error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'An error occurred during verification: ' . $e->getMessage()]);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>