<?php

class DB {

    static $DB_name='es_challenge';
    static $Connection;

    public static function connect() {

        if ( !self::$Connection) {
            // Default Credentials
            // self::$Connection = new PDO('mysql:host=localhost;dbname=' . self::$DB_name, 'sqluser', 'sqlpass');
            
            // MAMP Credentials
            self::$Connection = new PDO('mysql:host=localhost;dbname=' . self::$DB_name, 'root', 'root'); 
        }

        return self::$Connection;
    }
    
}