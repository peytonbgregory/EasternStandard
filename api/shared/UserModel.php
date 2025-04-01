<?php

require_once( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'DB.php');

class UserModel {

    // Retrieves a user record based on the username
    public function getByUsername($username) {
        $db = DB::connect();

        // Basic SQL query using string interpolation (can be improved using prepared statements)
        // $result = $db->query('SELECT * FROM employees WHERE username=\'' . $username . '\'');
        $result = $db->prepare('SELECT * FROM employees WHERE username = :username');
        $result->execute([':username' => $username]);
        return $result->fetchObject();

        if ($result) {
            // Returns the matching employee as an object
            $row = $result->fetchObject();
            return $row;
        }
    }

    // Retrieves a user record based on the employee ID
    public function getById($id) {
        $db = DB::connect();

        // Uses a prepared statement for safety and cleaner syntax
        $stmt = $db->prepare('SELECT * FROM employees WHERE id = :id');
        $stmt->execute([':id' => $id]);

        // Returns the employee record as an object
        return $stmt->fetchObject();
    }
}
