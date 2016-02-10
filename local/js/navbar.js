var Back=function(){
	var lastpage = localStorage.getItem("lastpage");
	if (lastpage!= null){
		document.location.href = lastpage;
		localStorage.setItem("lastpage", window.location.pathname);
	}
};

var Create_account=function(){
	localStorage.setItem("lastpage", window.location.pathname);
	document.location.href = "Create_account.html";
};
var Login_page=function(){
	localStorage.setItem("lastpage", window.location.pathname);
	document.location.href = "login_page.html";
};

var home_page=function(){
	localStorage.setItem("lastpage", window.location.pathname);
	document.location.href = "homepage.html";
};
var Add_page=function(){
	localStorage.setItem("lastpage", window.location.pathname);
	document.location.href = "Add_Event.html";
};
var Edit_page=function(){
	localStorage.setItem("lastpage", window.location.pathname);
	document.location.href = "Edit_Event.html";
};
var display_calender=function(){
	localStorage.setItem("lastpage", window.location.pathname);
	document.getElementById("S_D").value;
	document.getElementById("S_D").value;
	localStorage.setItem("calenderinfo", window.location.pathname);
	document.location.href = "Add_Event.html";
};