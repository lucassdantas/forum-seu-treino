<?php
session_start();
header('Content-Type: application/json');
include_once '.config/cors.php';

$response = ['loggedIn' => false];

if (isset($_SESSION['user_id'])) {
    $response['loggedIn'] = true;
}

echo json_encode($response);
