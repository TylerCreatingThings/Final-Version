<?php
include 'account.php';
include 'Schedule.php';
include 'algorithm.php';
include 'connect.php';
function user_confirm($username){
	$Error=true;
	if (preg_match("/[^A-Za-z0-9.#\\-$]/", $username)) {
		$Error=false;
	}
	elseif(strlen($username)<6 && strlen($username)>20){
		$Error=false;
	}
	return $Error;
}
function pass_confirm($password){
	$Error=true;
	if (preg_match("/[^A-Za-z0-9.#\\-$]/", $password)) {
		$Error=false;
	}
	elseif(strlen($password)<6 or strlen($password)>12){
		$Error=false;
	}
	return $Error;
}
$result=false;
$func= $_REQUEST['functionname'];
$write ="";
switch($func) {
	case 'add':
		$result =false;
		$username=$_REQUEST['username'];
		$password=$_REQUEST['password'];
		if(pass_confirm($password)&& user_confirm($username)){
			if (check($username)){
				$num =create_acc($username,$password);
				$write="S".$num;
				$result =true;
			}
			else{
				die("Username taken");
			}
			$result =true;
		}
		else{
			die("Invalid Username");
		}
		break;
	case 'login':
		$result =false;
		$username=$_REQUEST['username'];
		$password=$_REQUEST['password'];
		if(pass_confirm($password)&& user_confirm($username)){
			if(($num =find($username,$password))!=null){
				$write="S".$num;
				$result =true;
			}
			else{
				die("Invalid username or password");
			}
		}
		else{
			die("Invalid username or password");
		}
		break;
	case 'get_user':
		$User_num=$_REQUEST['u_num'];
		$write =get_user($User_num);
		$result=true;
		break;
	case 'get_schedule':
		$user_num=$_REQUEST['u_num'];
		$start=$_REQUEST['start'];
		$end=$_REQUEST['end'];
		$write =fill_out_sch($user_num,$start,$end);
		$result=true;
		break;
	case 'update_sch':
		$user_num=$_REQUEST['u_num'];
		algorithm($user_num);
		$result=true;
		break;
	case 'sign_out':
		$user_num=$_REQUEST['u_num'];
		sign_out($user_num);
		$result=true;
		break;
}

if ($result) {
	echo $write;
} else {
	die ("error");
}
?>