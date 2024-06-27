<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); // Substitua pelo URL do seu frontend
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

$dsn = 'mysql:host=localhost;dbname=forum_seutreino';
$db_user = 'root';
$db_password = '';

try {
    $pdo = new PDO($dsn, $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = 'SELECT * FROM forum_user WHERE login = :login AND password = :password';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['login' => $username, 'password' => $password]);

    $response = array('success' => false);

    if ($stmt->rowCount() > 0) {
        $_SESSION['user_id'] = $username;
        $response['success'] = true;
    }

    echo json_encode($response);

} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>
