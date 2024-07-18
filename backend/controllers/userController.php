<?php
include_once '../config/cors.php';
include_once '../config/db.php';
include_once '../models/post.php';

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
        $user->userProfileImage = $data->userProfileImage;
        $user->userCoverPhoto = $data->userCoverPhoto;
        $user->userFollowers = $data->userFollowers;
        $user->userSubjects = $data->userSubjects;
        $user->userPassword = $data->userPassword;

        if ($user->create()) {
            echo json_encode(["message" => "User was created."]);
        } else {
            echo json_encode(["message" => "Unable to create user."]);
        }
        break;

    case 'GET':
        if (isset($_GET['id'])) {
            $userId = $_GET['id'];
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
        $user->userProfileImage = $data->userProfileImage;
        $user->userCoverPhoto = $data->userCoverPhoto;
        $user->userFollowers = $data->userFollowers;
        $user->userSubjects = $data->userSubjects;
        $user->userPassword = $data->userPassword;

        if ($user->update()) {
            echo json_encode(["message" => "User was updated."]);
        } else {
            echo json_encode(["message" => "Unable to update user."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));

        $user->userId = $data->userId;

        if ($user->delete()) {
            echo json_encode(["message" => "User was deleted."]);
        } else {
            echo json_encode(["message" => "Unable to delete user."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
?>
