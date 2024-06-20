<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); // Substitua pelo URL do seu frontend
header('Access-Control-Allow-Credentials: true');

session_destroy();
$response = array('success' => true);

echo json_encode($response);
?>
