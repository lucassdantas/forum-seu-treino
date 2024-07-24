<?php
class Like {
    private $conn;
    private $table_name = "forum_likes";

    public $likeAuthorId;
    public $likePostId;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET
                    likeAuthorId=:likeAuthorId, likePostId=:likePostId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":likeAuthorId", $this->likeAuthorId);
        $stmt->bindParam(":likePostId", $this->likePostId);

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
        // In this context, updating likes might not be a common operation.
        // Usually, you would just insert or delete a like.
        // However, if needed, you can implement it similarly to other models.
        return false;
    }

    // Delete
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE likeAuthorId=:likeAuthorId AND likePostId=:likePostId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":likeAuthorId", $this->likeAuthorId);
        $stmt->bindParam(":likePostId", $this->likePostId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
