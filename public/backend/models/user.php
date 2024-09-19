<?php 
class User {
    private $conn;
    private $table_name = "forum_users";

    public $userId;
    public $userName;
    public $userEmail;
    public $userBirthday;
    public $userProfileImage;
    public $userCoverPhoto;
    public $userFollowers;
    public $userSubjects;
    public $userPassword;
    public $userDateOfCreation;
    public $userHasImage;
    public $userPhone;
    public $userRole;
    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
        // Verifica se o e-mail já existe
        public function emailExists() {
          $query = "SELECT userId FROM " . $this->table_name . " WHERE userEmail = :userEmail";
  
          $stmt = $this->conn->prepare($query);
          $stmt->bindParam(":userEmail", $this->userEmail);
          $stmt->execute();
  
          if ($stmt->rowCount() > 0) {
              return true;
          }
  
          return false;
      }
  
      // Create
      public function create() {
          if ($this->emailExists()) {
              return false;
          }
  
          $query = "INSERT INTO " . $this->table_name . "
                    SET userName=:userName, userEmail=:userEmail, userBirthday=:userBirthday, 
                        userPhone=:userPhone, userPassword=:userPassword, userHasImage=:userHasImage, userRole=:userRole";
  
          $stmt = $this->conn->prepare($query);
  
          // Hash a senha antes de armazenar
          $hashedPassword = password_hash($this->userPassword, PASSWORD_DEFAULT);
  
          // Bind values
          $stmt->bindParam(":userName", $this->userName);
          $stmt->bindParam(":userEmail", $this->userEmail);
          $stmt->bindParam(":userBirthday", $this->userBirthday);
          $stmt->bindParam(":userPhone", $this->userPhone);
          $stmt->bindParam(":userPassword", $hashedPassword);
          $stmt->bindParam(":userHasImage", $this->userHasImage);
          $stmt->bindParam(":userRole", $this->userRole);
  
          if ($stmt->execute()) {
              $this->userId = $this->conn->lastInsertId();
              return true;
          }
  
          return false;
      }

    // Read
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE userStatus=1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function getUserById($userId) {
        $query = "SELECT userId, userName, userEmail, userBirthday, userProfileImage, userCoverImage, userFollowers, userSubjects, userDateOfCreation, userHasImage, userPhone, userRole 
                  FROM " . $this->table_name . " 
                  WHERE userId = :userId AND userStatus = true";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();

        return $stmt;
    }
    
    // Update
    public function update() {
      // Iniciar a query de atualização
      $query = "UPDATE " . $this->table_name . " SET
                  userName=:userName, userBirthday=:userBirthday, userPhone=:userPhone, userRole=:userRole";
  
      // Atualizar a senha apenas se ela for fornecida
      if (!empty($this->userPassword)) {
          $query .= ", userPassword=:userPassword";
      }
  
      // Atualizar a imagem de perfil apenas se ela for fornecida
      if (!is_null($this->userHasImage)) {
          $query .= ", userHasImage=:userHasImage";
      }
  
      // Completar a query
      $query .= " WHERE userId=:userId";
  
      // Preparar a query
      $stmt = $this->conn->prepare($query);
  
      // Bind dos valores obrigatórios
      $stmt->bindParam(":userId", $this->userId);
      $stmt->bindParam(":userName", $this->userName);
      $stmt->bindParam(":userBirthday", $this->userBirthday);
      $stmt->bindParam(":userPhone", $this->userPhone);
      $stmt->bindParam(":userRole", $this->userRole);
  
      // Bind da senha se ela foi fornecida
      if (!empty($this->userPassword)) {
          // Hash da senha antes de armazenar
          $hashedPassword = password_hash($this->userPassword, PASSWORD_DEFAULT);
          $stmt->bindParam(":userPassword", $hashedPassword);
      }
  
      // Bind da imagem de perfil se ela foi fornecida
      if (!is_null($this->userHasImage)) {
          $stmt->bindParam(":userHasImage", $this->userHasImage);
      }
  
      // Executar a query
      if ($stmt->execute()) {
          return true;
      }
  
      return false;
  }

    // Delete (Deactivate)
    public function delete() {
      $query = "UPDATE " . $this->table_name . " SET userStatus = false WHERE userId = :userId";

      $stmt = $this->conn->prepare($query);

      // Bind value
      $stmt->bindParam(":userId", $this->userId);

      if ($stmt->execute()) {
          return true;
      }

      return false;
    }
}
