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

$farmerId = $_SESSION['farmer_id'];

$farmName = trim($_POST['farm_name'] ?? '');
$farmSize = floatval($_POST['size_acres'] ?? 0);
$village = trim($_POST['village'] ?? '');
error_log("DEBUG: Value of \$village after trimming and defaulting: " . $village);
$cropType = trim($_POST['crop_type'] ?? '');
$status = 'Pending'; // New farms are pending verification

// Server-side validation
if (empty($farmName) || $farmSize <= 0 || empty($village)) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields correctly.']);
    exit;
}

try {
    // Fetch Ward and District from the farmers table using farmerId
    $stmtFarmerLoc = $conn->prepare("SELECT village, ward, district FROM farmers WHERE farmer_id = ?");
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

        if (empty($ward) || empty($district)) {
             throw new Exception("Farmer profile is incomplete. Ward or District missing.");
        }

    } else {
        throw new Exception("Farmer data not found for ID: " . $farmerId);
    }
    $stmtFarmerLoc->close();

    // Prepare an INSERT statement
    $stmt = $conn->prepare("INSERT INTO farms (farmer_id, farm_name, size_acres, village, ward, district, crop_type, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Failed to prepare farm insertion statement: " . $conn->error);
    }

    $stmt->bind_param("ssdsssss", $farmerId, $farmName, $farmSize, $village, $ward, $district, $cropType, $status);

    if ($stmt->execute()) {
        // Get the ID of the newly inserted farm
        $newFarmId = $conn->insert_id;

        // Fetch the details of the newly inserted farm
        $stmtFetchNewFarm = $conn->prepare("SELECT farm_id, farmer_id, farm_name, size_acres, village, ward, district, crop_type, status, date_registered FROM farms WHERE farm_id = ?");
        if (!$stmtFetchNewFarm) {
            throw new Exception("Failed to prepare fetch new farm statement: " . $conn->error);
        }
        $stmtFetchNewFarm->bind_param("i", $newFarmId); // 'i' for integer farm_id
        $stmtFetchNewFarm->execute();
        $resultNewFarm = $stmtFetchNewFarm->get_result();
        $newFarmData = $resultNewFarm->fetch_assoc();
        $stmtFetchNewFarm->close();

        // Respond with success and the new farm data
        echo json_encode(['status' => 'success', 'message' => 'Farm registered successfully!', 'farm' => $newFarmData]);

    } else {
        throw new Exception("Failed to register farm: " . $stmt->error);
    }

    $stmt->close();

} catch (Exception $e) {
    error_log("Error registering farm: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Failed to register farm. ' . $e->getMessage()]);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
?>