<?php
class Follower {
    private $conn;
    private $table_name = "forum_followers";

    public $followerUserFollower;
    public $followerUserFollowed;
    public $followerDateOfCreation;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET
                    followerUserFollower=:followerUserFollower, followerUserFollowed=:followerUserFollowed, followerDateOfCreation=:followerDateOfCreation";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":followerUserFollower", $this->followerUserFollower);
        $stmt->bindParam(":followerUserFollowed", $this->followerUserFollowed);
        $stmt->bindParam(":followerDateOfCreation", $this->followerDateOfCreation);

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

    // Update
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET
                    followerDateOfCreation=:followerDateOfCreation
                    WHERE followerUserFollower=:followerUserFollower AND followerUserFollowed=:followerUserFollowed";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":followerUserFollower", $this->followerUserFollower);
        $stmt->bindParam(":followerUserFollowed", $this->followerUserFollowed);
        $stmt->bindParam(":followerDateOfCreation", $this->followerDateOfCreation);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE followerUserFollower=:followerUserFollower AND followerUserFollowed=:followerUserFollowed";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollower", $this->followerUserFollower);
        $stmt->bindParam(":followerUserFollowed", $this->followerUserFollowed);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
