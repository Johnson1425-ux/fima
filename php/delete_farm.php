<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

session_start();
require 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['farmer_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in.']);
    exit;
}

$farmerId = $_SESSION['farmer_id']; // Current logged in farmer
$farmId = $_POST['farm_id'] ?? null;

if (!$farmId) {
    echo json_encode(['status' => 'error', 'message' => 'Farm ID is missing.']);
    exit;
}

try {
    // IMPORTANT: Verify that this farm belongs to the logged-in farmer
    $checkStmt = $conn->prepare("SELECT farmer_id FROM farms WHERE farm_id = ?");
    if (!$checkStmt) {
        throw new Exception("Failed to prepare farm ownership check: " . $conn->error);
    }
    $checkStmt->bind_param("i", $farmId);
    $checkStmt->execute();
    $resultCheck = $checkStmt->get_result();
    $farmOwnerData = $resultCheck->fetch_assoc();
    $checkStmt->close();

    if (!$farmOwnerData || $farmOwnerData['farmer_id'] !== $farmerId) {
        echo json_encode(['status' => 'error', 'message' => 'You are not authorized to delete this farm.']);
        exit;
    }

    // Prepare the DELETE statement
    $stmt = $conn->prepare("DELETE FROM farms WHERE farm_id = ?");
    if (!$stmt) {
        throw new Exception("Failed to prepare delete statement: " . $conn->error);
    }

    $stmt->bind_param("i", $farmId); // 'i' for integer farm_id

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Farm deleted successfully!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Farm not found or already deleted.']);
        }
    } else {
        throw new Exception("Failed to delete farm: " . $stmt->error);
    }

    $stmt->close();

} catch (Exception $e) {
    error_log("Error deleting farm: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Failed to delete farm. ' . $e->getMessage()]);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>