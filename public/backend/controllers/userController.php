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
        $data = json_decode(file_get_contents("php://input"));

        $user->userName = $data->userName;
        $user->userEmail = $data->userEmail;
        $user->userBirthday = $data->userBirthday;
        $user->userPhone = $data->userPhone;
        $user->userPassword = $data->userPassword;
        $user->userHasImage = isset($data->userHasImage) ? $data->userHasImage : 0;
        $user->userRole = $data->userRole!='admin'? $data->userRole:'user';
        // Verifica se o e-mail já existe
        if ($user->emailExists()) {
            echo json_encode(["message" => "Já existe um usuário com este e-mail.", 'success' => false]);
        } else {
            if ($user->create()) {
                echo json_encode(["message" => "Usuário criado com sucesso.", "userId" => $user->userId, 'success' => true]);
            } else {
                echo json_encode(["message" => "Não foi possível criar o usuário.", 'success' => false]);
            }
        }
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
        $user->userRole = $data->userRole!='admin'? $data->userRole:'user';

        if ($user->update()) {
            echo json_encode(["message" => "User was updated.", "updatedUser" => $user, 'success' => true]);
        } else {
            echo json_encode(["message" => "Unable to update user."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));

        $user->userId = $data->userId;

        if ($user->delete()) {
            echo json_encode(["message" => "User was deactivated.", 'success' => true]);
        } else {
            echo json_encode(["message" => "Unable to deactivate user.", 'success' => false]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
