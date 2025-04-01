<?php

require_once('api/server/EmployeeApi.php');
require_once('api/server/Auth.php');

$auth = new Auth();

$req_obj = $_GET['obj'];
$req_type = $_GET['req'];

$data = [ 'success' => 'false', 'msg' => 'invalid request'];

switch( $req_obj ) {

    case 'employee':
        $auth->requireLogin();
        $api = new EmployeeApi();
    
        if ($req_type == 'get') {
            $data = $api->employeeDataGet($_GET['id']);
        } else if ($req_type == 'save') {
            $json = json_decode(file_get_contents("php://input"), true);
            $data = $api->employeeDataSave($json);
        } else if ($req_type == 'list') {
            $data = $api->employeeListGet();
        } else if ($req_type == 'create_full') {
            $data = $api->createFullEmployee();
        }
    
        break;
        
    case 'auth':
        if ( $req_type == 'doLogin' ) {
            $data = $auth->doLogin( $_REQUEST['username'], $_REQUEST['password'] );
        }
        else if ( $req_type == 'requireLogin' ) {
            $data = $auth->requireLogin();
        }
        break;
}

if ( $data ) {
    echo json_encode($data);
    exit;
}