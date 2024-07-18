<?php
session_start();
header('Content-Type: application/json');
include_once '.config/cors.php'; 
include_once './config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

try {
    $pdo = new PDO($dsn, $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = 'SELECT * FROM forum_user WHERE login = :login AND password = :password';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['login' => $username, 'password' => $password]);

    $response = array('success' => false);

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $user['login'];
        $_SESSION['name'] = $user['name'];
        $_SESSION['email'] = $user['email'];
        // Definir outros dados conforme necessário

        $response['success'] = true;
    }

    echo json_encode($response);

} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}