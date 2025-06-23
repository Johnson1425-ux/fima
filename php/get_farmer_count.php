<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

//if (!isset($_SESSION['officer_id'])) {
    //echo json_encode(['status' => 'error', 'message' => 'Unauthorized access.']);
  //  exit;
//}

try {
    $stmt = $conn->prepare("SELECT COUNT(farmer_id) AS total_farmers FROM farmers");
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $count = $row['total_farmers'];
    $stmt->close();

    echo json_encode(['status' => 'success', 'count' => $count]);

} catch (Exception $e) {
    error_log("Error fetching farmer count: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Failed to retrieve farmer count.']);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>