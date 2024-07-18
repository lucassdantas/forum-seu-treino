<?php
session_start();
header('Content-Type: application/json');
include_once '.config/cors.php';
include_once '.config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

try {
    $pdo = new PDO($dsn, $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = 'SELECT * FROM forum_users WHERE userName = :username AND userPassword = :password';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['username' => $username, 'password' => $password]);

    $response = ['success' => false];

    if ($stmt->rowCount() > 0) {
        $_SESSION['user_id'] = $username;
        $response['success'] = true;
    }

    echo json_encode($response);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
