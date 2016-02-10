var display_events=function(){
	var user_num=localStorage.getItem("u_num");
	$.ajax({url:"http://localhost/edit_entry.php",type:"POST",data:{USER_NUM:user_num,call:0}, success:function(data){
		//Return function.
		var each_entry = data.split("~");
		var event_array= new Array(each_entry.length);
		var names = [];
		for(i=0;i<each_entry.length;i++){
			event_array[i] = each_entry[i].split("!");	
			names[i] = event_array[i][0];
		}
		
		//Remove all same entries.
		var uniqueNames = [];
		$.each(names, function(i, el){
			if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
		});
		
		
		var ul = document.getElementById("list_names");
		var uniqueEvent = [];
		//List all event names:
		for(i=0;i<uniqueNames.length-1;i++){
			var uniqueCount = 0;
			for(x=0;x<event_array.length-1;x++)
			{
				
				if(event_array[x][0] == uniqueNames[i])
				{
					uniqueEvent[uniqueCount] = event_array[x];
					uniqueCount++;
				}
			}
			$('#list_names').append($('<option>', {
				text: uniqueNames[i]
			}));

		}
		localStorage.setItem("uniqueNames", uniqueNames);
		localStorage.setItem("event_array", data);
		
		}});

};

var single_name=function(){
	
	if($("#list_names").find(":selected").text() !=""){
	var uniqueSplit = localStorage.getItem("uniqueNames", uniqueSplit);
	var uniqueNames = uniqueSplit.split(",");
	var event_array = localStorage.getItem("event_array", event_array);
	var current_event="";
	
	var each_entry = event_array.split("~");
	var event_array= new Array(each_entry.length);
	for(i=0;i<each_entry.length;i++){
			event_array[i] = each_entry[i].split("!");	
	}
	 
	for(i=0;i<uniqueNames.length-1;i++)
	{
		
		if(uniqueNames[i] == $("#list_names").find(":selected").text()){
			current_event = uniqueNames[i];
			break;
		}
	}
	
	
	for(i=0;i<event_array.length;i++)
	{
		if(event_array[i][0] == current_event){
			$('#list_event').append($('<option>', {
				value:i,
				text: event_array[i][4]
			}));
		}
		
		
	}
	}
};

var add_edit_event=function(){
		Event_page('edit');
}

var single_event=function(){
	if($("#list_event").find(":selected").text() !=""){
	var event_array = localStorage.getItem("event_array", event_array);
	var event;

	var each_entry = event_array.split("~");
	var event_array= new Array(each_entry.length);
	for(i=0;i<each_entry.length;i++){
			event_array[i] = each_entry[i].split("!");	
	}
	
	//Find the specific event selected.
	for(i=0;i<event_array.length;i++)
	{
		if(event_array[i][4] == $("#list_event").find(":selected").text() && i==$("#list_event").find(":selected").val()){
			event = event_array[i];
			break;
		}
	}
	localStorage.setItem("event", event);
	}

};

var delete_event=function(){
	var event=localStorage.getItem("event", event);
	event = event.split(",");
	var user_num=localStorage.getItem("u_num");
	var new_name = event[0];
	//delete event.
	$.ajax({url:"http://localhost/edit_entry.php",type:"POST",data:{USER_NUM:user_num,call:'1',name:new_name,day:event[4]}, success:function(data){alert(data);}});
};
