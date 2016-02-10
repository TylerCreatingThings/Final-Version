<?php
function dayoftheweek($year,$month,$day){
	$result=intval(substr((""+$year),-2));
	$result=(int)$result/4;
	$result=$result+$day;
	$key=array(1,4,4,0,2,5,0,3,6,1,4,6);
	$result=$result+$key[$month-1];
	if($month==2 || $month==1){
		if($year%4==0 &&($year%400==0 ||$year%100!=0)){
			$result=$result-1;
		}
	}
	$result=$result+6;
	$result=$result+intval(substr((""+$year),-2));
	$result=$result%7;
	$day_week='';
	switch ($result){
		case 0:
			$day_week='S';
			break;
		case 1:
			$day_week='U';
			break;
		case 2:
			$day_week='M';
			break;
		case 3:
			$day_week='T';
			break;
		case 4:
			$day_week='W';
			break;
		case 5:
			$day_week='R';
			break;
		case 6:
			$day_week='F';
			break;
	}
	return $day_week;
}
function time_add($time_b,$time_e){
	$time_b_sec=explode(':', $time_b);
	$time_e_sec=explode(':', $time_e);
	$inc_sec=intval($time_b_sec[2])+intval($time_e_sec[2]);
	$inc_min=intval($time_b_sec[1])+intval($time_e_sec[1]);
	$inc_hr=intval($time_b_sec[0])+intval($time_e_sec[0]);
	if ($inc_sec>60){
		$inc_sec=$inc_sec-60;
		$inc_min=$inc_min+1;
	}
	if ($inc_min>60){
		$inc_min=$inc_min-60;
		$inc_hr=$inc_hr+1;
	}
	return format($inc_hr,$inc_min,$inc_sec);
}
function time_diff($time_b,$time_e){
		$time_b_sec=explode(':', $time_b);
		$time_e_sec=explode(':', $time_e);
		$inc_sec=intval($time_e_sec[2])-intval($time_b_sec[2]);
		$inc_min=intval($time_e_sec[1])-intval($time_b_sec[1]);
		$inc_hr=intval($time_e_sec[0])-intval($time_b_sec[0]);
		if ($inc_sec<0){
			$inc_sec=60+$inc_sec;
			$inc_min=$inc_min-1;
		}
		if ($inc_min<0){
			$inc_min=60+$inc_min;
			$inc_hr=$inc_hr-1;
		}
		if ($inc_min<0){
			$inc_hr=24+$inc_hr;
		}
		return format($inc_hr,$inc_min,$inc_sec);
	}
function format($hr,$minit,$sec){
	$t_hr="";
	$t_minit="";
	$t_sec="";
	if(intval($hr)<10){
		$t_hr="0".$hr;
	}
	else{
		$t_hr=$hr;
	}
	if(intval($minit)<10){
		$t_minit="0".$minit;
	}
	else{
		$t_minit=$minit;
	}
	if(intval($sec)<10){
		$t_sec="0".$sec;
	}
	else{
		$t_sec=$sec;
	}
	return $t_hr.":".$t_minit.":".$t_sec;
}
function increment_time_hr($time,$amount){
		$time_sec=explode(':', $time);
		$inc_hr=intval($time_sec[0])+$amount;
		if ($inc_hr>=24){
			$inc_hr="00";
		}
		if ($inc_hr<0){
			$inc_hr=24+$inc_hr;
		}
		return $inc_hr+":"+$time_sec[1];
	}
function inc_day($date){
	$date_s=explode('-', $date);
	$inc_d=intval($date_s[2])+1;
	$inc_m=intval($date_s[1]);
	$inc_y=intval($date_s[0]);
	if(month_num($inc_m,$inc_y)<$inc_d){
		$inc_d="01";
		$inc_m=$inc_m+1;
	}
	else{
		if($inc_d<10){
			$inc_d="0".$inc_d;
		}
	}
	if(12<$inc_m){
		$inc_m="01";
		$inc_y=$inc_y+1;
	}
	else{
		if($inc_m<10){
			$inc_m="0".$inc_m;
		}
	}
	return $inc_y."-".$inc_m."-".$inc_d;
	
}
function month_num($month,$year){
	$num_days=30;
	if(intval($month)==2){
		if(intval($year)%4==0 &&(intval($year)%400==0 ||intval($year)%100!=0)){
			$num_days=28;
		}
		else{
			$num_days=29;
		}
	}
	else if(intval($month)==4||intval($month)==6||intval($month)==9||intval($month)==8){
		$num_days=31;
	}
	return $num_days;
};
?>