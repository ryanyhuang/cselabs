var fs = require('fs');

var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

var date = {
	day: 1,
	hour: 0,
	minute: 0
};
var toWrite = "";

var dueDate = 2;

var last = "0000000000000000000000000000000000000000000000000000";
var toAdd = "";
var dayPUse;

var hourFactor = function(hour){
	if(hour >= 0 && hour < 8){
		return .1;
	} else if(hour >= 8 && hour < 10){
		return (9/20)*hour - 7/2;
	} else if(hour >= 10 && hour < 17){
		return 1;
	} else if(hour >= 17 && hour < 19){
		return (3/20)*hour - 31/20;
	} else if(hour >= 19 && hour < 23){
		return 1.4;
	} else if(hour >= 23 && hour < 24){
		return (-7/5)*hour + 33;
	} 
}

for(var i = 1; i <= 4032; i++){
	var printHour = date.hour;
	var printMinute = date.minute;

	if(date.hour < 10){
		printHour = "0" + date.hour;
	}
	if(date.minute < 10){
		printMinute = "0" + date.minute;
	}

	var labInfo = date.day + " " + printHour + " " + printMinute + "|";
	var pUse = 4;
	/*day factors*/
	/*
	Time of day
		-2am-10am: *.1
		-10am-7pm: *1
		-7pm-11pm: *1.5
		-11pm-2am: *.8
	Day
	-sunday-thurs: *1.2
	-fri-sat: *1*/
	pUse = pUse*hourFactor(date.hour);
	if(date.day == dueDate){
		pUse= pUse*1.7;
	}
	if(date.day == dueDate-1){
		pUse = pUse*1.1;
	}
	if(date.day == dueDate+1){
		pUse = pUse*.8;
	}

	/*end day factors*/
	dayPUse = pUse;
	for(var seat = 1; seat <= 84; seat++){
		/*seat factors*/
		if(last.charAt(seat) == 1){
			pUse = pUse*1.5;
		}

		/*end seat factors*/
		var chance = Math.random()*10;
		if(chance < pUse){
			toAdd += "1";
		} else {
			toAdd += "0";
		}
		/*reset probability*/
		pUse = dayPUse;
	}

	/*add to raw data file*/
	labInfo += (toAdd + "\n");
	last = toAdd;
	toAdd = "";

	fs.appendFileSync("./rawdata.txt", labInfo);
	//toWrite += labInfo;

	/*create time of next iteration*/
	date.minute += 5;
	if(date.minute == 60){
		date.minute = 0;
		date.hour++;
	}
	if(date.hour == 24){
		date.hour = 0;
		date.day++;
	}
	if(date.day == 7){
		date.day = 0;
	}

}
