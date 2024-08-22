<?php
include_once '../config/cors.php';
include_once '../config/db.php'; // Inclua a conexão com o banco de dados

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['postId'])) {
    $postId = $_GET['postId'];
    $targetDir = "../../postImage/".$postId.'/';
    $targetFile = $targetDir . $postId . ".jpg";
    
    // Verifique se a pasta existe, caso contrário, crie-a
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    // Mova o arquivo carregado para o diretório de destino
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        echo json_encode(["message" => "Image uploaded successfully."]);
    } else {
        echo json_encode(["message" => "Error uploading image."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>
