<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php'; 
include_once './config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

try {
    $database = new Database();
    $pdo = $database->getConnection();

    $sql  = 'SELECT * FROM forum_users WHERE userEmail = :login AND userPassword = :password';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['login' => $username, 'password' => $password]);

    $response = array('success' => false);

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $_SESSION['userId']     = $user['userId'];
        $_SESSION['userName']   = $user['userName'];
        $_SESSION['userEmail']  = $user['userEmail'];
        $response['success']    = true;
    }

    echo json_encode($response);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
}
?>
