<?php

require_once( dirname(__FILE__) . DIRECTORY_SEPARATOR . 'DB.php');

class EmployeeModel {

    public function getById($id) {
        
        $db = DB::connect();
        $result = $db->query('SELECT * FROM employees WHERE id=' . $id);
        
        if ( $result ) {
            $row = $result->fetchObject();
            return $row;
        }
    }

    public function updateEmployee($data) {
        $conn = DB::connect();
    
        $sql = "UPDATE employees
                SET first_name = :first_name,
                    last_name = :last_name,
                    dob = :dob,
                    phone = :phone,
                    office_number = :office_number,
                    category = :category
                WHERE id = :id";
    
        $stmt = $conn->prepare($sql);
    
        try {
            $stmt->execute([
                ':first_name' => $data['first_name'],
                ':last_name' => $data['last_name'],
                ':dob' => $data['dob'],
                ':phone' => $data['phone'],
                ':office_number' => $data['office_number'],
                ':category' => $data['category'],
                ':id' => $data['id']
            ]);
    
            return ['success' => true];
    
        } catch (PDOException $e) {
            return [
                'success' => false,
                'msg' => 'DB Error: ' . $e->getMessage()
            ];
        }
    }
    

}