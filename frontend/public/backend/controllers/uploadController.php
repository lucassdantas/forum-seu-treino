<?php
include_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $targetDir = "../../profileImage/";
    $userId = $_POST['userId'];
    $targetFile = $targetDir . $userId . "/" . $userId . ".jpg";

    if (!file_exists($targetDir . $userId)) {
        mkdir($targetDir . $userId, 0777, true);
    }

    if (move_uploaded_file($_FILES["profileImage"]["tmp_name"], $targetFile)) {
        echo json_encode(["message" => "The file has been uploaded.", "success" => true]);
    } else {
        echo json_encode(["message" => "Sorry, there was an error uploading your file.", "success" => false]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
?>
