var sampdata = ["123431512343151234",
				"332333214233321423",
				"332142214233321423",
				"431243143314312431",
				"431322143132313221",
				"432153243215324532",
				"435121143512114351",
				];

var hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
			 '5 PM', '6 PM','7 PM','8 PM','9 PM','10 PM','11 PM','12 AM','1 AM'];

var days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

/* days describe at string of 18 nums (1-5, 5 different intensities)
 * starts at 8am ends at 1am*/
function Overlay (mon, tues, wed, thurs, fri, sat, sun) {
	this.mon = mon;
	this.tues = tues;
	this.wed = wed;
	this.thurs = thurs;
	this.fri = fri;
	this.sat = sat;
	this.sun = sun;
}

window.onload = function(){

	realignCal2();

	var tLightgray = "rgba(211,211,211,.4)";
	var tBlack = "rgba(0,0,0,.4)";

	var lvl1 = "rgba(50,0,0,.3)";
	var lvl2 = "rgba(100,0,0,.3)";
	var lvl3 = "rgba(150,0,0,.3)";
	var lvl4 = "rgba(200,0,0,.3)";
	var lvl5 = "rgba(250,0,0,.3)";

	var c = document.getElementById("cal");
	var ctx = c.getContext("2d");


	ctx.fillStyle = tBlack;


	for(var i = 0; i < 19; i++){


		for(var j = 0; j < 8; j++){
			if(i == 0 || j== 0){
				ctx.fillStyle = tBlack;
				var time = hours[i-1];
				var day = days[j-1];
				if(j == 0 && i > 0) ctx.fillText(time, 0, 24+i*28);
				if(i == 0 && j > 0) ctx.fillText(day, j*51, 25);
			} else {
				
				var color = "lvl";

				var test = sampdata[2];
				var fda = test.charAt(2);
				color = color + (sampdata[j-1]).charAt(i-1);

				console.log(color);

				ctx.fillStyle = eval(color);

			}

			ctx.fillRect(0+j*51,0 + 28*i,50,27);
		}

	}
}

/*
 * info describes how to draw cal2, the overlay calendar
 * comes in the form of an overlay object, constructor at top
 * example: var info = {
 * 				mon = 1241252152543,	
 * 			}
 */

var drawCal2 = function(info){
	var c = document.getElementById("cal");
	var ctx = c.getContext("2d");

	


}
var realignCal2 = function(){
	var d = document.getElementById('cal');

	var c = document.getElementById('cal2');
	c.style.left = (d.offsetLeft) + "px";
	c.style.top = (d.offsetTop) + "px";
	
}