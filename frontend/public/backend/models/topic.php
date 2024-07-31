<?php
class Topic {
    private $conn;
    private $table_name = "forum_topics";

    public $topicId;
    public $topicName;
    public $topicUrl;
    public $topicDateOfCreation;
    public $topicStatus;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET
                    topicName=:topicName, topicUrl=:topicUrl, topicDateOfCreation=:topicDateOfCreation, topicStatus=:topicStatus";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":topicName", $this->topicName);
        $stmt->bindParam(":topicUrl", $this->topicUrl);
        $stmt->bindParam(":topicDateOfCreation", $this->topicDateOfCreation);
        $stmt->bindParam(":topicStatus", $this->topicStatus);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Read
    public function read() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE topicStatus = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Update
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET
                    topicName=:topicName, topicUrl=:topicUrl, topicDateOfCreation=:topicDateOfCreation, topicStatus=:topicStatus
                    WHERE topicId=:topicId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":topicId", $this->topicId);
        $stmt->bindParam(":topicName", $this->topicName);
        $stmt->bindParam(":topicUrl", $this->topicUrl);
        $stmt->bindParam(":topicDateOfCreation", $this->topicDateOfCreation);
        $stmt->bindParam(":topicStatus", $this->topicStatus);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Soft Delete
    public function softDelete() {
        $query = "UPDATE " . $this->table_name . " SET topicStatus='false' WHERE topicId=:topicId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":topicId", $this->topicId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
