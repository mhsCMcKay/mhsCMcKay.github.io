var x1 = 0
var x2 = 0
var x3 = 0
var x4 = 0
var x5 = 0
var x6 = 0
var x7 = 0
var x8 = 0
var x9 = 0
var x10 = 0
var x11 = 0
var pX = 360
var pY = 25
var draw1 = 0
var draw2 = 0
var draw3 = 0
var draw4 = 0
var draw5 = 0
var draw6 = 0
var draw7 = 0
var draw8 = 0
var draw9 = 0
var draw10 = 0
var choseRand = 0
var $draw = 0
var $ms = 1
var gameOver = 0
var score = 0
var slowMow = 0
var objSpeed = 2
var timesCalled = 0
var bgRed = 0
var bgGreen = 0
var bgBlue = 0

function setup() {
  createCanvas(400,60);
  let $drawNum = ['1'];
  frameRate(60);
}

function draw() {



  drawBackground()

  callRandomHole();

  ifNotHoleDraw();

  rect(x11,51,4,4);
  x11 = x11 + objSpeed;
  timesCalled = timesCalled + 1
  if (x11 >= 400) {
    x11 = 0
    score = score + 1;
    timesCalled = 0
  }

  fill(0);
  rect(pX,pY,2,2);

  if (pY >= 49) {
    pY = 48;
  }

  if (pY <= 0) {
    pY = 1;
  }

  if (gameOver == 1) {
    score = score - 1;
    noLoop();
    fill(255);
    rect(0,0,400,51);
    fill(0);
    textSize(50);
    text('Your score is:',30,45);
    text(score,350,45);
  }

  print("Score:",score,"gameOver:",gameOver)
  runSlowMow();
}

function drawObj(x,y) {
  x = x + objSpeed*timesCalled;
  rect(x,y,4,4);
}

function detectObj(y) {
  if (((((((pY === y-2 || pY === y-1) || pY === y) || pY === y+1) || pY === y+2) || pY === y+3) || pY === y+4) && (x11 >= 358 && x11 <= 362)) {
    gameOver = 1
  }
}

function runSlowMow() {
  slowMow = slowMow - 1;
  if (slowMow <= 0) {
    slowMow = 0;
  }
  if (slowMow <= 120) {
    frameRate(60);
  }

  if (score == 15) {
    objSpeed = 2.2;
    bgRed = 150;
    bgGreen = 20;
    bgBlue = 20;
  }

  if (score == 30) {
    objSpeed = 2.4;
    bgRed = 130;
    bgGreen = 20;
    bgBlue = 70;
  }

  if (score == 45) {
    objSpeed = 2.6;
    bgRed = 130;
    bgGreen = 0;
    bgBlue = 130
  }

  if (score == 60) {
    objSpeed = 2.8;
    bgRed = 70;
    bgGreen = 20;
    bgBlue = 130;
  }

  if (score == 75) {
    objSpeed = 3;
    bgRed = 20;
    bgGreen = 20;
    bgBlue = 150;
  }
}

function drawBackground() {
  noStroke();
  fill(255);
  rect(0,1,400,5);
  fill(155);
  rect(0,6,400,5);
  fill(255);
  rect(0,11,400,5);
  fill(155);
  rect(0,16,400,5);
  fill(255);
  rect(0,21,400,5);
  fill(155);
  rect(0,26,400,5);
  fill(255);
  rect(0,31,400,5);
  fill(155);
  rect(0,36,400,5);
  fill(255);
  rect(0,41,400,5);
  fill(155);
  rect(0,46,400,5);
  fill(255);
  rect(0,51,400,5);
  fill(bgRed,bgGreen,bgBlue,40)
  rect(0,0,400,60);
  fill(0);
  stroke(0)
}

function callRandomHole() {
  if (x11 >= 385) {
    if (choseRand <= 1) {
      draw1 = 1;
      draw2 = 1;
      draw3 = 1;
      draw4 = 1;
      draw5 = 1;
      draw6 = 1;
      draw7 = 1;
      draw8 = 1;
      draw9 = 1;
      draw10 = 1;
      $draw = round(random(0.5,10.5));
      choseRand = 2;

    }
  }

  if (x11 <=50) {
    choseRand = 1;
  }

  if ($draw === 1) {
    draw1 = 0;
  }

  if ($draw === 2) {
    draw2 = 0;
  }

  if ($draw === 3) {
    draw3 = 0;
  }

  if ($draw === 4) {
    draw4 = 0;
  }

  if ($draw === 5) {
    draw5 = 0;
  }

  if ($draw === 6) {
    draw6 = 0;
  }

  if ($draw === 7) {
    draw7 = 0;
  }

  if ($draw === 8) {
    draw8 = 0;
  }

  if ($draw === 9) {
    draw9 = 0;
  }

  if ($draw === 10) {
    draw10 = 0;
  }
}

function ifNotHoleDraw() {
  if (draw1 === 1) {
    drawObj(x1,1);
    detectObj(1)
  }

  if (draw2 === 1) {
    drawObj(x2,6);
    detectObj(6)
  }

  if (draw3 === 1) {
    drawObj(x3,11)
    detectObj(11)
  }

  if (draw4 === 1) {
    drawObj(x4,16)
    detectObj(16)
  }

  if (draw5 === 1) {
    drawObj(x5,21)
    detectObj(21)
  }

  if (draw6 === 1) {
    drawObj(x6,26)
    detectObj(26)
  }

  if (draw7 === 1) {
    drawObj(x7,31)
    detectObj(31)
  }

  if (draw8 === 1) {
    drawObj(x8,36)
    detectObj(36)
  }

  if (draw9 === 1) {
    drawObj(x9,41)
    detectObj(41)
  }

  if (draw10 === 1) {
    drawObj(x10,46)
    detectObj(46)
  }
}

function keyPressed() {

  if (keyCode === UP_ARROW) {
    pY = pY - $ms;
  } else if (keyCode === DOWN_ARROW) {
    pY = pY + $ms;
  } else if (keyCode === LEFT_ARROW) {
    $ms = $ms - 1;
  } else if (keyCode === RIGHT_ARROW) {
    $ms = $ms + 1;
  } else if (keyCode === ENTER) {
    if (slowMow <= 0) {
      frameRate(30);
      slowMow = 180;
    }
  }
  if ($ms < 1) {
    $ms = 1;
  }
}
