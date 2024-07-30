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

    // Get followers by followerId
    public function getFollowersByFollowerId($followerUserFollower) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE followerUserFollower = :followerUserFollower";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollower", $followerUserFollower);
        $stmt->execute();

        return $stmt;
    }

    // Get followed by followedId
    public function getFollowedByFollowedId($followerUserFollowed) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE followerUserFollowed = :followerUserFollowed";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollowed", $followerUserFollowed);
        $stmt->execute();

        return $stmt;
    }

    // Get followers list
    public function getFollowersList($followerUserFollowed) {
        $query = "SELECT u.userId, u.userName 
                  FROM " . $this->table_name . " f
                  JOIN forum_users u ON f.followerUserFollower = u.userId
                  WHERE f.followerUserFollowed = :followerUserFollowed";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollowed", $followerUserFollowed);
        $stmt->execute();

        return $stmt;
    }

    // Get following list
    public function getFollowingList($followerUserFollower) {
        $query = "SELECT u.userId, u.userName 
                  FROM " . $this->table_name . " f
                  JOIN forum_users u ON f.followerUserFollowed = u.userId
                  WHERE f.followerUserFollower = :followerUserFollower";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollower", $followerUserFollower);
        $stmt->execute();

        return $stmt;
    }

    // Check if user is a follower
    public function isFollower($followerUserFollower, $followerUserFollowed) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE followerUserFollower = :followerUserFollower AND followerUserFollowed = :followerUserFollowed";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollower", $followerUserFollower);
        $stmt->bindParam(":followerUserFollowed", $followerUserFollowed);
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
        $query = "DELETE FROM " . $this->table_name . " WHERE followerUserFollower = :followerUserFollower AND followerUserFollowed = :followerUserFollowed";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":followerUserFollower", $this->followerUserFollower);
        $stmt->bindParam(":followerUserFollowed", $this->followerUserFollowed);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
