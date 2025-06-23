<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

$response = ['status' => 'error', 'message' => 'An unknown error occurred.'];

try {
    // Prepare the SQL statement to select all farmers
    $stmt = $conn->prepare("SELECT farmer_id, first_name, middle_name, last_name, phone, email, village, ward, district FROM farmers");

    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $farmers = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $farmers[] = $row;
        }
        $response = ['status' => 'success', 'farmers' => $farmers];
    } else {
        $response = ['status' => 'success', 'message' => 'No farmers found.', 'farmers' => []];
    }

    $stmt->close();

} catch (Exception $e) {
    $response = ['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()];
} finally {
    if (isset($conn) && $conn) {
        $conn->close();
    }
}

echo json_encode($response);
?>