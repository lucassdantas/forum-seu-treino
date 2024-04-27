<?php

class Middleware {
    // Função para verificar se o usuário está autenticado
    public function isAuthenticated() {
        // Aqui você pode implementar a lógica de autenticação
        // Por exemplo, verificar se o usuário está logado
        // Se estiver logado, retorna true; caso contrário, retorna false

        // Exemplo simples: verificar se a variável de sessão "user_id" está definida
        return isset($_SESSION['user_id']);
    }

    // Função para aplicar um middleware de autenticação
    public function authMiddleware() {
        if (!$this->isAuthenticated()) {
            // Se o usuário não estiver autenticado, redirecione para a página de login
            header('Location: /login.php');
            exit; // Encerre a execução do script
        }
    }

    // Outros middlewares podem ser adicionados aqui conforme necessário
}

?>
