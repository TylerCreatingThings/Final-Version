var Event_page=function(type_e){
	localStorage.setItem("lastpage", window.location.pathname);
	localStorage.setItem("addpage", type_e);
	document.location.href = "Event.html";	
};
var date_check= function(){
	if($('#D_S_2').val()!=""){
		if($('#D_E_2').val() == $('#D_S_2').val()){
			var end_time=increment_time_hr($('#T_S_2').val());
			$('#T_E_2').attr('min',end_time);
			$("#T_E_2").trigger("datebox", {"method":"dorefresh"});
			$('#T_E_2').datebox('applyMinMax');
			if($('#T_S_2').val()>$('#T_E_2').val()){
				$('#T_E_2').val(end_time);
			}
			else{
				$('#T_E_2').attr('min',null);
				$("#T_E_2").trigger("datebox", {"method":"dorefresh"});
				$('#T_E_2').datebox('applyMinMax');
			}
		}
		var end_day=$('#D_S_2').val();
		if(end_day!=""){
			var end_c_time=$('#T_E_2').val();
			if(end_c_time!=""){
				var end_hr=end_c_time.split(":");
				if(parseInt(end_hr[0])==0){
					end_day=increment_day(end_day);
				}
			}
			$('#D_E_2').attr('min',end_day);
			$("#D_E_2").trigger("datebox", {"method":"dorefresh"});
			$('#D_E_2').datebox('applyMinMax');
			if(end_day>$('#D_E_2').val()){
				$('#D_E_2').val(end_day);
			}
		}
	}
};
var display = function(){
	var page=localStorage.getItem("addpage");
	if(page == "edit"){
		edit_passed_event();
	}
	var page=localStorage.getItem("addpage");
	switch_time();
	switch(page){
		case 'work':
			$("#timeframe").show();
			$("#week").show()
			$("#single_day").hide();
			$("#2_days").hide();
			$("#due_days").hide();
			$("#type").show();
			$("#imp").hide();
			break;
		case "test":
			$("#timeframe").hide();
			$("#week").hide()
			$("#single_day").hide();
			$("#2_days").hide();
			$("#due_days").show();
			$("#type").hide();
			$("#imp").show();
			break;
		case "app":
			$("#timeframe").hide();
			$("#week").hide()
			$("#single_day").show();
			$("#2_days").hide();
			$("#due_days").hide();
			$("#type").show();
			$("#imp").hide();
			break;
		case "per":
			$("#timeframe").hide();
			$("#week").hide()
			$("#single_day").show();
			$("#2_days").hide();
			$("#due_days").hide();
			$("#type").show();
			$("#due").hide();
			$("#imp").show();
			break;
		case "vaca":
			$("#timeframe").hide();
			$("#week").hide()
			$("#single_day").hide();
			$("#2_days").show();
			$("#due_days").hide();
			$("#type").show();
			$("#due").hide();
			$("#imp").hide();
			break;
		default :
			$("#timeframe").hide();
			$("#week").hide()
			$("#single_day").hide();
			$("#2_days").hide();
			$("#due_days").hide();
			$("#type").hide();
			$("#due").hide();
			$("#imp").hide();
			break;
	}
};

var edit_passed_event=function(){
	var event = localStorage.getItem("event", event).split(",");
	var day = event[4];
	$("#name").val(event[0]);
	if(event[5]=="00:30:00")
	{
		$("#formal").val("Casual");
	}
	else{
		$("#formal").val("Formal");
	}
	
	if(day == "D")
	{
		//Day Case
		localStorage.setItem("addpage",'vaca');
		//Set Values
		$("#imp_def").val(event[1]);
		var time_start = event[3].split(" ");
		var time_end = event[2].split(" ");
		$("#D_S_2").val(time_start[0]);
		$("#D_E_2").val(time_end[0]);
		$("#T_S_2").val(time_start[1]);
		$("#T_E_2").val(time_end[1]);

	}
	else if(day == "C")
	{
		//Test Case
		localStorage.setItem("addpage",'study');
	
		//Set Values
		$("#imp_def").val(event[1]);
		var time_end = event[2].split(" ");
		$("#due").val(time_end[0]);

		
	}
	else
	{
		localStorage.setItem("addpage",'work');
		var time_end = event[2].split(" ");
		var time_start = event[3].split(" ");
		switch(day){
				case "M":
					$("#M_S").val(time_start[1]);
					$("#M_E").val(time_end[1]);
					break;
				case "T":
					$("#T_S").val(time_start[1]);
					$("#T_E").val(time_end[1]);
					break;
				case "W":
					$("#W_S").val(time_start[1]);
					$("#W_E").val(time_end[1]);				
					break;
				case "R":
					$("#R_S").val(time_start[1]);
					$("#R_E").val(time_end[1]);				
					break;
				case "F":
					$("#F_S").val(time_start[1]);
					$("#F_E").val(time_end[1]);				
					break;
				case "S":
					$("#S_S").val(time_start[1]);
					$("#S_E").val(time_end[1]);				
					break;
				case "U":
					$("#U_S").val(time_start[1]);
					$("#U_E").val(time_end[1]);				
					break;					
		}
	}
}

var switch_time= function() {
    if( $("#set").val() == "Week"){
        $("#week").show()
		$("#single_day").hide();
    }
	else{
		$("#week").hide();
		$("#single_day").show();
	}
};

var pirorty= function(){
	var priority;
	var page=localStorage.getItem("addpage");
	switch(page){
		case 'work':
			priority = 4;
			break;
		case "test":
			priority = $("#imp_def").val();
			break;
		case "app":
			priority = 1;
			break;
		case "per":
			priority = $("#imp_def").val();
			break;
		case "vaca":
			priority = 2;
			break;
		default :
			priority = 7;
			break;
	}
	return priority;
	
};
var time_check= function(start,end){
	var end_time=$(start).val();
	$(end).attr('min',end_time);
	$(end).trigger("datebox", {"method":"dorefresh"});
	$(end).datebox('applyMinMax');
	if($(start).val()>$(end).val()){
		$(end).val(end_time);
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
var week_pull=function(name,buffer_start,buffer_end,u_num){
	if($("M_S").val()!="" && $("M_E").val()!=""){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = xmlhttp.responseText;
				alert(result);
			}
		};
		xmlhttp.open("POST", "http://localhost/add_entry.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+"0000:00:00"+$("#M_S").val()+"&time_end="+"0000:00:00"+$("#M_E").val()+"&day="+'M'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);
	}
	if($("T_S").val()!="" && $("T_E").val()!=""){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = xmlhttp.responseText;
				alert(result);
			}
		};
		xmlhttp.open("POST", "http://localhost/add_entry.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+"0000:00:00"+$("#T_S").val()+"&time_end="+"0000:00:00"+$("#T_E").val()+"&day="+'T'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);
	}
	if($("W_S").val()!="" && $("W_E").val()!=""){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = xmlhttp.responseText;
				alert(result);
			}
		};
		xmlhttp.open("POST", "http://localhost/add_entry.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+"0000:00:00"+$("#W_S").val()+"&time_end="+"0000:00:00"+$("#W_E").val()+"&day="+'W'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);

	}
	if($("R_S").val()!="" && $("R_E").val()!=""){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = xmlhttp.responseText;
				alert(result);
			}
		};
		xmlhttp.open("POST", "http://localhost/add_entry.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+"0000:00:00"+$("#R_S").val()+"&time_end="+"0000:00:00"+$("#R_E").val()+"&day="+'R'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);

	}
	if($("F_S").val()!="" && $("F_E").val()!=""){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = xmlhttp.responseText;
				alert(result);
			}
		};
		xmlhttp.open("POST", "http://localhost/add_entry.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+"0000:00:00"+$("#F_S").val()+"&time_end="+"0000:00:00"+$("#F_E").val()+"&day="+'F'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);

	}
	if($("S_S").val()!="" && $("S_E").val()!=""){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = xmlhttp.responseText;
				alert(result);
			}
		};
		xmlhttp.open("POST", "http://localhost/add_entry.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+"0000:00:00"+$("#S_S").val()+"&time_end="+"0000:00:00"+$("#S_E").val()+"&day="+'S'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);

	}
	if($("U_S").val()!="" && $("U_E").val()!=""){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var result = xmlhttp.responseText;
				alert(result);
			}
		};
		xmlhttp.open("POST", "http://localhost/add_entry.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+"0000:00:00"+$("#U_S").val()+"&time_end="+"0000:00:00"+$("#U_E").val()+"&day="+'U'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);

	}
}

var add_event= function(){
	var u_num=sessionStorage.getItem("u_num");
	var page=localStorage.getItem("addpage");
	var name="";
	if((name=$("#name").val())!=''){
		//formal buffering times
		if($("#formal").val() == "Formal"){
			buffer_start = '01:00:00';
			buffer_end = '01:00:00';
		}
		else
		{
			//Casual Buffering times
			buffer_start = '00:30:00';
			buffer_end = '00:30:00';		
		}
	switch(page){
		
		case 'work':
			if($("#timeframe").val()=="Week"){
				week_pull(name,buffer_start,buffer_end,u_num);
			}
			else{
				if($("#S_D_S").val()!="" && $("#S_T_E").val()!="" && $("#S_T_S").val()!=""){
					var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var result = xmlhttp.responseText;
						alert(result);
					}
				};
				xmlhttp.open("POST", "http://localhost/add_entry.php", true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+$("#S_D_S").val()+$("#S_T_S").val()+"&time_end="+$("#S_D_S").val()+$("#S_T_E").val()+"&day="+'D'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);
		
				}
			}
			break;
		case "test":
			if($("#due").val()!=""){
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var result = xmlhttp.responseText;
						alert(result);
					}
				};
				xmlhttp.open("POST", "http://localhost/add_entry.php", true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				var currentdate = new Date(); 
				xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+currentdate.getFullYear()+"-"+(currentdate.getMonth()+1)+"-"+currentdate.getDate()+" 00:00"+"&time_end="+$("#due").val()+" 00:00"+"&day="+'C'+"&buff_start="+"00:00:00"+"&buff_end="+"00:00:00"+"&username="+u_num);
			}
			break;
		case "app":
			if($("#S_D_S").val()!="" && $("#S_T_E").val()!="" && $("#S_T_S").val()!=""){
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var result = xmlhttp.responseText;
						alert(result);
					}
				};
				xmlhttp.open("POST", "http://localhost/add_entry.php", true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+$("#S_D_S").val()+" "+$("#S_T_S").val()+"&time_end="+$("#S_D_S").val()+" "+$("#S_T_E").val()+"&day="+'D'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);
			}
			break;
		case "per":
			if($("#D_S_2").val()!="" && $("#D_E_2").val()!="" && $("#T_S_2").val()!=""&& $("#T_E_2").val()!=""){
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var result = xmlhttp.responseText;
						alert(result);
					}
				};
				xmlhttp.open("POST", "http://localhost/add_entry.php", true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+$("#D_S_2").val()+" "+$("#T_S_2").val()+"&time_end="+$("#D_E_2").val()+" "+$("#T_E_2").val()+"&day="+'D'+"&buff_start="+buffer_start+"&buff_end="+buffer_end+"&username="+u_num);
			}
			break;
		case "vaca":
			if($("#D_S_2").val()!="" && $("#D_E_2").val()!="" && $("#T_S_2").val()!=""&& $("#T_E_2").val()!=""){
				var xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						var result = xmlhttp.responseText;
						alert(result);
					}
				};
				xmlhttp.open("POST", "http://localhost/add_entry.php", true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send("name="+name+"&value="+pirorty()+"&time_start="+$("#D_S_2").val()+" "+$("#T_S_2").val()+"&time_end="+$("#D_E_2").val()+" "+$("#T_E_2").val()+"&day="+'D'+"&buff_start="+"00:00:00"+"&buff_end="+"00:00:00"+"&username="+u_num);
			}
			break;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			alert(result);
		}
	};
	xmlhttp.open("POST", "http://localhost/function.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("functionname=update_sch&u_num="+u_num);
	}
}
