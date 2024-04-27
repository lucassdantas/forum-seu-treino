<?php

class PostController {
    // Simulação de dados de postagens (substitua com sua própria lógica de persistência de dados)
    private $posts = [];

    // Função para criar uma nova postagem
    public function createPost($title, $content) {
        // Verifica se o usuário está logado ou tem permissão para criar postagens (você pode adicionar verificação de autenticação aqui)
        // Simula a criação de uma nova postagem (substitua com sua própria lógica de persistência de dados)
        // Por exemplo, você pode inserir a postagem no banco de dados ou em qualquer outro armazenamento
        // Retorna o ID da postagem recém-criada ou retorna um erro em caso de falha

        // Aqui, apenas simularemos a criação da postagem e retornaremos um ID de postagem aleatório
        $postId = mt_rand(1000, 9999); // Simula um ID de postagem
        $this->posts[$postId] = ['title' => $title, 'content' => $content]; // Adiciona a postagem à lista de postagens
        return ['post_id' => $postId];
    }

    // Função para recuperar uma postagem específica
    public function getPost($postId) {
        // Verifica se a postagem existe
        if (isset($this->posts[$postId])) {
            return $this->posts[$postId]; // Retorna os dados da postagem
        } else {
            return ['error' => 'Postagem não encontrada'];
        }
    }

    // Função para atualizar uma postagem existente
    public function updatePost($postId, $title, $content) {
        // Verifica se a postagem existe
        if (isset($this->posts[$postId])) {
            // Atualiza os dados da postagem
            $this->posts[$postId] = ['title' => $title, 'content' => $content];
            return true; // Retorna true se a postagem foi atualizada com sucesso
        } else {
            return ['error' => 'Postagem não encontrada'];
        }
    }

    // Função para excluir uma postagem existente
    public function deletePost($postId) {
        // Verifica se a postagem existe
        if (isset($this->posts[$postId])) {
            unset($this->posts[$postId]); // Remove a postagem da lista de postagens
            return true; // Retorna true se a postagem foi excluída com sucesso
        } else {
            return ['error' => 'Postagem não encontrada'];
        }
    }
}

?>
