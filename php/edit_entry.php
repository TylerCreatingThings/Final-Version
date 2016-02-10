<?php
include 'connect.php';	
$conect = connect_acc();
$user_num = $_POST['USER_NUM'];
$name ="";
if($_POST['call']==0){
	read_events($user_num, $conect);
}
else{
	$name = $_POST['name'];
	delete_event($user_num,$name, $conect);
}
function read_events($user_num, $conect){
		if ($result = $conect->query("SELECT * FROM `event` WHERE `USER_#`='$user_num'")) {
		if($result->num_rows>0)
		{
			while($row = $result->fetch_assoc()){
				echo $row["EVENT_NAME"]."!".$row["PRIORTY"]."!".$row["TIME_END"]."!".$row["TIME_BEGIN"]."!".$row["DAY"]."!".$row["BUFF_BEGIN"]."!".$row["BUFF_END"]."~";
			}
		}
		} else {
			die('Error: Failed to Connect');
		}
}

function delete_event($user_num,$name, $conect){
	$day = $_POST['day'];
	
	if($conect->query("DELETE FROM `event` WHERE `USER_#`='$user_num' AND `EVENT_NAME`=\"$name\" AND `DAY`=\"$day\""))
	{
		echo "Succesfully Deleted Entry.";
	}
	else
	{
		echo "Error occurred when deleting entry.";
	}
	
}


?>