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
        $query = "SELECT f.followerUserFollower, f.followerUserFollowed
        FROM " . $this->table_name . " f
        JOIN forum_users u1 ON f.followerUserFollower = u1.userId
        JOIN forum_users u2 ON f.followerUserFollowed = u2.userId
        WHERE u1.userStatus = 1 OR u2.userStatus = 1;";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Get followers by followerId
    public function getFollowersByFollowerId($followerUserFollower) {
        $query = "SELECT *, userStatus FROM " . $this->table_name . " INNER JOIN forum_users ON userId = followerUserFollower WHERE followerUserFollower = :followerUserFollower AND userStatus = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollower", $followerUserFollower);
        $stmt->execute();

        return $stmt;
    }

    // Get followed by followedId
    public function getFollowedByFollowedId($followerUserFollowed) {
        $query = "SELECT *, userStatus FROM " . $this->table_name . " INNER JOIN forum_users ON userStatus = followerUserFollowed WHERE followerUserFollowed = :followerUserFollowed AND userStatus = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollowed", $followerUserFollowed);
        $stmt->execute();

        return $stmt;
    }

    // Get followers list
    public function getFollowersList($followerUserFollowed) {
        $query = "SELECT u.userId, u.userName, u.userStatus 
                  FROM " . $this->table_name . " f
                  JOIN forum_users u ON f.followerUserFollower = u.userId
                  WHERE f.followerUserFollowed = :followerUserFollowed AND u.userStatus = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollowed", $followerUserFollowed);
        $stmt->execute();

        return $stmt;
    }

    // Get following list
    public function getFollowingList($followerUserFollower) {
        $query = "SELECT u.userId, u.userName, u.userStatus 
                  FROM " . $this->table_name . " f
                  JOIN forum_users u ON f.followerUserFollowed = u.userId
                  WHERE f.followerUserFollower = :followerUserFollower AND u.userStatus = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":followerUserFollower", $followerUserFollower);
        $stmt->execute();

        return $stmt;
    }

    // Check if user is a follower
    public function isFollower($followerUserFollower, $followerUserFollowed) {
        $query = "SELECT *, userStatus FROM " . $this->table_name . " INNER JOIN forum_users ON userId = followerUserFollower WHERE followerUserFollower = :followerUserFollower AND followerUserFollowed = :followerUserFollowed AND userStatus = 1";

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
