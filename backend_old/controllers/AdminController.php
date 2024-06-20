<?php

// Incluindo o arquivo de Middleware
require_once 'backend/middleware.php';

class AdminController {
    
    // Método para acessar a área administrativa
    public function adminArea() {
        // Instanciando o Middleware
        $middleware = new Middleware();
        
        // Aplicando o middleware de autenticação
        $middleware->authMiddleware();
        
        // Verificando se o usuário é um administrador
        if (!$middleware->isAdmin()) {
            // Se não for um administrador, redireciona para a página inicial ou exibe uma mensagem de erro
            echo 'Você não tem permissão para acessar esta página.';
            return;
        }
        
        // Se for um administrador, exibe a área administrativa
        echo 'Área administrativa';
    }
    
    // Método para adicionar rotina de treino/dieta
    public function addRoutine() {
        // Lógica para adicionar rotina de treino/dieta
        echo 'Adicionando rotina de treino/dieta';
    }

    // Método para gerenciar usuário específico
    public function manageUser($userId) {
        // Lógica para gerenciar usuário específico
        echo 'Gerenciando usuário com ID: ' . $userId;
    }
}

?>
