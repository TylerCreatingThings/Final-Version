<?php 
$servername = 'localhost';
$user ='root';
$pass ='';
$db = 'events';
$conn = mysql_connect($servername,$user,$pass) or die("Unable to connect.");

	$name = $_POST['name'];
	$type = $_POST['type'];
	$attire = $_POST['attire'];
	$money = $_POST['money'];
	$date = $_POST['date'];
	$startTime = $_POST['startTime'];
	$endTime = $_POST['endTime'];
	mysql_select_db($db,$conn);
	$query = "INSERT INTO events (ID,Name,Type,Attire,Money,Date,Start,End) VALUES (NULL,'$name','$type','$attire','$money','$date','$startTime','$endTime')";
	$result = mysql_query($query);
	
	if ($result) {
		echo "New record created successfully";
	} else {
		die('Error: '.mysql_error($conn));
	}

mysql_close($conn);
?>