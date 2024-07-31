<?php 
class Post {
    private $conn;
    private $table_name = "forum_posts";

    public $postId;
    public $postTopicId;
    public $postAuthorId;
    public $postContent;
    public $postDateOfCreation;
    public $postImage;
    public $postHasImage;
    public $postLikesQuantity;
    public $postCommentsQuantity;
    public $postStatus; // Adiciona a propriedade postStatus

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET
                    postTopicId=:postTopicId, postAuthorId=:postAuthorId, postContent=:postContent, postDateOfCreation=:postDateOfCreation,
                    postImage=:postImage, postHasImage=:postHasImage, postLikesQuantity=:postLikesQuantity, postCommentsQuantity=:postCommentsQuantity, postStatus=1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":postTopicId", $this->postTopicId);
        $stmt->bindParam(":postAuthorId", $this->postAuthorId);
        $stmt->bindParam(":postContent", $this->postContent);
        $stmt->bindParam(":postDateOfCreation", $this->postDateOfCreation);
        $stmt->bindParam(":postImage", $this->postImage);
        $stmt->bindParam(":postHasImage", $this->postHasImage);
        $stmt->bindParam(":postLikesQuantity", $this->postLikesQuantity);
        $stmt->bindParam(":postCommentsQuantity", $this->postCommentsQuantity);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Read
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE postStatus=1 ORDER BY postDateOfCreation DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Get posts by authorId
    public function getPostsByAuthorId($authorId) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE postAuthorId = :postAuthorId AND postStatus=1 ORDER BY postDateOfCreation DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":postAuthorId", $authorId);
        $stmt->execute();

        return $stmt;
    }

    // Update
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET
                    postTopicId=:postTopicId, postContent=:postContent, 
                    postHasImage=:postHasImage, postLikesQuantity=:postLikesQuantity, postCommentsQuantity=:postCommentsQuantity
                    WHERE postId=:postId AND postStatus=1";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":postId", $this->postId);
        $stmt->bindParam(":postTopicId", $this->postTopicId);
        $stmt->bindParam(":postContent", $this->postContent);
        $stmt->bindParam(":postHasImage", $this->postHasImage);
        $stmt->bindParam(":postLikesQuantity", $this->postLikesQuantity);
        $stmt->bindParam(":postCommentsQuantity", $this->postCommentsQuantity);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Soft Delete
    public function delete() {
        $query = "UPDATE " . $this->table_name . " SET postStatus=0 WHERE postId=:postId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":postId", $this->postId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}