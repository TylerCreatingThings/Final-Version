<?php


function check($username){
	$conect=connect_acc();
	$not_found=true;
	if($result = $conect->query("SELECT * FROM account WHERE Username='$username'")){
		if ($result->num_rows > 0) {
			$not_found=false;
			die("Username taken");
		}
	}
	else{
		die("failed to connect to user database");
	}
	disconnect($conect);
	return $not_found;
}

function find($username,$password){
	$conect=connect_acc();
	$number=null;
	if($result = $conect->query("SELECT * FROM account WHERE Username='$username'")){
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			if($row["Password"]==$password){
				if($row["occupied"]==0 ){
					$number=$row["USER_#"];
					if($conect->query("UPDATE `account` SET `occupied`=1 WHERE `USER_#`='$number'")){
					}
					else{
						die("failed to connect to user database");
					}
				}
				else{
					die("All ready loged in");
				}
			}
			else{
				die("Invalid password or username");
			}
		}
		else{
			die("Invalid password or username");
		}
	}
	else{
		die("failed to connect to user database");
	}
	disconnect($conect);
	return $number;
}
	
function create_acc($username,$password){
	$conect=connect_acc();
	$result=FALSE;
	$user_n=number_generate($conect);
	if ($conect->query("INSERT INTO `account`(`Username`, `Password`, `USER_#`, `occupied`) VALUES ('$username','$password','$user_n','1')") === TRUE) {
		$result= true;
	}
	disconnect($conect);
	return $user_n;
}
function number_generate($conect){
	$num =0;
	if($result = $conect->query('SELECT `USER_#` FROM `account` ORDER BY "USER_#" ASC')){
		if ($result->num_rows > 0){
			$row1 = $result->fetch_assoc();
			if ($result->num_rows > 1) {
				while($row2 = $result->fetch_assoc()) {
					if( $row1["USER_#"]+1 < $row2["USER_#"]){
						return $row1["USER_#"]+1;
					}
					$row1=$row2;
				}
				return $row1["USER_#"]+1;
			}
			else{
				return $row1["USER_#"]+1;
			}
		}
	}
	else{
		die("failed to connect to user database");
	}
	return $num;
}

function sign_out($user_num){
	$conect=connect_acc();
	if($conect->query("UPDATE `account` SET `occupied`=0 WHERE `USER_#`='$user_num'")){
	}
	else{
		die("failed to connect to user database");
	}
	disconnect($conect);
}
		
function get_user($User_num){
	$conect=connect_acc();
	if($result = $conect->query("SELECT `Username` FROM `account` WHERE `USER_#`='$User_num'")){
		if ($result->num_rows > 0){
			$row= $result->fetch_assoc();
			$username=$row["Username"];
		}
		else{
			die("Unknown");
		}
	}
	else{
		die("failed to connect to user database");
	}
	disconnect($conect);
	return $username;
}
?>