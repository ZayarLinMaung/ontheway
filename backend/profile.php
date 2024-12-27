<?php
// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Include database connection
require_once('db.php');

// Check if user ID is provided
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $userID = $_GET['id'];

    // Validate user ID (assuming it's an integer, adjust as necessary)
    if (!is_numeric($userID)) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid user ID"
        ]);
        exit;
    }

    // Prepare and execute the SQL query
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
    if ($stmt) {
        $stmt->bind_param("s", $userID);
        $stmt->execute();
        $result = $stmt->get_result();

        // Check if a user was found
        if ($result && $result->num_rows > 0) {
            $user = $result->fetch_assoc();
            
            // Debugging output
            error_log(print_r($user, true)); // Check the response
            
            echo json_encode([
                "success" => true,
                "user" => $user
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "User not found"
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Database query failed"
        ]);
    }

    $conn->close();
} else {
    echo json_encode([
        "success" => false,
        "message" => "No user ID provided"
    ]);
}
?>
