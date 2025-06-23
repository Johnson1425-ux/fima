<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input
    $firstName   = trim($_POST["first_name"]);
    $middleName  = trim($_POST["middle_name"]);
    $lastName    = trim($_POST["last_name"]);
    $phone       = trim($_POST["phone"]);
    $email       = trim($_POST["email"]);
    $village     = trim($_POST["village"]);
    $ward        = trim($_POST["ward"]);
    $district    = trim($_POST["district"]);
    $password    = password_hash($_POST["password"], PASSWORD_BCRYPT);

    // Generate unique Farmer ID (e.g. FMR-45821-792)
    $timestamp = time();
    $rand      = rand(100, 999);
    $farmerId  = "FMR-" . substr($timestamp, -5) . "-" . $rand;

    // Insert into database
    $sql = "INSERT INTO farmers 
        (farmer_id, first_name, middle_name, last_name, phone, email, village, ward, district, password_hash) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("ssssssssss", 
            $farmerId, $firstName, $middleName, $lastName,
            $phone, $email, $village, $ward, $district, $password
        );

        if ($stmt->execute()) {
            echo json_encode([
                "status" => "success",
                "message" => "Farmer registered successfully",
                "farmerId" => $farmerId
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to register farmer. Please try again."
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Database error: Unable to prepare statement."
        ]);
    }

    $conn->close();
}
?>
