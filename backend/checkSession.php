<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; // Inclui configuração de CORS

// Verifica se o usuário está logado
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit;
}
if (isset($_SESSION['user_id'])) {
    // Definir os dados do usuário novamente na sessão
    $response['loggedIn'] = true;
    $response['user_id'] = $_SESSION['user_id'];
    $response['username'] = $_SESSION['username'];
    $response['name'] = $_SESSION['name'];
    $response['email'] = $_SESSION['email'];
    // Definir outros dados conforme necessário
}

echo json_encode($response);
?>