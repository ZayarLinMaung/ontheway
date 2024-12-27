<?php
include 'db.php';
header("Access-Control-Allow-Origin: *");
// Allow methods like POST, GET, OPTIONS (commonly used methods)
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// Allow specific headers (Content-Type, Authorization, etc.)
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); // Send OK response for preflight requests
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];

// Hash the password before storing it
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert user into the database with the hashed password
$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hashedPassword);
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Registration successful"]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed"]);
}
?>
