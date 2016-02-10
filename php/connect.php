<?php

function connect_acc(){
	$db_host		= '127.0.0.1';
	$db_user		= 'root';
	$db_pass		= '';
	$db_database	= 'accounts'; 

	$conn = new mysqli($db_host, $db_user, $db_pass, $db_database);
	if ($conn->connect_error) {
		 die("Connection failed: " . $conn->connect_error);
	}
	return $conn;
}

function disconnect($conn){
	$conn->close();
}

?>