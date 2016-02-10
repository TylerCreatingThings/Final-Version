<?php

class linked_day_node{
    public $name;
	public $start;
	public $endin;
	public $next;
	
	function __construct($name,$start,$endin){
        $this->name = $name;
		$this->start = $start;
		$this->endin = $endin;
        $this->next = NULL;
    }
	
    function readDay(){
		$info=array($this->name,$this->start,$this->endin);
        return $info;
    }
}

class linked_day{
	private $head;
	private $count;
	function __construct(){
        $this->head = NULL;
        $this->count = 0;
    }
	public function add($name,$start,$endin){
		
		$node = new linked_day_node($name,$start,$endin);
		if($this->head == NULL) {
			$this->head = &$node;
		}
		else{
			$temp=$this->head;
			$b_lim="00:00:00";
			$e_lim=$temp->start;
			$pre=null;
			while($temp->next !=NULL && ($node->endin>$e_lim || $node->start<$b_lim)){
				$pre=$temp;
				$temp=$temp->next;
				$b_lim=$pre->endin;
				$e_lim=$temp->start;
			}
			if($node->endin<=$e_lim && $node->start>=$b_lim){
				if($pre==null){
					$node->next=&$temp;
					$this->head=&$node;
					$this->count++;
				}
				else{
					$pre->next=&$node;
					$node->next=&$temp;
					$this->count++;
				}
			}
			elseif($temp->next==NULL && $node->endin<="23:59:59" && $node->start>=$temp->endin){
				$temp->next=&$node;
				$this->count++;
			}
		}
	}
	public function pop(){
		$result=$this->head;
		if($result!=NULL){
			$this->head=$result->next;
			$this->count--;
		}
		return $result;
	}
	public function isempty(){
		if($this->head==null){
			$result=true;
		}
		else{
			$result=false;
		}
		return $result;
	}
	public function free_time(){	
		$array = array();
		if($this->head != NULL){
			if("00:00:00"<$this->head->start){
				$stack = array("00:00:00",$this->head->start,$this->head->start);
				array_push($array,$stack);
			}
			$temp=$this->head;
			while($temp->next !=NULL){
				if($temp->next->start > $temp->endin){
					$stack = array($temp->endin, $temp->next->start,time_diff($temp->endin,$temp->next->start));
					array_push($array,$stack);
				}
				$temp=$temp->next;
			}
			if("23:59:59">$temp->endin){
				$stack = array($temp->endin,"23:59:59",time_diff($temp->endin,"23:59:59"));
				array_push($array,$stack);
			}
		}
		else{
			$stack = array("00:00:00","23:59:59","23:59:59");
			array_push($array,$stack);
		}
		return $array;
	}
	public function sleep_insert(){
		$free=$this->free_time();
		$sleep_time="09:00:00";
		if(count($free)==1){
			$this->add("Sleep","00:00:00","07:00:00");
			$this->add("Sleep","20:00:00","23:59:59");
		}
		elseif(count($free)>1){
			if($sleep_time<=time_add($free[0][2],$free[count($free)-1][2])){
				if("07:00:00"<=$free[0][1]&&"20:00:00">=$free[count($free)-1][0]){
					$this->add("Sleep","00:00:00","07:00:00");
					$this->add("Sleep","20:00:00","23:59:59");
				}
				elseif("07:00:00"<=$free[0][1]){
					$this->add("Sleep","00:00:00",time_diff($free[count($free)-1][2],$sleep_time));
					$this->add("Sleep",$free[count($free)-1][0],"23:59:59");
				}
				else{
					$this->add("Sleep","00:00:00",$free[0][1]);
					$this->add("Sleep",time_diff(time_diff($free[0][2],$sleep_time),"23:59:59"),"23:59:59");
				}
			}
			else{
				$this->fill_time($sleep_time,"Sleep");
				}
			}
		}
	public function excer_insert(){
		$this->fill_time("01:00:00","Exercise");
	}
	public function fill_time($to_b_filled,$name){
		if(strlen($to_b_filled)>8){
			$to_b_filled<=substr($to_b_filled,8);
		}
		$free=$this->free_time();
		$largest_val="00:00:00";
		while(count($free)>=1){
			for($i=0; $i<count($free);$i++){
				if($free[$i][2]>$largest_val){
					$largest_val=$free[$i][2];
					$larg_spot=$i;
				}
			}
			if($free[$larg_spot][2]<$to_b_filled){
				$to_b_filled=time_diff($free[$larg_spot][2],$to_b_filled);
				$this->add($name,$free[$larg_spot][0],$free[$larg_spot][1]);
				$free=$this->free_time();
			}
			else{
				$this->add($name,$free[$larg_spot][0],time_add($free[$larg_spot][0],$to_b_filled));
				break;
			}
		}
	}
	public function print_it(){
		$write="";
		$temp=$this->head;
		if($temp!=null){
			while($temp->next!=null){
				$write=$write . $temp->start . " " . $temp->endin ." ";
				$temp=$temp->next;
			}
			$write=$write . $temp->start . " " . $temp->endin ." ";
		}
		return $write;
	}
}
?>