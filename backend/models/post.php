<?php
class Post {
    private $conn;
    private $table_name = "forum_posts";

    public $postId;
    public $postTopicId;
    public $authorId;
    public $postContent;
    public $dateOfCreation;
    public $postImage;
    public $postLikesQuantity;
    public $postCommentsQuantity;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET
                    postTopicId=:postTopicId, authorId=:authorId, postContent=:postContent, dateOfCreation=:dateOfCreation,
                    postImage=:postImage, postLikesQuantity=:postLikesQuantity, postCommentsQuantity=:postCommentsQuantity";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":postTopicId", $this->postTopicId);
        $stmt->bindParam(":authorId", $this->authorId);
        $stmt->bindParam(":postContent", $this->postContent);
        $stmt->bindParam(":dateOfCreation", $this->dateOfCreation);
        $stmt->bindParam(":postImage", $this->postImage);
        $stmt->bindParam(":postLikesQuantity", $this->postLikesQuantity);
        $stmt->bindParam(":postCommentsQuantity", $this->postCommentsQuantity);

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
                    postTopicId=:postTopicId, authorId=:authorId, postContent=:postContent, dateOfCreation=:dateOfCreation,
                    postImage=:postImage, postLikesQuantity=:postLikesQuantity, postCommentsQuantity=:postCommentsQuantity
                    WHERE postId=:postId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":postId", $this->postId);
        $stmt->bindParam(":postTopicId", $this->postTopicId);
        $stmt->bindParam(":authorId", $this->authorId);
        $stmt->bindParam(":postContent", $this->postContent);
        $stmt->bindParam(":dateOfCreation", $this->dateOfCreation);
        $stmt->bindParam(":postImage", $this->postImage);
        $stmt->bindParam(":postLikesQuantity", $this->postLikesQuantity);
        $stmt->bindParam(":postCommentsQuantity", $this->postCommentsQuantity);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE postId=:postId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":postId", $this->postId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
