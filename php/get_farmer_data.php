<?php
session_start(); // Start the session to access $_SESSION variables
require 'db.php';

// Set header to indicate JSON content
header('Content-Type: application/json');

// Check if farmer_id is set in the session
if (!isset($_SESSION['farmer_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in.']);
    exit;
}

$loggedInFarmerId = $_SESSION['farmer_id'];

try {
    // Prepare statement to fetch farmer details
    $stmt = $conn->prepare("SELECT farmer_id, first_name, middle_name, last_name, phone, email, village, ward, district FROM farmers WHERE farmer_id = ?");
    
    if (!$stmt) {
        throw new Exception("Failed to prepare statement: " . $conn->error);
    }
    
    $stmt->bind_param("s", $loggedInFarmerId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $farmerData = $result->fetch_assoc();
        $stmt->close();

        // Fetch the count of farms for this farmer
        // IMPORTANT: Replace 'farms' with your actual farms table name if different
        // And 'farmer_id' with the actual column name that links to the farmer in the farms table
        $stmtFarms = $conn->prepare("SELECT COUNT(*) AS farm_count FROM farms WHERE farmer_id = ?");
        
        if (!$stmtFarms) {
            throw new Exception("Failed to prepare farm count statement: " . $conn->error);
        }
        
        $stmtFarms->bind_param("s", $loggedInFarmerId);
        $stmtFarms->execute();
        $resultFarms = $stmtFarms->get_result();
        $farmCountData = $resultFarms->fetch_assoc();
        $farmCount = $farmCountData['farm_count'];
        $stmtFarms->close();

        // Add the farm count to the farmerData array before encoding
        $farmerData['farm_count'] = $farmCount;

        // Prepare the JSON output string
        $json_output = json_encode(['status' => 'success', 'data' => $farmerData]);

        // --- TEMPORARY DEBUGGING CODE: ADD THESE TWO LINES ---
        // This will write the exact JSON string to a file on your server
        // The file will be in the same directory as get_farmer_data.php (e.g., C:\xampp\htdocs\FIMS\php\)
        $log_file = __DIR__ . '/temp_json_output.log'; 
        file_put_contents($log_file, $json_output);
        // --- END TEMPORARY DEBUGGING CODE ---

        // Output successful JSON response to the browser
        echo $json_output; 

    } else {
        // Farmer ID not found in database (shouldn't happen if session is valid)
        $stmt->close();
        echo json_encode(['status' => 'error', 'message' => 'Farmer data not found.']);
    }

} catch (mysqli_sql_exception $e) {
    // Catch database-specific exceptions
    error_log("Database Error in get_farmer_data.php: " . $e->getMessage()); // Log the error for server-side debugging
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Catch general exceptions (e.g., prepare statement failure)
    error_log("General Error in get_farmer_data.php: " . $e->getMessage()); // Log the error
    echo json_encode(['status' => 'error', 'message' => 'An unexpected error occurred: ' . $e->getMessage()]);
} finally {
    // Close the database connection in all cases
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}

?>