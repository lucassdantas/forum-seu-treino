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

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET userName=:userName, userEmail=:userEmail, userBirthday=:userBirthday, 
                      userPhone=:userPhone, userPassword=:userPassword, userHasImage=:userHasImage";
  
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
  
        if ($stmt->execute()) {
            $this->userId = $this->conn->lastInsertId();
            return true;
        }
  
        return false;
    }

    // Read
    public function read() {
        $query = "SELECT * FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function getUserById($userId) {
        $query = "SELECT userId, userName, userEmail, userBirthday, userProfileImage, userCoverImage, userFollowers, userSubjects, userDateOfCreation, userHasImage, userPhone
                  FROM " . $this->table_name . " 
                  WHERE userId = :userId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();

        return $stmt;
    }
    
    // Update
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET
                    userName=:userName, userBirthday=:userBirthday, userPhone=:userPhone";

        if (!empty($this->userPassword)) {
            $query .= ", userPassword=:userPassword";
        }

        $query .= " WHERE userId=:userId";

        $stmt = $this->conn->prepare($query);

        // Bind values
        $stmt->bindParam(":userId", $this->userId);
        $stmt->bindParam(":userName", $this->userName);
        $stmt->bindParam(":userBirthday", $this->userBirthday);
        $stmt->bindParam(":userPhone", $this->userPhone);

        if (!empty($this->userPassword)) {
            // Hash a senha antes de armazenar
            $hashedPassword = password_hash($this->userPassword, PASSWORD_DEFAULT);
            $stmt->bindParam(":userPassword", $hashedPassword);
        }

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete
    public function delete() {
        // Implementação do método delete, se necessário
    }
}
?>
