<?php

require_once( dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'shared' . DIRECTORY_SEPARATOR . 'UserModel.php');

class Auth {

    public function verifyCredentials($username, $password) {


        $model = new UserModel();
        $user_data = $model->getByUsername($username);

        $db_password = $user_data->password;

        if ( password_verify($password, $db_password) ) {
            return $user_data->id;
        }

        return false;
    }

    public function doLogin( $username, $password ) {

        if ( $id = $this->verifyCredentials($username, $password) ) {
            session_start();
            $_SESSION['user_id'] = $id;
            return [ 'success' => true, 'id' => $id ];
        }
        else {
            return ['success' => false, 'msg' => 'Invalid credentials'];
        }
        
    }

    public function requireLogin() {
        // PHP doesn’t allow session_start() to run more than once
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (empty($_SESSION['user_id'])) {
            header("HTTP/1.1 403 Access Denied");
            exit;
        }
    
        $user_id = $_SESSION['user_id'];

        $model = new UserModel();
        $user = $model->getById($user_id);
    
        return [
            'success' => true,
            'id' => $user->id,
            'role' => $user->role,
            'username' => $user->username
        ];
    }
    

}