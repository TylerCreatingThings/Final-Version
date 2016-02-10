<?php
include 'linked_day.php';
include 'date_calc.php';

const sleep_pir=7;

function algorithm($user_num){
	$conect=connect_acc();
	$conect->query("DELETE FROM `schedule` WHERE `User_#`='$user_num'");
	disconnect($conect);
	$mon=reader_g($user_num,'M');
	$mon->sleep_insert();
	$mon->excer_insert();
	write($mon,"0000-00-00",'M',$user_num);
	$tues=reader_g($user_num,'T');
	$tues->sleep_insert();
	$tues->excer_insert();
	write($tues,"0000-00-00",'T',$user_num);
	$wed=reader_g($user_num,'W');
	$wed->sleep_insert();
	$wed->excer_insert();
	write($wed,"0000-00-00",'W',$user_num);
	$thurs=reader_g($user_num,'R');
	$thurs->sleep_insert();
	$thurs->excer_insert();
	write($thurs,"0000-00-00",'R',$user_num);
	$fri=reader_g($user_num,'F');
	$fri->sleep_insert();
	$fri->excer_insert();
	write($fri,"0000-00-00",'F',$user_num);
	$sat=reader_g($user_num,'S');
	$sat->sleep_insert();
	$sat->excer_insert();
	write($sat,"0000-00-00",'S',$user_num);
	$sun=reader_g($user_num,'U');
	$sun->sleep_insert();
	$sun->excer_insert();
	write($sun,"0000-00-00",'U',$user_num);
	$list=algorithm_s($user_num);
}
function write($list,$date,$type,$user_n){
	$conect=connect_acc();
	while(($event=$list->pop())!=null){
		
		$info=$event->readDay();
		$start=$date." ".$info[1];
		$end=$date." ".$info[2];
		$res=$conect->query("INSERT INTO `schedule`(`Name`, `User_#`, `Start`, `End`, `TYPE`) VALUES ('$info[0]','$user_n','$start','$end','$type')");
		
	}
	disconnect($conect);
}


function reader_g($user_num,$day){
	$conect=connect_acc();
	$list=new linked_day();
	if($result=$conect->query("SELECT * FROM `Event` WHERE `USER_#`='$user_num' AND `DAY`='$day' ORDER BY 'PRIORTY' ASC" )){
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				$time_s=explode(' ', $row['TIME_BEGIN']);
				$time_e=explode(' ', $row['TIME_END']);
				$time_bs=$row['BUFF_BEGIN'];
				$time_be=$row['BUFF_END'];
				if(($buf_time_b=time_diff($time_bs,$time_s[1]))<=$time_s[1]){
					$list->add("free time",$buf_time_b,$time_s[1]);
				}
				else{
					$list->add("free time","00:00:00",$time_s[1]);
				}
				$list->add($row['EVENT_NAME'],$time_s[1],$time_e[1]);
				if(($buf_time_a=time_add($time_be,$time_e[1]))>=$time_e[1]){
					$list->add("free time",$time_e[1],$buf_time_a);
				}
				else{
					$list->add("free time",$time_e[1],"23:59:59");
				}
			}
		}
	}
	disconnect($conect);
	return $list;
}

function algorithm_s($user_num){
	$conect=connect_acc();
	$array = array();
	if( $result=$conect->query("SELECT * FROM `Event` WHERE `USER_#`='$user_num' AND (`DAY`='D' OR `DAY`='C') ORDER BY 'TIME_BEGIN' ASC" )){
		if ($result->num_rows > 0) {
			$early_date=null;
			while($row = $result->fetch_assoc()) {
				if($early_date<$row['TIME_BEGIN']){
					$date_time_s=explode(' ',$row['TIME_BEGIN']);
					$date_time_e=explode(' ',$row['TIME_END']);
					$date_start=$date_time_s[0];
					$date_end=$date_time_e[0];
					while($date_start<=$date_end){
						$date_com=explode('-',$date_start);
						$day_week=dayoftheweek($date_com[0],$date_com[1],$date_com[2]);
						$early_date=$date_start." 00:00:00";
						$end_date=$date_start." 23:59:59";
						$sleep_set=false;
						if($result2=$conect->query("SELECT *  FROM `Event` WHERE `USER_#`='$user_num' AND (`DAY`='$day_week' OR `DAY`='C' OR `DAY`='D' OR (`TIME_BEGIN`<='$end_date' AND `TIME_END`>='$early_date')) ORDER BY 'PRIORTY' ASC" )){
							if ($result2->num_rows > 0) {
								$list=new linked_day();
								while($row2=$result2->fetch_assoc()) {
									if($date_end." 23:59:59" < $row2['TIME_END']){
										$date_time_e=explode(' ',$row2['TIME_END']);
										$date_end=$date_time_e[0];
									}
									$date_time_b=explode(' ',$row2['TIME_BEGIN']);
									$date_time_e=explode(' ',$row2['TIME_END']);
									$time_b=$date_time_b[1];
									$time_e=$date_time_e[1];
									if($row2['DAY']!="C"){
										if($early_date>row2['TIME_BEGIN']&&$end_date<$row2['TIME_END']){
											$list->add($row2['EVENT_NAME'],"00:00:00","23:59:59");
										}
										elseif($early_date<$row2['TIME_BEGIN']){
											$list->add($row2['EVENT_NAME'],"00:00:00",$time_e);
											$list->add($row2['EVENT_NAME'],$time_e,$row2['BUFF_END'] );
										}
										elseif($end_date<$row2['TIME_END']){
											$list->add($row2['EVENT_NAME'],$row2['BUFF_BEGIN'],$time_b);
											$list->add($row2['EVENT_NAME'],$time_b,"23:59:59");
										}
										else{
											$list->add($row2['EVENT_NAME'],$row2['BUFF_BEGIN'],$time_b);
											$list->add($row2['EVENT_NAME'],$time_b,$time_e);
											$list->add($row2['EVENT_NAME'],$time_e,$row2['BUFF_END'] );
										}
									}
									else{
										if($sleep_set==false){
											$sleep_set=true;
											$list->sleep_insert();
										}
										switch($row2['EVENT_NAME']){
											case 0:
												$study_time="03:00:00";
											break;
											case 3:
												$study_time="01:30:00";
											break;
											case 6:
												$study_time="01:00:00";
											break;
											default:
												$study_time="00:30:00";
											break;
										}					
										$list->fill_time($study_time,$row2['EVENT_NAME']);
									}
								}
								if($sleep_set==false){
									$sleep_set=true;
									$list->sleep_insert();
								}
								$list->excer_insert();
								write($list,$date_start,'D',$user_num);
							}
						}
						$date_start=inc_day($date_start);
					}
				}
			}
		}
	}
	disconnect($conect);
}

?>