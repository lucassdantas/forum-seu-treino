<?php
include_once '../config/cors.php';
include_once '../config/db.php';
include_once '../models/topic.php';

$database = new Database();
$db = $database->getConnection();

$topic = new Topic($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        $topic->topicName = $data->topicName;
        $topic->topicUrl = $data->topicUrl;
        $topic->topicDateOfCreation = date('Y-m-d H:i:s');
        $topic->topicStatus = '1';

        if ($topic->create()) {
            echo json_encode(["message" => "Topic was created."]);
        } else {
            echo json_encode(["message" => "Unable to create topic."]);
        }
        break;

    case 'GET':
        $stmt = $topic->read();
        $topics = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($topics);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        $topic->topicId = $data->topicId;
        $topic->topicName = $data->topicName;
        $topic->topicUrl = $data->topicUrl;
        $topic->topicDateOfCreation = $data->topicDateOfCreation;
        $topic->topicStatus = $data->topicStatus;

        if ($topic->update()) {
            echo json_encode(["message" => "Topic was updated."]);
        } else {
            echo json_encode(["message" => "Unable to update topic."]);
        }
        break;

    case 'DELETE':
        if (isset($_GET['topicId'])) {
            $topic->topicId = $_GET['topicId'];

            if ($topic->softDelete()) {
                echo json_encode(["message" => "Topic was deleted."]);
            } else {
                echo json_encode(["message" => "Unable to delete topic."]);
            }
        } else {
            echo json_encode(["message" => "No topicId provided."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}