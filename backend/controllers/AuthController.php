<?php

class AuthController {
    // Simulação de dados de usuários (substitua com seu próprio sistema de autenticação)
    private $users = [
        ['username' => 'usuario1', 'password' => 'senha1'],
        ['username' => 'usuario2', 'password' => 'senha2']
    ];

    // Verifica as credenciais do usuário e faz o login
    public function login($username, $password) {
        // Verifica se o usuário existe e a senha está correta
        foreach ($this->users as $user) {
            if ($user['username'] === $username && $user['password'] === $password) {
                // Inicia a sessão e armazena o usuário logado
                session_start();
                $_SESSION['user'] = $username;
                return true;
            }
        }
        return false; // Credenciais inválidas
    }

    // Faz o logout do usuário
    public function logout() {
        session_start();
        session_destroy();
    }

    // Verifica se o usuário está logado
    public function isLoggedIn() {
        session_start();
        return isset($_SESSION['user']);
    }
}

?>
