<?php
class Topic {
    private $conn;
    private $table_name = "forum_topics";

    public $topicId;
    public $topicName;
    public $topicUrl;
    public $topicDateOfCreation;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET
                    topicName=:topicName, topicUrl=:topicUrl, topicDateOfCreation=:topicDateOfCreation";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":topicName", $this->topicName);
        $stmt->bindParam(":topicUrl", $this->topicUrl);
        $stmt->bindParam(":topicDateOfCreation", $this->topicDateOfCreation);

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
                    topicName=:topicName, topicUrl=:topicUrl, topicDateOfCreation=:topicDateOfCreation
                    WHERE topicId=:topicId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":topicId", $this->topicId);
        $stmt->bindParam(":topicName", $this->topicName);
        $stmt->bindParam(":topicUrl", $this->topicUrl);
        $stmt->bindParam(":topicDateOfCreation", $this->topicDateOfCreation);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE topicId=:topicId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":topicId", $this->topicId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
