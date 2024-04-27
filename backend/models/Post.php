<?php

class Post {
    // Propriedades do post
    private $id;
    private $title;
    private $content;
    private $author;

    // Construtor
    public function __construct($id, $title, $content, $author) {
        $this->id = $id;
        $this->title = $title;
        $this->content = $content;
        $this->author = $author;
    }

    // Getters e setters para as propriedades do post
    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function setTitle($title) {
        $this->title = $title;
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

    // Outros métodos relacionados a operações com o post podem ser adicionados aqui
}

?>
