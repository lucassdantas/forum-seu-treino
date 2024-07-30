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
        // Implementação do método create, se necessário
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

        $stmt->bindParam(":userId", $this->userId);
        $stmt->bindParam(":userName", $this->userName);
        $stmt->bindParam(":userBirthday", $this->userBirthday);
        $stmt->bindParam(":userPhone", $this->userPhone);

        if (!empty($this->userPassword)) {
            $stmt->bindParam(":userPassword", $this->userPassword);
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
