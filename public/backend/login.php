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

    // Prepare a consulta para buscar o usuário pelo e-mail
    $sql = 'SELECT * FROM forum_users WHERE userEmail = :login';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['login' => $username]);

    $response = ['success' => false];

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verifica se a senha fornecida corresponde à senha hasheada armazenada
        if (password_verify($password, $user['userPassword'])) {
            // Armazena as informações do usuário na sessão
            $_SESSION['userId'] = $user['userId'];
            $_SESSION['userName'] = $user['userName'];
            $_SESSION['userEmail'] = $user['userEmail'];
            $_SESSION['userFollowers'] = $user['userFollowers'];
            $_SESSION['userSubjects'] = $user['userSubjects'];
            $_SESSION['userHasImage'] = $user['userHasImage'];
            $_SESSION['userBirthday'] = $user['userBirthday'];
            $_SESSION['userCoverImage'] = $user['userCoverImage'];
            $_SESSION['userPhone'] = $user['userPhone'];
            $_SESSION['userRole'] = $user['userRole'];

            $response['userData'] = [
                'userId' => $_SESSION['userId'],
                'userName' => $_SESSION['userName'],
                'userEmail' => $_SESSION['userEmail'],
                'userFollowers' => $_SESSION['userFollowers'],
                'userSubjects' => $_SESSION['userSubjects'],
                'userHasImage' => $_SESSION['userHasImage'],
                'userBirthday' => $_SESSION['userBirthday'],
                'userCoverImage' => $_SESSION['userCoverImage'],
                'userPhone' => $_SESSION['userPhone'],
                'userRole' => $_SESSION['userRole'],
            ];

            $response['success'] = true;
        }
    }

    echo json_encode($response);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
}
?>
