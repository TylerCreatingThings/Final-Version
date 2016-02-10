<?php
include 'connect.php';	

	$conect = connect_acc();
	$name = $_POST['name'];
	$value = intval($_POST['value']);
	$time_start = $_POST['time_start'].":00";
	$time_end = $_POST['time_end'].":00";	

	$day = $_POST['day'];
	$buff_start = $_POST['buff_start'];
	$buff_end = $_POST['buff_end'];
	$username = intval($_POST['username']);
	if ($conect->query("INSERT INTO `event` (`EVENT_NAME`, `PRIORTY`, `TIME_BEGIN`, `TIME_END`, `DAY`, `BUFF_BEGIN`, `BUFF_END`, `USER_#`) VALUES ('$name','$value','$time_start','$time_end','$day','$buff_start','$buff_end','$username');")) {
		echo "$name recorded succesfully.";
	} else {
		die('Error: Failed to Connect');
	}
	disconnect($conect);
?>