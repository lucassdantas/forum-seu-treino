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
    $response['userData']['userProfileImage']   = $_SESSION['userProfileImage'] || '/profileImage/default/imagem-padrao-do-usuario.png' ;
    $response['userData']['userCoverImage']     = $_SESSION['userCoverImage'] || '/profileImage/default/imagem-padrao-do-usuario.png' ;
    $response['userData']['userFollowers']      = $_SESSION['userFollowers'];
    $response['userData']['userSubjects']       = $_SESSION['userSubjects'];
    $response['success']    = true;
}

echo json_encode($response);
