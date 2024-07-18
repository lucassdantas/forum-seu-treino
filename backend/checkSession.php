<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; // Inclui configuração de CORS

// Verifica se o usuário está logado
if (!isset($_SESSION['userId'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit;
}
if (isset($_SESSION['userId'])) {
    // Definir os dados do usuário novamente na sessão
    $response['loggedIn'] = true;
    $_SESSION['userId']     = $user['userId'];
    $_SESSION['userEmail']  = $user['userEmail'];
    $_SESSION['userName']   = $user['userName'];
    $response['success']    = true;
    // Definir outros dados conforme necessário
}

echo json_encode($response);
?>