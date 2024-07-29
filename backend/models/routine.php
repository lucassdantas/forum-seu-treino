<?php
class Routine {
    private $conn;
    private $table_name = "forum_routines"; // Nome da tabela no banco de dados

    public $routineId;
    public $routineDescription;
    public $routineDateToExecute;
    public $routineDateOfCreation;
    public $routineUserId; // Novo campo

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " SET
                    routineDescription=:routineDescription,
                    routineDateToExecute=:routineDateToExecute,
                    routineDateOfCreation=:routineDateOfCreation,
                    routineUserId=:routineUserId"; // Incluindo o novo campo

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":routineDescription", $this->routineDescription);
        $stmt->bindParam(":routineDateToExecute", $this->routineDateToExecute);
        $stmt->bindParam(":routineDateOfCreation", $this->routineDateOfCreation);
        $stmt->bindParam(":routineUserId", $this->routineUserId); // Incluindo o novo campo

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Read all
    public function read() {
        $query = "SELECT * FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Read by ID
    public function readOne() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE routineId = :routineId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":routineId", $this->routineId);
        $stmt->execute();

        return $stmt;
    }

    // Read by User ID
    public function readByUserId() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE routineUserId = :routineUserId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":routineUserId", $this->routineUserId);
        $stmt->execute();

        return $stmt;
    }

    // Update
    public function update() {
        $query = "UPDATE " . $this->table_name . " SET
                    routineDescription = :routineDescription,
                    routineDateToExecute = :routineDateToExecute
                    WHERE routineId = :routineId";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":routineId", $this->routineId);
        $stmt->bindParam(":routineDescription", $this->routineDescription);
        $stmt->bindParam(":routineDateToExecute", $this->routineDateToExecute);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete
    public function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE routineId = :routineId";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":routineId", $this->routineId);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>
