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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $officerId = $_SESSION['officer_id'];
    $currentPassword = $_POST['current_password'] ?? '';
    $newPassword = $_POST['new_password'] ?? '';

    if (empty($currentPassword) || empty($newPassword)) {
        $response['message'] = 'Please provide current and new passwords.';
        echo json_encode($response);
        exit;
    }

    if (strlen($newPassword) < 8) { // Basic server-side validation
        $response['message'] = 'New password must be at least 8 characters long.';
        echo json_encode($response);
        exit;
    }

    try {
        // 1. Fetch current hashed password from database
        $stmt = $conn->prepare("SELECT password_hash FROM extension_officers WHERE officer_id = ?");
        if (!$stmt) {
            throw new Exception("Database prepare error: " . $conn->error);
        }
        $stmt->bind_param("s", $officerId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $officer = $result->fetch_assoc();
            $storedHash = $officer['password_hash'];

            // 2. Verify current password
            if (password_verify($currentPassword, $storedHash)) {
                // Current password is correct, hash the new password
                $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

                // 3. Update the password in the database
                $updateStmt = $conn->prepare("UPDATE extension_officers SET password_hash = ? WHERE officer_id = ?");
                if (!$updateStmt) {
                    throw new Exception("Database prepare error for update: " . $conn->error);
                }
                $updateStmt->bind_param("ss", $newPasswordHash, $officerId);

                if ($updateStmt->execute()) {
                    $response = ['status' => 'success', 'message' => 'Password updated successfully.'];
                } else {
                    throw new Exception("Failed to execute password update: " . $updateStmt->error);
                }
                $updateStmt->close();
            } else {
                // Current password does not match
                $response['message'] = 'Incorrect current password.';
            }
        } else {
            $response['message'] = 'Officer not found.'; // Should not happen if session is valid
        }

        $stmt->close();

    } catch (Exception $e) {
        error_log("Change password error: " . $e->getMessage());
        $response['message'] = 'An internal server error occurred. Please try again later.';
    } finally {
        if (isset($conn) && $conn) {
            $conn->close();
        }
    }
}
echo json_encode($response);
?>