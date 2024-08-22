<?php
include_once '../config/cors.php';
include_once '../config/db.php';
include_once '../models/follower.php';

$database = new Database();
$db = $database->getConnection();

$follower = new Follower($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        $follower->followerUserFollower = $data->followerUserFollower;
        $follower->followerUserFollowed = $data->followerUserFollowed;
        $follower->followerDateOfCreation = date('Y-m-d H:i:s'); // Supondo que a data de criação é a data atual

        if ($follower->create()) {
            echo json_encode(["message" => "Follower was created."]);
        } else {
            echo json_encode(["message" => "Unable to create follower."]);
        }
        break;

    case 'GET':
        if (isset($_GET['followerUserFollower']) && isset($_GET['followerUserFollowed'])) {
            $followerUserFollower = $_GET['followerUserFollower'];
            $followerUserFollowed = $_GET['followerUserFollowed'];
            $stmt = $follower->isFollower($followerUserFollower, $followerUserFollowed);
            $isFollower = $stmt->rowCount() > 0;
            echo json_encode(['isFollower' => $isFollower]);
        } elseif (isset($_GET['followerUserFollower'])) {
            $followerUserFollower = $_GET['followerUserFollower'];
            $stmt = $follower->getFollowingList($followerUserFollower);
            $followings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($followings);
        } elseif (isset($_GET['followerUserFollowed'])) {
            $followerUserFollowed = $_GET['followerUserFollowed'];
            $stmt = $follower->getFollowersList($followerUserFollowed);
            $followers = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($followers);
        } else {
            $stmt = $follower->read();
            $followers = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($followers);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        $follower->followerUserFollower = $data->followerUserFollower;
        $follower->followerUserFollowed = $data->followerUserFollowed;
        $follower->followerDateOfCreation = $data->followerDateOfCreation;

        if ($follower->update()) {
            echo json_encode(["message" => "Follower was updated."]);
        } else {
            echo json_encode(["message" => "Unable to update follower."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));

        $follower->followerUserFollower = $data->followerUserFollower;
        $follower->followerUserFollowed = $data->followerUserFollowed;

        if ($follower->delete()) {
            echo json_encode(["message" => "Follower was deleted."]);
        } else {
            echo json_encode(["message" => "Unable to delete follower."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
} 
?>