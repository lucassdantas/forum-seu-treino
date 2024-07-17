<?php
$request = $_SERVER['REQUEST_URI'];
$request = explode('/', trim($request, '/'));

$resource = $request[0];

switch ($resource) {
    case 'users':
        require __DIR__ . '/controllers/userController.php';
        break;
    case 'topics':
        require __DIR__ . '/controllers/topicController.php';
        break;
    case 'posts':
        require __DIR__ . '/controllers/postController.php';
        break;
    case 'comments':
        require __DIR__ . '/controllers/commentController.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(["message" => "Resource not found"]);
        break;
}
?>
