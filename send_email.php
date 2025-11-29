<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!$input || !isset($input['type'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$to = RECIPIENT_EMAIL;
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

if ($input['type'] === 'visitor') {
    // Handle visitor name submission
    $visitorName = htmlspecialchars($input['name']);
    $timestamp = date('Y-m-d H:i:s');
    
    $subject = "New Portfolio Visitor - " . $visitorName;
    $headers .= "From: " . FROM_EMAIL . "\r\n";
    
    $message = "
    <html>
    <head>
        <title>New Portfolio Visitor</title>
    </head>
    <body>
        <h2>New Visitor Alert</h2>
        <p><strong>Visitor Name:</strong> {$visitorName}</p>
        <p><strong>Visit Time:</strong> {$timestamp}</p>
        <p><strong>Source:</strong> " . SITE_NAME . "</p>
    </body>
    </html>
    ";
    
} elseif ($input['type'] === 'contact') {
    // Handle contact form submission
    $name = htmlspecialchars($input['name']);
    $email = htmlspecialchars($input['email']);
    $subject_input = htmlspecialchars($input['subject']);
    $message_input = htmlspecialchars($input['message']);
    $timestamp = date('Y-m-d H:i:s');
    
    $subject = "Portfolio Contact: " . $subject_input;
    $headers .= "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    
    $message = "
    <html>
    <head>
        <title>Portfolio Contact Form</title>
    </head>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Subject:</strong> {$subject_input}</p>
        <p><strong>Message:</strong></p>
        <p>{$message_input}</p>
        <hr>
        <p><strong>Submitted:</strong> {$timestamp}</p>
    </body>
    </html>
    ";
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid type']);
    exit;
}

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
?>