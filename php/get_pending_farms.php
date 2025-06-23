<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

// You might want to add authentication here to ensure only EOs can access this
// For example, check $_SESSION['user_role'] === 'eo' or similar.
// For now, it assumes access is controlled by the EO login.

try {
    // Select farms with 'Pending' status
    $stmt = $conn->prepare("SELECT farm_id, farmer_id, farm_name, size_acres, village, ward, district, date_registered, status FROM farms WHERE status = 'Pending' ORDER BY date_registered ASC");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }
    $stmt->execute();
    $result = $stmt->get_result();

    $pendingFarms = [];
    while ($row = $result->fetch_assoc()) {
        $pendingFarms[] = $row;
    }
    $stmt->close();

    echo json_encode(['status' => 'success', 'farms' => $pendingFarms]);

} catch (Exception $e) {
    error_log("Error fetching pending farms: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Failed to retrieve pending farms.']);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>