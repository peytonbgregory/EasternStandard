<?php

require_once( dirname(__FILE__) . '/../shared/EmployeeModel.php');

class EmployeeApi {

    public function employeeDataGet( $id ) {

        $model = new EmployeeModel();
        return $model->getById($id);

    }

    public function employeeDataSave($data) {

        $model = new EmployeeModel();
        return $model->updateEmployee($data);

    }

    public function employeeListGet() {
        $model = new EmployeeModel();
        return $model->getAll();
    }

    public function createFullEmployee() {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
    
        if (empty($data['username']) || empty($data['password'])) {
            return ['success' => false, 'msg' => 'Username and password are required.'];
        }
    
        $conn = DB::connect();
    
        $stmt = $conn->prepare("
            INSERT INTO employees (first_name, last_name, dob, phone, office_number, category, username, password, role)
            VALUES (:first_name, :last_name, :dob, :phone, :office_number, :category, :username, :password, :role)
        ");
    
        $stmt->execute([
            ':first_name' => $data['first_name'] ?? '',
            ':last_name' => $data['last_name'] ?? '',
            ':dob' => $data['dob'] ?? '',
            ':phone' => $data['phone'] ?? '',
            ':office_number' => $data['office_number'] ?? '',
            ':category' => $data['category'] ?? '',
            ':username' => $data['username'],
            ':password' => password_hash($data['password'], PASSWORD_DEFAULT),
            ':role' => $data['role'] ?? 'employee'
        ]);
    
        return ['success' => true, 'id' => $conn->lastInsertId()];
    }
    

}