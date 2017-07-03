var fs = require('fs');

var rawData = fs.readFileSync("./rawData.txt", "utf8");
var dataArray = rawData.split('\n');

/*perform stats analysis*/
var avUsage240 = [];
var avUsage250 = [];
/*populate with 0s*/
for(var a = 0; a < 42; a++){
	avUsage240[a] = 0;
	avUsage250[a] = 0;
}

var avFull = [];
var avFull2 = [];
for(var c = 0; c < 7; c++){
	var toPush = [];
	for(var d = 0; d < 24; d++){
		toPush[d] = 0;
	}
	avFull.push(toPush);
	avFull2.push(toPush);
}


for(var i = 0; i < 1422; i++){
	var labInfo = dataArray[i];
	var date = labInfo.substring(0,7).split(' ');
	var day = parseInt(date[0]);
	var hour = parseInt(date[1]);

	for(var j = 0; j < 42; j++){
		if(labInfo.charAt(j+8) == "1"){
			avUsage240[j]++;
			avFull[day][hour]++;
		}
		if(labInfo.charAt(j+42+8) == "1"){
			avUsage250[j]++;
			avFull2[day][hour]++;
		}
	}
}

/*get averages*/
for(var b = 0; b < 42; b++){
	avUsage240[b] = Math.round(avUsage240[b]*5/(24*14));
	avUsage250[b] = Math.round(avUsage250[b]*5/(24*14));
}

for(c = 0; c < 7; c++){
	for(d = 0; d < 24; d++){
		avFull[c][d] = Math.round(avFull[c][d]/24);
		avFull2[c][d] = Math.round(avFull2[c][d]/24);

		if(avFull[c][d] < 10){
			avFull[c][d] = "0" + avFull[c][d];
			avFull2[c][d] = "0" + avFull[c][d];
		}
	}
}

console.log(avFull);

var statsFile = fs.readFileSync("./stats.txt", "utf8");
var statsFileArray = statsFile.split('\n');

//averages on 6 and 11
statsFileArray[7] = avUsage240.join(' ');
statsFileArray[12] = avUsage250.join(' ');

//19, 24, 29, 34, 39, 44, 49 smtwtfs average fullness of 240
statsFileArray[19] = avFull[0].join(' ');
statsFileArray[24] = avFull[1].join(' ');
statsFileArray[29] = avFull[2].join(' ');
statsFileArray[34] = avFull[3].join(' ');
statsFileArray[39] = avFull[4].join(' ');
statsFileArray[44] = avFull[5].join(' ');
statsFileArray[49] = avFull[6].join(' ');

var newStatsFile = statsFileArray.join('\n');
fs.writeFile('./stats.txt', newStatsFile);

//console.log(avUsage240.join(' '));
//console.log(avUsage250.join(' '));