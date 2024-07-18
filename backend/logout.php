<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; 
session_destroy();
$response = array('success' => true);

echo json_encode($response);
?>
