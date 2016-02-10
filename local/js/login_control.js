if (localStorage.getItem("u_num")!=null){
	$("#online").show();
	$("#offline").hide();
}
else{
	$("#online").hide();
	$("#offline").show();
};
var display_hd =function(){
	if (localStorage.getItem("u_num")!=null){
		var u_num =localStorage.getItem("u_num");
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                $("#home_head").text("Welcome "+xmlhttp.responseText);
            }
        };
		xmlhttp.open("POST", "http://localhost/function.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("functionname=get_user&u_num="+u_num);
	}
	else{
		$("#home_head").text("Welcome unknown please relogin");
	};
};