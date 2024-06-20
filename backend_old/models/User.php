<?php

class User {
    // Propriedades do usuário
    private $id;
    private $username;
    private $email;

    // Construtor
    public function __construct($id, $username, $email) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
    }

    // Getters e setters para as propriedades do usuário
    public function getId() {
        return $this->id;
    }

    public function getUsername() {
        return $this->username;
    }

    public function setUsername($username) {
        $this->username = $username;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    // Outros métodos relacionados a operações com o usuário podem ser adicionados aqui
}

?>
