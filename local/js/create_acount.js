var userErr ="*";
var passErr ="*";
var cpassErr ="*";
var emailErr ="";
var phonErr ="";
var c_err=true;
var err="";

$("#eruser").text(userErr);
$("#erpass").text(passErr);
$("#ercpass").text(cpassErr);
$("#result").text(err);

var check_username=function(){
	var username =document.getElementById("Username").value;
	var notAllow = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
    var err=false;
	if(username.length==0){
		userErr="please input a username!";
		err=true;
	}
	else if(username.length>20 || username.length<6){
		userErr="please input a username with more than 6 characters and less than 20!";
		err=true;
	}
	else if(checker(notAllow,username)==false){
		userErr="invalid characters!";
		err=true;
	}
	else{
		userErr="*";
	}
	$("#eruser").text(userErr);
	return err;
};

var check_pasword=function(){
	var password =document.getElementById("Password").value;
	var notAllow = "~`+=-[]\\\';,/{}|\":<>?";
	var err=false;
    if(password.length==0){
		passErr="please input a password!";
		err=true;
	}
	else if(password.length>12 || password.length<6){
		passErr="please input a password with more than 6 characters and less than 12!";
		err=true;
	}
	else if(checker(notAllow,password)==false){
		passErr="invalid characters!";
		err=true;
	}
	else{
		passErr="*";
	}
	$("#erpass").text(passErr);
	return err;
};

document.getElementById("C_Password").addEventListener("keyup", function(){
	var password =document.getElementById("Password").value;
	var cpassword =document.getElementById("C_Password").value;

	if(cpassword.length==0){
		cpassErr="*";
		document.getElementById("ercpass").style.color = "red";
		c_err=true;
	}
	else if(password!=cpassword ){
		cpassErr="doesn't match";
		document.getElementById("ercpass").style.color = "red";
		c_err=true;
	}
	else{
		cpassErr="match!";
		document.getElementById("ercpass").style.color = "green";
		c_err=false;
	}
	$("#ercpass").text(cpassErr);
});

var checker=function(check,value){
	var i=0;
	var res=true;
	if(check.length!=0){
		while(i<check.length && res){
			if(value.indexOf(check[i])>-1){
				res=false;
			}
			i++;
		}
	}
	return res;
};

var Submit=function(){
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
            }
        };
		xmlhttp.open("POST", "http://localhost/function.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("functionname=add&username="+username+"&password="+password);
	}
};