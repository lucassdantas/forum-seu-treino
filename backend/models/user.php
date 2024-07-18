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

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET
                    userName=:userName, userEmail=:userEmail, userBirthday=:userBirthday, userProfileImage=:userProfileImage,
                    userCoverPhoto=:userCoverPhoto, userFollowers=:userFollowers, userSubjects=:userSubjects, userPassword=:userPassword";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":userName", $this->userName);
        $stmt->bindParam(":userEmail", $this->userEmail);
        $stmt->bindParam(":userBirthday", $this->userBirthday);
        $stmt->bindParam(":userProfileImage", $this->userProfileImage);
        $stmt->bindParam(":userCoverPhoto", $this->userCoverPhoto);
        $stmt->bindParam(":userFollowers", $this->userFollowers);
        $stmt->bindParam(":userSubjects", $this->userSubjects);
        $stmt->bindParam(":userPassword", $this->userPassword);

        if ($stmt->execute()) {
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
        $query = "SELECT userId, userName, userEmail, userBirthday, userProfileImage, userCoverPhoto, userFollowers, userSubjects, userDateOfCreation 
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
                    userName=:userName, userEmail=:userEmail, userBirthday=:userBirthday, userProfileImage=:userProfileImage,
                    userCoverPhoto=:userCoverPhoto, userFollowers=:userFollowers, userSubjects=:userSubjects, userPassword=:userPassword
                    WHERE userId=:userId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":userId", $this->userId);
        $stmt->bindParam(":userName", $this->userName);
        $stmt->bindParam(":userEmail", $this->userEmail);
        $stmt->bindParam(":userBirthday", $this->userBirthday);
        $stmt->bindParam(":userProfileImage", $this->userProfileImage);
        $stmt->bindParam(":userCoverPhoto", $this->userCoverPhoto);
        $stmt->bindParam(":userFollowers", $this->userFollowers);
        $stmt->bindParam(":userSubjects", $this->userSubjects);
        $stmt->bindParam(":userPassword", $this->userPassword);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE userId=:userId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":userId", $this->userId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
