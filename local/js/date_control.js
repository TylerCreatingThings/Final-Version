var date_check= function(){
	if($('#S_D').val()!=""){
		if($('#E_D').val() == $('#S_D').val()){
			var end_time=increment_time_hr($('#S_T').val());
			$('#E_T').attr('min',end_time);
			$("#E_T").trigger("datebox", {"method":"dorefresh"});
			$('#E_T').datebox('applyMinMax');
			if($('#S_T').val()>$('#E_T').val()){
				$('#E_T').val(end_time);
			}
			else{
				$('#E_T').attr('min',null);
				$("#E_T").trigger("datebox", {"method":"dorefresh"});
				$('#E_T').datebox('applyMinMax');
			}
		}
		var end_day=$('#S_D').val();
		if(end_day!=""){
			var end_c_time=$('#E_T').val();
			if(end_c_time!=""){
				var end_hr=end_c_time.split(":");
				if(parseInt(end_hr[0])==0){
					end_day=increment_day(end_day);
				}
			}
			$('#E_D').attr('min',end_day);
			$("#E_D").trigger("datebox", {"method":"dorefresh"});
			$('#E_D').datebox('applyMinMax');
			if(end_day>$('#E_D').val()){
				$('#E_D').val(end_day);
			}
		}
	}
};

var increment_time_hr = function(time){
	var time_sec=time.split(":");
	var inc_hr=parseInt(time_sec[0])+1;
	if (parseInt(inc_hr)>=24){
		inc_hr="0";
	}
	return inc_hr+":"+time_sec[1];
};
var increment_day = function(c_d){
	var date=c_d.split("-");
	var inc_d=parseInt(date[2])+1;
	var inc_m=parseInt(date[1]);
	var inc_y=parseInt(date[0]);
	if(month_num(inc_m,inc_y)<inc_d){
		inc_d="01";
		inc_m=inc_m+1;
	}
	else{
		if(inc_d<10){
			inc_d="0"+inc_d;
		}
	}
	if(12<inc_m){
		inc_m="01";
		inc_y=inc_y+1;
	}
	else{
		if(inc_m<10){
			inc_m="0"+inc_m;
		}
	}
	return inc_y+"-"+inc_m+"-"+inc_d;
};

var month_num = function(month,year){
	var num_days=30;
	if(parseInt(month)==2){
		if(parseInt(year)%4==0 &&(parseInt(year)%400==0 ||parseInt(year)%100!=0)){
			num_days=28;
		}
		else{
			num_days=29;
		}
	}
	else if(parseInt(month)==4||parseInt(month)==6||parseInt(month)==9||parseInt(month)==8){
		num_days=31;
	}
	return num_days;
};
var display_hd =function(){
	if (localStorage.getItem("u_num")!=null){
		if(errorcheck){
			var u_num =localStorage.getItem("u_num");
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					$("#home_head").text("Welcome "+xmlhttp.responseText);
				}
			};
			xmlhttp.open("POST", "http://localhost/function.php", true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send("functionname=get_schedule&u_num="+u_num+"&start="+u_num+"&end="+u_num);
		}
	}
	else{
		$("#error").text("Please Re-login");
	};
};

var errorcheck=function(){
	var result=true;
	if($("#S_D").val()==""){
		$("#S_D_E").text("Please input a time");
		result=false;
	}
	else{
		$("#S_D_E").text("");
	}
	if($("#E_D").val()==""){
		$("#E_D_E").text("Please input a time");
		result=false;
	}
	else{
		$("#E_D_E").text("");
	}
	if($("#S_T").val()==""){
		$("#S_T_E").text("Please input a time");
		result=false;
	}
	else{
		$("#S_T_E").text("");
	}
	if($("#E_T").val()==""){
		$("#E_T_E").text("Please input a time");
		result=false;
	}
	else{
		$("#E_T_E").text("");
	}
	if($("#S_D").val()+$("#S_T").val()>$("#E_D").val()+$("#E_T").val()){
		$("error").text("inappropriate input");
		result=false;
	}
	else{
		$("#error").text("");
	}
	return result;
};