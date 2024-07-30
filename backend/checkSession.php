<?php
session_start();
header('Content-Type: application/json');
include_once './config/cors.php';
include_once './config/db.php';
include_once './models/user.php';

if (!isset($_SESSION['userId'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit;
}

$database = new Database();
$db = $database->getConnection();
$user = new User($db);

$userId = $_SESSION['userId'];
$stmt = $user->getUserById($userId);
$userData = $stmt->fetch(PDO::FETCH_ASSOC);

if ($userData) {
    $sessionNeedsUpdate = false;

    foreach ($userData as $key => $value) {
        if ($_SESSION[$key] !== $value) {
            $_SESSION[$key] = $value;
            $sessionNeedsUpdate = true;
        }
    }

    $response['loggedIn'] = true;
    $response['userData'] = [
        'userId' => $_SESSION['userId'],
        'userEmail' => $_SESSION['userEmail'],
        'userName' => $_SESSION['userName'],
        'userHasImage' => $_SESSION['userHasImage'],
        'userCoverImage' => $_SESSION['userCoverImage'],
        'userFollowers' => $_SESSION['userFollowers'],
        'userSubjects' => $_SESSION['userSubjects'],
        'userBirthday' => $_SESSION['userBirthday'],
        'userPhone' => $_SESSION['userPhone'],
    ];
    $response['sessionUpdated'] = $sessionNeedsUpdate;
    $response['success'] = true;
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Usuário não encontrado']);
    exit;
}

echo json_encode($response);
?>
