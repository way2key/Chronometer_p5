var elapsedTime = 0;
var timer;
var webcamId = [];

var stream1 = true;
var stream2 = false;
var chrono = false;

function preload() {
  digit = loadFont('DS-DIGIB.ttf');
  science = loadFont('Science.otf');
  img = loadImage('FLL_logo.png');
}

function setup() {
	createCanvas(1280, 800);

	navigator.mediaDevices.enumerateDevices()
	.then(function(devices) {
		devices.forEach(function(device) {
			if(device.kind=="videoinput"){
				webcamId.push(device.deviceId);
			}
		});
	})
	webcam_1 = createCapture({ video: { deviceId: { exact: webcamId[0] } } });
	webcam_2 = createCapture({ video: { deviceId: { exact: webcamId[2] } } });
	webcam_1.hide();
	webcam_2.hide();
	timer = new timer(150);
	textFont(digit);
}


function draw() {
	clear();
	background(155);
	if(stream1){
		image(webcam_1, 0, 0, width, height);
	}
	if(stream2){
		image(webcam_2, 0, 0,width,height);
	}

	//title
		textFont(science);
	textSize(175);
	textAlign(CENTER,TOP);
	fill(255, 10, 0, 200);
	//text("Remise des prix", width * 0.5, height * 0.15);


	//timer
	textFont(digit);
	textAlign(CENTER, BASELINE);
	timer.clock();

	if(chrono){
		fill(30,20,20,170);
		rect(260,50, width * 0.6, height * 0.7);
		timer.draw();
		//logo
		image(img, width * 0.25, height * 0.1);
	}
}



function timer(temps){
	this.time = temps;
	this.startTime = 0;
	this.begin = false;
   	this.end = false;
   	this.elapsedTime = 0;
	this.interval = setInterval(this.clock, 1000);

	this.start = function() {
   		timer.startTime = millis();
   		timer.begin = true;
   }

   this.reset = function() {
   		this.startTime = 0;
   		this.begin = false;
   		this.end = false;
   }

   this.draw = function() {

   	if(this.time - this.elapsedTime < 11  && this.begin){
   		fill(255,0,0);
   		textSize(width / 4);
   	}else{
   		textSize(width / 4);
   		fill(255, 140, 0);
   	}
   	
   	if(this.end){
		text(this.format(0), width/2, height*0.7);
   	}
   	else if(this.begin){
   		text(this.format(this.time - this.elapsedTime), width/2, height*0.7);
   	}else{
   	   	text(this.format(this.time), width/2,height*0.7);
   	}
   }

	this.clock = function() {
		this.elapsedTime = floor((millis() - this.startTime) / 1000);
		if(this.begin){
			if(this.elapsedTime >= this.time){
			this.end = true;
			}
		}

	}

	this.format = function(seconds) {
		seconds = abs(seconds);
		let min = floor(seconds / 60);
		let second = seconds % 60;
		return nf(min,2) + ':' + nf(second,2);
	}
}

function keyPressed(){
	if(keyCode === 82){
		timer.reset();
	}
	if(keyCode === 83){
		timer.start();
	}
	if(keyCode === 13){
		chrono = !chrono;
	}
}
	
