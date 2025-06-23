<?php
session_start();
require 'db.php'; // Adjust path as necessary

header('Content-Type: application/json');

//if (!isset($_SESSION['officer_id'])) {
    //echo json_encode(['status' => 'error', 'message' => 'Unauthorized access.']);
  //  exit;
//}

try {
    $stmt = $conn->prepare("SELECT COUNT(farm_id) AS total_pending FROM farms WHERE status = 'Pending'");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['total_pending'];
    $stmt->close();

    echo json_encode(['status' => 'success', 'count' => $count]);

} catch (Exception $e) {
    error_log("Error fetching pending farm count: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Failed to retrieve pending farm count.']);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>