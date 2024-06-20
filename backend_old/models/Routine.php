<?php

class Routine {
    // Propriedades da rotina
    private $id;
    private $title;
    private $description;
    private $type; // Tipo de rotina: treino ou dieta

    // Construtor
    public function __construct($id, $title, $description, $type) {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->type = $type;
    }

    // Getters e setters para as propriedades da rotina
    public function getId() {
        return $this->id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function setTitle($title) {
        $this->title = $title;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        $this->type = $type;
    }

    // Outros métodos relacionados a operações com a rotina podem ser adicionados aqui
}

?>
