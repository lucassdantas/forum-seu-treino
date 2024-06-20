<?php
require_once './env.php';
// Configurações do banco de dados
$dbHost = $dbHostImported; // Host do banco de dados
$dbUser = $dbUserImported; // Usuário do banco de dados
$dbPassword = $dbPasswordImported; // Senha do banco de dados
$dbName = $dbNameImported; // Nome do banco de dados

// Conexão com o banco de dados
$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

// Verifica a conexão
if ($conn->connect_error) {
    die("Erro ao conectar ao banco de dados: " . $conn->connect_error);
}

// Configura o charset para utf8 (opcional, dependendo do seu caso)
$conn->set_charset("utf8");

?>
