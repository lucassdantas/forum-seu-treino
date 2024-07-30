<?php
include_once '../config/cors.php';
include_once '../config/db.php';
include_once '../models/Routine.php';

$database = new Database();
$db = $database->getConnection();

$routine = new Routine($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        $routine->routineDescription = $data->routineDescription;
        $routine->routineDateToExecute = $data->routineDateToExecute;
        $routine->routineDateOfCreation = date('Y-m-d H:i:s'); // Data atual
        $routine->routineUserId = $data->routineUserId; // Novo campo

        if ($routine->create()) {
            echo json_encode(["message" => "Routine was created."]);
        } else {
            echo json_encode(["message" => "Unable to create routine."]);
        }
        break;

    case 'GET':
        if (isset($_GET['routineId'])) {
            $routine->routineId = $_GET['routineId'];
            $stmt = $routine->readOne();
            $routineData = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($routineData);
        } elseif (isset($_GET['routineUserId'])) {
            $routine->routineUserId = $_GET['routineUserId'];
            $stmt = $routine->readByUserId();
            $routines = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($routines);
        } else {
            $stmt = $routine->read();
            $routines = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($routines);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        $routine->routineId = $data->routineId;
        $routine->routineDescription = $data->routineDescription;
        $routine->routineDateToExecute = $data->routineDateToExecute;

        if ($routine->update()) {
            echo json_encode(["message" => "Routine was updated."]);
        } else {
            echo json_encode(["message" => "Unable to update routine."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));

        $routine->routineId = $data->routineId;

        if ($routine->delete()) {
            echo json_encode(["message" => "Routine was deleted."]);
        } else {
            echo json_encode(["message" => "Unable to delete routine."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
