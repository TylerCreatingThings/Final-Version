<?php

function fill_out_sch($user_num,$start,$end){
	$conect=connect_acc();
	$date_time_s=explode(' ', $start);
	$date_time_e=explode(' ', $end);
	$date_end=$date_time_e[0];
	$date=$date_time_s[0];
	$specific_val="S";
	while($date<=$date_end){
		if($date==$date_time_s[0]){
			$lim_s=$date." ".$date_time_s[1];
			$lim_e=inc_day($date)." 23:59:59";

		}
		elseif($date==$date_end){
			$lim_s=$date." 00:00:00";
			$lim_e=inc_day($date)." ".$date_time_e[1];

		}
		else{
			$lim_s=$date." 00:00:00";
			$lim_e=inc_day($date)." 23:59:59";
		}
		if($result=$conect->query("SELECT `Name`,`Start`,`End` FROM `Schedule` WHERE `User_#`='$user_num' AND `TYPE`='D' AND `Start`>='$lim_s' AND `End`<='$lim_e' ORDER BY 'Start' ASC")){
			if ($result->num_rows == 0) {
				$y_m_d=explode('-', $date);
				$weekday=dayoftheweek($y_m_d[0],$y_m_d[1],$y_m_d[2]);	
				$result=$conect->query("SELECT `Name`,`Start`,`End` FROM `Schedule` WHERE `User_#`='$user_num' AND `TYPE`='$weekday' ORDER BY 'Start' ASC");
			}
			if ($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					$ds_date_time_s=explode(' ',$row["Start"]);
					$ds_date_time_e=explode(' ',$row["End"]);
					$specific_val=$specific_val . $row["Name"] . "/" . $date." ".$ds_date_time_s[1] . "/" . $date." ".$ds_date_time_e[1] . "//" ;
				}
			}
		}
		$specific_val=$specific_val ."||";
		$date=inc_day($date);
	}
	disconnect($conect);
	return $specific_val;
}
?>
