<?php
session_start();
require 'db.php'; // Adjust path as necessary, relative to this script

header('Content-Type: application/json');

// Ensure only logged-in Extension Officers can access this
//if (!isset($_SESSION['officer_id'])) { // Assuming 'officer_id' is set in session upon EO login
    //echo json_encode(['status' => 'error', 'message' => 'Unauthorized access.']);
    //exit;
//}

try {
    // Select all necessary farm details where status is 'Verified'
    $stmt = $conn->prepare("SELECT farm_id, farmer_id, farm_name, size_acres, village, ward, district, crop_type, date_registered FROM farms WHERE status = 'Verified' ORDER BY date_registered DESC");

    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $farms = [];
    while ($row = $result->fetch_assoc()) {
        $farms[] = $row;
    }
    $stmt->close();

    echo json_encode(['status' => 'success', 'farms' => $farms]);

} catch (Exception $e) {
    error_log("Error fetching verified farms: " . $e->getMessage()); // Log detailed error
    echo json_encode(['status' => 'error', 'message' => 'Failed to retrieve verified farms.']);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>