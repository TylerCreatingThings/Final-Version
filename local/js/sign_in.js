$("#eruser").text("*");
$("#erpass").text("*");

var check_username=function(){
	var username =document.getElementById("Username").value;
	var err=false;
	var userErr="*";
	if(username.length==0){
		userErr="please input a username!";
		err=true;
	}
	$("#eruser").text(userErr);
	return err;
};

var check_pasword=function(){
	var password =document.getElementById("Password").value;
	var err=false;
	var passErr="*";
    if(password.length==0){
		passErr="please input a password!";
		err=true;
	}
	$("#erpass").text(passErr);
	return err;
};

var Login=function(){
	var res_pass=check_username();
	var res_user=check_pasword();
	
	if (!res_pass && !res_user){
		var username =document.getElementById("Username").value;
		var password =document.getElementById("Password").value;
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var u_num=xmlhttp.responseText;
				if(u_num.charAt(0)=="S"){
					localStorage.setItem("u_num",u_num.substring(1));
					localStorage.setItem("lastpage", window.location.pathname);
					document.location.href = "homepage.html";
				}
				else{
					$("#result").text(u_num);
				};
            };
        };
		xmlhttp.open("POST", "http://localhost/function.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("functionname=login&username="+username+"&password="+password);
	}
};