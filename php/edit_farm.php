<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);

session_start();
error_log("DEBUG: POST data for village: " . ($_POST['village'] ?? 'NOT SET'));

require 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['farmer_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in.']);
    exit;
}

$farmerId = $_SESSION['farmer_id']; // Current logged in farmer
$farmId = $_POST['farm_id'] ?? null;
$farmName = trim($_POST['farm_name'] ?? '');
$farmSize = floatval($_POST['size_acres'] ?? 0);
$village = trim($_POST['village'] ?? '');
error_log("DEBUG: Value of \$village after trimming and defaulting: " . $village);
$cropType = trim($_POST['crop_type'] ?? ''); // Get updated crop type

if (!$farmId || empty($farmName) || $farmSize <= 0 || empty($village)) {
    echo json_encode(['status' => 'error', 'message' => 'Missing or invalid farm data for update.']);
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
        echo json_encode(['status' => 'error', 'message' => 'You are not authorized to edit this farm.']);
        exit;
    }

    // Get ward and district from farmer data
    $stmtFarmerLoc = $conn->prepare("SELECT ward, district FROM farmers WHERE farmer_id = ?");
    if (!$stmtFarmerLoc) {
        throw new Exception("Failed to prepare farmer location statement: " . $conn->error);
    }
    $stmtFarmerLoc->bind_param("s", $farmerId);
    $stmtFarmerLoc->execute();
    $resultFarmerLoc = $stmtFarmerLoc->get_result();
    if ($resultFarmerLoc->num_rows === 1) {
        $farmerLoc = $resultFarmerLoc->fetch_assoc();
        $ward = $farmerLoc['ward'];
        $district = $farmerLoc['district'];
    } else {
        throw new Exception("Farmer location data not found for ID: " . $farmerId);
    }
    $stmtFarmerLoc->close();

    // Prepare the UPDATE statement
    // Update only the fields that are allowed to be edited by the farmer
    $stmt = $conn->prepare("UPDATE farms SET farm_name = ?, size_acres = ?, village = ?, ward = ?, district = ?, crop_type = ? WHERE farm_id = ?");
    if (!$stmt) {
        throw new Exception("Failed to prepare update statement: " . $conn->error);
    }

    // FIXED: Bind parameters with correct types: farm_name (s), size_acres (d), village (s), ward (s), district (s), crop_type (s), farm_id (i)
    $stmt->bind_param("sdssssi", $farmName, $farmSize, $village, $ward, $district, $cropType, $farmId);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['status' => 'success', 'message' => 'Farm updated successfully!']);
        } else {
            echo json_encode(['status' => 'success', 'message' => 'Farm data is already up to date.']);
        }
    } else {
        throw new Exception("Failed to update farm: " . $stmt->error);
    }

    $stmt->close();

} catch (Exception $e) {
    error_log("Error editing farm: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Failed to edit farm. ' . $e->getMessage()]);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>