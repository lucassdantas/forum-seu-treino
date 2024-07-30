<?php
include_once '../config/cors.php';
include_once '../config/db.php';
include_once '../models/comment.php';

$database = new Database();
$db = $database->getConnection();

$comment = new Comment($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));

        $comment->commentPostId = $data->commentPostId;
        $comment->commentAuthorId = $data->commentAuthorId;
        $comment->commentContent = $data->commentContent;
        $comment->commentAuthorName = $data->commentAuthorName;
        $comment->commentDateOfCreation = date('Y-m-d H:i:s');

        if ($comment->create()) {
            echo json_encode(["message" => "Comment was created."]);
        } else {
            echo json_encode(["message" => "Unable to create comment."]);
        }
        break;

    case 'GET':
        if (isset($_GET['postId'])) {
            $postId = $_GET['postId'];
            $stmt = $comment->readByPostId($postId);
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($comments);
        } else {
            $stmt = $comment->read();
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($comments);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));

        $comment->commentId = $data->commentId;
        $comment->commentPostId = $data->commentPostId;
        $comment->commentAuthorId = $data->commentAuthorId;
        $comment->commentContent = $data->commentContent;
        $comment->commentDateOfCreation = $data->commentDateOfCreation;

        if ($comment->update()) {
            echo json_encode(["message" => "Comment was updated."]);
        } else {
            echo json_encode(["message" => "Unable to update comment."]);
        }
        break;

    case 'DELETE':
        $data = $_GET['commentId'];

        $comment->commentId = $data;

        if ($comment->delete()) {
            echo json_encode(["message" => "Comment was deleted."]);
        } else {
            echo json_encode(["message" => "Unable to delete comment."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
