<?php
// Enable CORS - must be at the top of the file
header("Access-Control-Allow-Origin: *");  // Allow all origins
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Allow the specified methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allow the specified headers
header("Content-Type: application/json");  // Set content type

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
require_once 'db.php'; // Ensure this file contains your $conn initialization

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check for invalid JSON
if ($data === null) {
    echo json_encode(["success" => false, "message" => "Invalid data format"]);
    exit();
}

// Extract username, password, and rememberMe
$username = $data["username"];
$password = $data["password"];
$rememberMe = isset($data["rememberMe"]) ? $data["rememberMe"] : false;

// Prepare SQL query
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Database query preparation failed"]);
    exit();
}

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        // Login successful
        if ($rememberMe) {
            // Set a secure, httpOnly cookie for "Remember Me"
            $token = bin2hex(random_bytes(16)); // Generate a random token
            $expiry = time() + (30 * 24 * 60 * 60); // 30 days
            setcookie("remember_me", $token, $expiry, "/", "", false, true);

            // Save the token to the database
            $updateTokenStmt = $conn->prepare("UPDATE users SET remember_token = ?, token_expiry = ? WHERE id = ?");
            if ($updateTokenStmt) {
                $updateTokenStmt->bind_param("ssi", $token, date('Y-m-d H:i:s', $expiry), $user['id']);
                $updateTokenStmt->execute();
                $updateTokenStmt->close();
            }
        }

        echo json_encode(["success" => true, "message" => "Login successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid username or password"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
}

$stmt->close();
$conn->close();
?>
