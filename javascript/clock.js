var session_num = 25;
var break_num = 5;
var time = new Date(session_num*60000);
var interval;
var on_break = false;
var is_playing = false;
var max_time = 30;

$(document).ready(function(){
	displayTime();	
	playerControls();
	sessionControls();
	breakControls();
});

function play(){
	togglePlay(true);
	interval = setInterval(function(){
		time = new Date(time - 1000);
		if(time <= 0){
			Rest();
		}
		displayTime();
	}, 1000);
}

function displayTime(){
	if(is_playing){
		$(".session_timer_data").text(session_num);
		$(".break_timer_data").text(break_num);
		$(".timer").text(fillZeroes(time.getMinutes()) + ":" + fillZeroes(time.getSeconds()));
	}else{
		updateSession();
		$(".session_timer_data").text(session_num);
		$(".break_timer_data").text(break_num);
		$(".timer").text(fillZeroes(time.getMinutes()) + ":" + fillZeroes(time.getSeconds()));
	}
}

function togglePlay(on_play){
	if(on_play){
		$(".play").off("click");
	}else{
		$(".play").on("click", play);
	}	
	is_playing = on_play;
}

function Rest(){
	alert("Time to swicth!");
	on_break = !on_break;
	if(on_break){
		time = new Date(break_num*60000);
	}else{
		time = new Date(session_num*60000);
	}

	displayTime();
	play();
}

function fillZeroes(t){
    t = t+"";
    if(t.length==1)
        return "0" + t;
    else
        return t;
}

function sessionControls(){
	$(".add_session").on("click", function(){
		session_num = checkNumber(session_num+1);
		displayTime();
	});

	$(".minus_session").on("click", function(){
		session_num = checkNumber(session_num-1);
		displayTime();
	});
}

function breakControls(){
	$(".add_break").on("click", function(){
		break_num = checkNumber(break_num+1);
		displayTime();
	});

	$(".minus_break").on("click", function(){
		break_num = checkNumber(break_num-1);
		displayTime();
	});
}

function updateSession(){
	time = new Date(session_num*60000);
}

function checkNumber(number){
	if(number>0 && number <= max_time){
		return number;
	}else if(number > max_time) {
		return 1;
	}else{
		return max_time
	}	
};

function playerControls(){
	$(".play").on("click", function(){
		play();
	});

	$(".stop").on("click", function(){
		clearInterval(interval);
		updateSession();
		togglePlay(false);
		displayTime();
	});

	$(".pause").on("click", function(){
		clearInterval(interval);
		togglePlay(false);

	});

	$(".reset").on("click", function(){
		updateSession();
		displayTime();
	})
}
