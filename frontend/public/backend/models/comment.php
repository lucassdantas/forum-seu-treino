<?php
class Comment {
    private $conn;
    private $table_name = "forum_comments";

    public $commentId;
    public $commentPostId;
    public $commentAuthorId;
    public $commentAuthorName;
    public $commentContent;
    public $commentDateOfCreation;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET
                    commentPostId=:commentPostId, commentAuthorId=:commentAuthorId, commentAuthorName=:commentAuthorName, commentContent=:commentContent, commentDateOfCreation=:commentDateOfCreation";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":commentPostId", $this->commentPostId);
        $stmt->bindParam(":commentAuthorId", $this->commentAuthorId);
        $stmt->bindParam(":commentAuthorName", $this->commentAuthorName);
        $stmt->bindParam(":commentContent", $this->commentContent);
        $stmt->bindParam(":commentDateOfCreation", $this->commentDateOfCreation);

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

    // Read comments by post ID with author details
    public function readByPostId($postId) {
      $query = "SELECT * FROM " . $this->table_name . " 
                WHERE commentPostId = :postId
                ORDER BY commentDateOfCreation DESC";
  
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(":postId", $postId);
      $stmt->execute();
  
      return $stmt;
  }

    // Update
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET
                    commentPostId=:commentPostId, commentAuthorId=:commentAuthorId, commentContent=:commentContent, commentDateOfCreation=:commentDateOfCreation
                    WHERE commentId=:commentId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":commentId", $this->commentId);
        $stmt->bindParam(":commentPostId", $this->commentPostId);
        $stmt->bindParam(":commentAuthorId", $this->commentAuthorId);
        $stmt->bindParam(":commentContent", $this->commentContent);
        $stmt->bindParam(":commentDateOfCreation", $this->commentDateOfCreation);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE commentId=:commentId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":commentId", $this->commentId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
