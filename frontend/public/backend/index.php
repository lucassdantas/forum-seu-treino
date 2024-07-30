<?php
include_once '.config/cors.php';
include_once '.config/db.php';

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$uriSegments = explode('/', parse_url($requestUri, PHP_URL_PATH));
echo $urlSegments;
if (isset($uriSegments[0])) { // Ajustando o índice para 'backend'
    switch ($uriSegments[0]) {
        case 'users':
            include_once 'controllers/userController.php';
            break;
        case 'topics':
            include_once 'controllers/topicController.php';
            break;
        case 'posts':
            include_once 'controllers/postController.php';
            break;
        case 'comments':
            include_once 'controllers/commentController.php';
            break;
        case 'likes':
            include_once 'controllers/likeController.php';
            break;
        default:
            http_response_code(404);
            echo json_encode(['message' => 'Endpoint not found']);
            break;
    }
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Endpoint not found']);
}
?>
