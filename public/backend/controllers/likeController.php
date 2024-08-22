<?php
include_once '../config/cors.php';
include_once '../config/db.php';
include_once '../models/like.php';

$database = new Database();
$db = $database->getConnection();

$like = new Like($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        $like->likeAuthorId = $data->likeAuthorId;
        $like->likePostId = $data->likePostId;

        if ($like->create()) {
            echo json_encode(["message" => "Like was created."]);
        } else {
            echo json_encode(["message" => "Unable to create like."]);
        }
        break;

    case 'GET':
        $stmt = $like->read();
        $like = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($like);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));

        $like->likeAuthorId = $data->likeAuthorId;
        $like->likePostId = $data->likePostId;

        if ($like->delete()) {
            echo json_encode(["message" => "Like was deleted."]);
        } else {
            echo json_encode(["message" => "Unable to delete like."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
