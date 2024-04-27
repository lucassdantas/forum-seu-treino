<?php

class Comment {
    // Propriedades do comentário
    private $id;
    private $postId;
    private $content;
    private $author;

    // Construtor
    public function __construct($id, $postId, $content, $author) {
        $this->id = $id;
        $this->postId = $postId;
        $this->content = $content;
        $this->author = $author;
    }

    // Getters e setters para as propriedades do comentário
    public function getId() {
        return $this->id;
    }

    public function getPostId() {
        return $this->postId;
    }

    public function getContent() {
        return $this->content;
    }

    public function setContent($content) {
        $this->content = $content;
    }

    public function getAuthor() {
        return $this->author;
    }

    public function setAuthor($author) {
        $this->author = $author;
    }

    // Outros métodos relacionados a operações com o comentário podem ser adicionados aqui
}

?>
