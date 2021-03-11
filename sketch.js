/*************************************************************************
    Fun Timer Clickable
          by Maj Jenkins

    Overview:

 
    ---------------------------------------------------------------------
    Notes: 
     (1)
**************************************************************************/


/*************************************************************************
// Global variables
**************************************************************************/

// Style (Fonts, colors)
var aubreyFont;

var colorVals = [];
// Dark Blue
colorVals[0] = '#4B80BE';
// Light Blue
colorVals[1] = '#A7C4E5';
// Lightest Blue
colorVals[2] = '#D3DEF2';
// Dark Green
colorVals[3] = '#415340';

// Images
imgList = [];

// Sounds
var quack;
var fluff;


// Buttons and timers
var duckButton;
var fishTimer;
var waitForClick = true;


/*************************************************************************
// Window resize
**************************************************************************/

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/*************************************************************************
// Function preload
**************************************************************************/
function preload() {
  // Fonts
  aubreyFont = loadFont('assets/aubrey.otf');

  // Images
  imgList[0] = loadImage('assets/ducky1.png');
  imgList[1] = loadImage('assets/ducky2.png');
  imgList[2] = loadImage('assets/fishy.png');
  imgList[3] = loadImage('assets/seaweed.png');

  // Music
  quack = loadSound('assets/quack.mp3');
  fluff = loadSound('assets/fluff.mp3');
}

/*************************************************************************
// Function setup
**************************************************************************/

function setup() {
  createCanvas(windowWidth, windowHeight);

  makeDuckButton();

  // Create a new timer with 5 second
  fishTimer = new Timer(5000);
  fishTimer.start();
 }

/*************************************************************************
// Function draw
**************************************************************************/

function draw() {
  background(colorVals[0]);
  fill(colorVals[2]);
  stroke(colorVals[2]);
  textFont(aubreyFont);
  textSize(width/25);
  textAlign(CENTER);

  // Title
  text('click the ducky', width/3, height/4);
  
  // Background
  drawSeaweed();

  // Draw button
  duckButton.draw();

  // Timer party
  fishRain();

  // fsMessage();
}


/*************************************************************************
// Duck Button
**************************************************************************/

// Decoration
function drawSeaweed() {
  for (i = 30; i <= width; i += width/10) {
    image(imgList[3], i, height-100, 100, 100);
  }
}

// Button
function makeDuckButton() {
  duckButton = new Clickable();

  // Image and text
  duckButton.image = imgList[0];
  duckButton.text = "";

  // No fill, no stroke
  duckButton.color = '#00000000';
  duckButton.stroke = '#00000000';

  duckButton.width = imgList[0].width;
  duckButton.height = imgList[0].height;

  // Position the button
  duckButton.locate(2*(width/3) - duckButton.width/2, height/2 - duckButton.height/2);
  // duckButton.locate(0,0);

  // Callback functions
  duckButton.onPress = duckButtonPressed;
  duckButton.onHover = duckButtonHover;
  duckButton.onOutside = duckButtonOutside;
}

duckButtonPressed = function () {
  duckButton.image = imgList[1];
  quack.play();

  // Change timer state to no longer wait for the mouse
  waitForClick = false;
  fishTimer.start();

  // play the song
  fluff.play();
}

duckButtonHover = function () {
  duckButton.image = imgList[1];
  drawDuckText('click for a surprise');
}

duckButtonOutside = function () {
  duckButton.image = imgList[0];
  drawDuckText('press me');
}

function drawDuckText(txt) {
  textSize(width/50);
  fill('#fff');
  textAlign(CENTER);
  text(txt, 2*(width/3), height/2 + duckButton.height/1.5);
}

/*************************************************************************
// Timer
**************************************************************************/
// Called in draw function
function fishRain() {
  if ( waitForClick ) {
    fluff.stop();
  }
  else {
    updateTimer();
  }
}

// Called if waitForClick = false
function updateTimer() {
  if (fishTimer.expired() ) {
    // stop the song playing
    if (fluff.isPlaying) {
    fluff.stop();
    }
  }
  else {
    // how much time left in the party
    text(Math.round(fishTimer.getRemainingTime()/1000), width/3, height/2);

    // fish party
    for (i = 10; i <= width; i += width/10) {
      for (j = 10; j <= width; j += width/10) {
        image(imgList[2], i, j, 100, 100);
      }
    }

  }
}




/*************************************************************************
// Fullscreen function
**************************************************************************/

// Fullscreen message
function fsMessage() {
  // if (fs === true) {
      push();
      fill(255);
      noStroke();
      textSize(width/60);
      textAlign(LEFT);
      text("Press [F] for fullscreen", 0 + width/100 , height - height/100)
      pop();
    // }
}

// keyTyped for debugMode and fullscreen
function keyTyped() {
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
 }