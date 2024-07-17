<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

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
        $topic->topicDateOfCreation = date('Y-m-d H:i:s'); // Supondo que a data de criação é a data atual

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
        $topic->topicDateOfCreation = $data->topicDateOfCreation; // Supondo que a data de criação é fornecida

        if ($topic->update()) {
            echo json_encode(["message" => "Topic was updated."]);
        } else {
            echo json_encode(["message" => "Unable to update topic."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));

        $topic->topicId = $data->topicId;

        if ($topic->delete()) {
            echo json_encode(["message" => "Topic was deleted."]);
        } else {
            echo json_encode(["message" => "Unable to delete topic."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
?>
