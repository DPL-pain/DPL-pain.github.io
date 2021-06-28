var Gx = 0;
var Gy = 0;
var Px = 0;
var Py = 0;
var horizontalChange = 0;
var verticalChange = 0;
var impulseResearch;
var verticaltime;
var horizontaltime;
var resultstime;
var countertime
//below array holds the times in seconds for each ship when going vertical
timeVerticals = [900,720,515,450,330,300];
var originalVerticalTime = 0; // this variable will hold original vertical time for each ship
var counterDiv = document.getElementById("counterdiv");
counterDiv.style.display = "none"
function readinputs(){
	Gx = document.getElementById("Gx").value
	Px = document.getElementById("Px").value
	Gy = document.getElementById("Gy").value
	Py = document.getElementById("Py").value

	//this code will read the selected values for research impulse
	impulseResearch = (100-(4*document.getElementById("impulseResearch").value))/100; // 4 is for %
	
	verticalChange = Math.abs(Py-Px)
	horizontalChange = Math.abs(Gx-Gy)-1
	//document.getElementById("Results").value =horizontal

	//This section is to check which ships are on the fleets

	if(document.getElementById("colonyship").checked==true){
		originalVerticalTime = timeVerticals[0]
	}else if (document.getElementById("bomber").checked==true) {
		originalVerticalTime = timeVerticals[1]
	}else if (document.getElementById("cruiser").checked==true) {
		originalVerticalTime = timeVerticals[2]
	}else if (document.getElementById("destroyer").checked==true || document.getElementById("battleship").checked==true) {
		originalVerticalTime = timeVerticals[3]
	}else if (document.getElementById("nemesis").checked==true) {
		originalVerticalTime = timeVerticals[4]
	}else if (document.getElementById("interceptor").checked==true) {
		originalVerticalTime = timeVerticals[5]
	}else{
		document.getElementById("Results").value ="Complete all Fields"
		return
	}

	verticaltime =(impulseResearch*originalVerticalTime)*(verticalChange);
	//the time without impulse is 555 second when going to next galaxy
	horizontaltime = impulseResearch*550 + 10*horizontalChange*impulseResearch

	//convert format to hhmmss
	resultstime = secondsToTime(Math.ceil(verticaltime+horizontaltime))
	var hours = resultstime.h; if (hours==0){ hours = "00"}
	var minutes = resultstime.m;
	var seconds = resultstime.s;
	//display
	document.getElementById("Results").value = ("").concat(hours,":",minutes,":",seconds);
	console.log(secondsToTime(Math.ceil(verticaltime+horizontaltime)))

	counterDiv.style.display = "block"

}

function counterattack(){

	var timeAsString = document.getElementById("counter").value
	if (timeAsString.slice(2,3)==":" && timeAsString.slice(5,6)==":"){
	var arrivalhours = timeAsString.slice(0,2)/1
    var arrivalminutes = timeAsString.slice(3,5)/1
	var arrivalseconds = timeAsString.slice(6,8)/1
	//convert to seconds using equation below
	console.log(timeAsString)
	console.log(resultstime)
	countertime = arrivalhours*60*60 + arrivalminutes*60 +arrivalseconds;
	console.log(countertime)
	console.log(arrivalhours)
	countertime = secondsToTime(countertime+Math.ceil(verticaltime+horizontaltime));
	console.log(countertime)
	var hours = countertime.h; if (hours==0){ hours = "00"} else if(hours>23){hours=hour-24}
	var minutes = countertime.m;
	var seconds = countertime.s;
	//display
	document.getElementById("counter").value = ("").concat(hours,":",minutes,":",seconds);
	}else{
		document.getElementById("counter").value = "Enter in format hh:mm:ss"
	}
}
function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}

document.getElementById("outputtime").addEventListener("click", readinputs);
document.getElementById("counterbutton").addEventListener("click", counterattack);