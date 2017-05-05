
/*  Original Code by Jaap de Maat & Sion Fletcher - CSM GCD BA Y1 Unit 3 - Jan 2017
    edited by Florrie Macleod - ADD DATA
*/


var api = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22';
var apiKey = '%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
var units = '&units=metric';
var input;


function setup() {
  //set Canvas to size of window
  
  createCanvas(windowWidth, windowHeight);
  
  background(0);
  

  var button = select('#submit');
  button.mousePressed(askforweather);
  
  input = select('#city');
  //resizeCanvas(750, 800);
}
function askforweather() {
  var url = api + input.value() + apiKey + units;
   loadJSON(url,
  weatherLoaded);
}


function weatherLoaded(data) {
  
  // console.log(data);

  var tempF = data.query.results.channel.item.condition.temp;
  var tempC = int((tempF-32)/1.8)
  var windSpeed = data.query.results.channel.wind.speed;
  var windDirection = data.query.results.channel.wind.direction;
  
  //forcast data
  var tempD2H = data.query.results.channel.item.forecast[0].high;
  var tempD2L = data.query.results.channel.item.forecast[0].low;

// HOW to get avarage of tempD2H+tempD2L?
//var tempforcast1 = ((tempD2H+tempD2L)/2);

   var conditions = data.query.results.channel.item.condition.text;

 switch(conditions) {
    case 'Partly Cloudy': {
      background (220,220,220)
  } break;
  case 'Sunny': {
      background (230, 179, 61)
  } break;
  case 'Rain and Snow': {
      background (192,192,192)
  } break;
  case 'Mostly Cloudy': {
      background (169,169,169)
  } break;
  case 'Mostly Sunny': {
      background (228, 191, 120)
  } break;
  case 'Breezy': {
      background (119,136,153)
  } break;
  case 'Cloudy': {
      background (211,211,211)
  } break;
  case 'Rain': {
      background (0,0,139)
  } break;
  case 'Scattered Showers': {
      background (70,130,180)
  } break;
  case 'Clear': {
      background (135,206,250)
  } break;
  case 'Scattered Thunderstorms': {
      background (25,25,112)
  } break;
  case 'Showers': {
      background (65,105,225)
  } break;
  
}

//put conditions text on screen

fill(255,255,255)
  textSize(30);
  strokeWeight(1);
  stroke(255,255,255);
  text(conditions, windowWidth/2, windowHeight*0.8);




  

  
  
  textSize(15);
  textFont("Helvetica");
  textAlign(RIGHT);
     


fill(255,255,255)
  textSize(20);
  strokeWeight(1);
  stroke(255,255,255);
  text("Wind Speed", windowWidth/2.3, windowHeight*0.05);
  
  //create ellipse and set width and height of the ellipse to windSpeed data
  fill(255);
  noStroke();
  ellipse(windowWidth / 2.5, windowHeight / 2, windSpeed * 10, windSpeed * 10);
  
  fill(40,40,170)
  textSize(50);
  strokeWeight(1);
  stroke(255,255,255);
  text(windSpeed, 20+windowWidth/2.5, windowHeight/2);
  textSize(20);
  text("Km/h", 20+windowWidth/2.5, 30+windowHeight/2);
  
  
   //create ellipse that moves up and down a line using temp data, will move up for higher temp and down for lower temp
   
   //draw line
  strokeWeight(4);
  stroke(100,100,255);
  line(windowWidth/8, windowHeight*0.1, windowWidth/8, windowHeight*0.9)
  
     //draw line to mark 0 degress
  strokeWeight(4);
  stroke(100,100,255);
  line((windowWidth/8)-10, windowHeight*0.7, (windowWidth/8)+10, windowHeight*0.7)
  
   //put tempC value in ellipse
  
  fill(255,255,255)
  textSize(20);
  strokeWeight(1);
  stroke(255,255,255);
  text("Temp °C", windowWidth/6, windowHeight*0.05);
  
     //text for 0 degress marker
  
  fill(255,255,255)
  textSize(20);
  strokeWeight(1);
  stroke(255,255,255);
  text("0 °C", (windowWidth/8)-20, windowHeight*0.7);
  
  //draw ellipse and fill according to tempC, warmer is more red, cooler is more blue
  
  fill(50+(5*tempC),66,(200-5*tempC));
  strokeWeight(1);
  stroke(0,0,255);
  ellipse(windowWidth / 8, windowHeight*(0.7-(tempC/75)), 50, 50);
  
  //put tempC value in ellipse
  
  fill(255,255,255);
  textSize(20);
  strokeWeight(1);
  stroke(255,255,255)
  text(tempC, (windowWidth/8)+10, windowHeight*(0.7-(tempC/75))+5)
  
  
   text("Wind Direction", 230+windowWidth/2, windowHeight*0.05);
  
  translate(150+windowWidth / 2, windowHeight / 2);
  fill(255,0,0);
  noStroke();
  
  
  //wind direction arrow
  fill(255,255,255)
  textSize(20);
  strokeWeight(1);
  stroke(255,255,255);
  
  
  
  push();
  fill(255,0,0);
  strokeWeight(0);
  angleMode(DEGREES);
  rotate(windDirection);
  beginShape ();
  vertex (-20,0);
  vertex (-20,-130);
  vertex (-40,-130);
  vertex (0,-170);
  vertex (40,-130);
  vertex (20,-130);
  vertex (20,0);
  endShape (CLOSE);
  pop();
  
  push();
  fill(0,0,0)
  angleMode(DEGREES);
  // angleMode(DEGREES); // Change the mode to DEGREES
  // // console.log(windDirection);
  rotate(windDirection - 270);
  noStroke()
   textStyle(BOLD);
   textFont("arial");
   textSize(16);
text(windDirection+"°", -25, 5);
 
  pop();
  // textSize(12);
  
 
 


}
