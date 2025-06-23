<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['farmer_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in.']);
    exit;
}

$loggedInFarmerId = $_SESSION['farmer_id'];

try {
    $stmt = $conn->prepare("SELECT farm_id, farm_name, size_acres, village, ward, district, status FROM farms WHERE farmer_id = ? ORDER BY farm_id DESC");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }
    $stmt->bind_param("s", $loggedInFarmerId);
    $stmt->execute();
    $result = $stmt->get_result();

    $farms = [];
    while ($row = $result->fetch_assoc()) {
        $farms[] = $row;
    }
    $stmt->close();

    echo json_encode(['status' => 'success', 'farms' => $farms]);

} catch (Exception $e) {
    error_log("Error fetching farmer's farms: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Failed to retrieve farms.']);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>