<?php
include_once '../config/cors.php';
include_once '../config/db.php';
include_once '../models/post.php';

$database = new Database();
$db = $database->getConnection();

$post = new Post($db);

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $post->postTopicId = $data->postTopicId;
        $post->postAuthorId = $data->postAuthorId;
        $post->postContent = $data->postContent;
        $post->postDateOfCreation = date('Y-m-d H:i:s'); // Supondo que a data de criação é a data atual
        $post->postImage = $data->postImage;
        $post->postHasImage = $data->postHasImage;
        $post->postLikesQuantity = $data->postLikesQuantity;
        $post->postCommentsQuantity = $data->postCommentsQuantity;

        if ($post->create()) {
            echo json_encode(["message" => "Post was created."]);
        } else {
            echo json_encode(["message" => "Unable to create post."]);
        }
        break;

    case 'GET':
        if (isset($_GET['id'])) {
            $authorId = $_GET['id'];
            $stmt = $post->getPostsByAuthorId($authorId);
        } else {
            $stmt = $post->read();
        }
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($posts);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $post->postId               = $data->postId;
        $post->postTopicId          = $data->postTopicId;
        $post->postContent          = $data->postContent;
        $post->postHasImage         = $data->postHasImage;
        $post->postLikesQuantity    = $data->postLikesQuantity;
        $post->postCommentsQuantity = $data->postCommentsQuantity;

        if ($post->update()) {
            echo json_encode(["message" => "Post was updated."]);
        } else {
            echo json_encode(["message" => "Unable to update post."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));

        $post->postId = $data->postId;

        if ($post->delete()) {
            echo json_encode(["message" => "Post was deleted."]);
        } else {
            echo json_encode(["message" => "Unable to delete post."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
