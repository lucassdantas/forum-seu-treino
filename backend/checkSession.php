<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; 

if (!isset($_SESSION['userId'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit;
}
if (isset($_SESSION['userId'])) {
    $response['loggedIn'] = true;
    $response['userData']['userId']             = $_SESSION['userId'];
    $response['userData']['userEmail']          = $_SESSION['userEmail'];
    $response['userData']['userName']           = $_SESSION['userName'];
    $response['userData']['userHasImage']       = $_SESSION['userHasImage'] ;
    $response['userData']['userCoverImage']     = $_SESSION['userCoverImage'] ;
    $response['userData']['userFollowers']      = $_SESSION['userFollowers'];
    $response['userData']['userSubjects']       = $_SESSION['userSubjects'];
    $response['userData']['userPhone']       = $_SESSION['userPhone'];
    $response['success']    = true;
}

echo json_encode($response);
