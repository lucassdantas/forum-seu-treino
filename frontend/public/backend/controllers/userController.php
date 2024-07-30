<?php
include_once '../config/cors.php';
include_once '../config/db.php';
include_once '../models/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        // Implementação do método POST, se necessário
        break;

    case 'GET':
        if (isset($_GET['id'])) {
            $userId = intval($_GET['id']);
            $stmt = $user->getUserById($userId);
            $userData = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($userData);
        } else {
            $stmt = $user->read();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        }
        break;
        
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        $user->userId = $data->userId;
        $user->userName = $data->userName;
        $user->userEmail = $data->userEmail;
        $user->userBirthday = $data->userBirthday;
        $user->userPhone = $data->userPhone;
        $user->userPassword = isset($data->userPassword) ? $data->userPassword : null;
        $user->userHasImage = isset($data->userHasImage) ? $data->userHasImage : null;

        if ($user->update()) {
            echo json_encode(["message" => "User was updated.", "updatedUser" => $user, 'success' => true]);
        } else {
            echo json_encode(["message" => "Unable to update user."]);
        }
        break;

    case 'DELETE':
        // Implementação do método DELETE, se necessário
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
?>
