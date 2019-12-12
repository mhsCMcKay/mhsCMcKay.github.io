var ballX = 400
var ballY = 100
var ballSize = 30
var xSpeed = -3
var ySpeed = -3

var paddleOneY = 270
var paddleTwoY = 270

var paddleOneX = 10
var paddleTwoX = 775

var pOneSpeed = 5
var pTwoSpeed = 5

var paddleOneSize = 60
var paddleTwoSize = 60

var paddleCollideLeft = false
var paddleCollideRight = false

var playerOneScore = 0
var playerTwoScore = 0

var tempTimer = 0

var menu = 1

var classic = 0
var powerBall = 0

var backgroundColour = 0
var backgroundColourChange = 1

var paddleLeftTimer = 0
var paddleRightTimer = 0

var resetTimer = 0
var ballColour = -1

var powerUpTimer = 0
var powerUpChoice = 0


function setup() {
  // put setup code here
  createCanvas(800,600);
}

function draw() {
  if (menu == 1) {
    background(0);

    textSize(40)
    fill(255)
    text('Press [1] for Classic mode',170,200)
    text('or [2] for PowerBall',230,240)
  }

  resetTimer = resetTimer - 1;

  if (resetTimer <= 0) {
    frameRate(60);
  }

  if (menu == 0) {
    frameRate(1)
    resetTimer = 3;
    menu = -1;
  }

  if (powerBall == 1) {
    displayBackgroundPB();

    if (resetTimer > 0) {
      fill(255)
      textSize(150);
      text(resetTimer,355,250)
    }

    moveBall();
    bouncePB();
    drawBallPB();

    movePaddleOnePB();
    movePaddleTwoPB();

    displayPaddleOnePB();
    displayPaddleTwoPB();

    paddleLeftTimer = paddleLeftTimer - 1
    paddleRightTimer = paddleRightTimer - 1

    powerUpTimer = powerUpTimer + 1;
    print(powerUpTimer)

    powerUps();
  }


  if (classic == 1) {
    displayBackground();

    if (resetTimer > 0) {
      fill(255)
      textSize(150);
      text(resetTimer,355,250)
    }

    moveBall();
    bounce();
    drawBall();

    movePaddleOne();
    movePaddleTwo();

    displayPaddleOne();
    displayPaddleTwo();

    paddleLeftTimer = paddleLeftTimer - 1
    paddleRightTimer = paddleRightTimer - 1

    tempTimer = tempTimer + 1;
    if (tempTimer == 120) {
      if (xSpeed == 3) {
        xSpeed = 5;
      } else if (xSpeed == -3) {
        xSpeed = -5;
      }
      if (ySpeed == 3) {
        ySpeed = 5;
      } else if (ySpeed == -3) {
        ySpeed = -5;
      }
    }
  }
}

function keyPressed() {
  if (menu == 1) {
    if (keyCode == 49) {
      classic = 1;
      menu = 0;
    } else if (keyCode == 50) {
      powerBall = 1;
      menu = 0;
    }
  }
}

function displayBackground() {
  background(0);
  rect(395,0,10,40);
  rect(395,80,10,40);
  rect(395,160,10,40);
  rect(395,240,10,40);
  rect(395,320,10,40);
  rect(395,400,10,40);
  rect(395,480,10,40);
  rect(395,560,10,40);

  textSize(75)
  text(playerTwoScore,550,80)
  text(playerOneScore,200,80)
}

function moveBall() {
  ballX = ballX + xSpeed;
  ballY = ballY + ySpeed;
}

function bounce() {
  if (ballX > 790) {
    playerOneScore = playerOneScore + 1
    resetLeft();
  } else if (ballX < 10) {
    playerTwoScore = playerTwoScore + 1
    resetRight();
  }

  if (ballY > 585 || ballY < 15) {
    ySpeed = -ySpeed
  }
  paddleCollideLeft = collideRectCircle(paddleOneX,paddleOneY,15,paddleOneSize,ballX,ballY,ballSize);
  paddleCollideRight = collideRectCircle(paddleTwoX,paddleTwoY,15,paddleTwoSize,ballX,ballY,ballSize);

  if (paddleLeftTimer <= 0) {
    if (paddleCollideLeft == true) {
      xSpeed = -xSpeed;
      paddleLeftTimer = 60;
    }
  }
  if (paddleRightTimer <= 0) {
    if (paddleCollideRight == true) {
      xSpeed = -xSpeed;
      paddleRightTimer = 60;
    }
  }
}

function drawBall() {
  ellipse(ballX,ballY,ballSize)
}

function movePaddleOne() {
  if (keyIsDown(87)) {
    paddleOneY = paddleOneY - 5;
  } else if (keyIsDown(83)) {
    paddleOneY = paddleOneY + 5;
  }
  if (paddleOneY >= (600-paddleOneSize)) {
    paddleOneY = (600-paddleOneSize);
  } else if (paddleOneY <= 0) {
    paddleOneY = 0;
  }
}

function movePaddleTwo() {
  if (keyIsDown(38)) {
    paddleTwoY = paddleTwoY - 5;
  } else if (keyIsDown(40)) {
    paddleTwoY = paddleTwoY + 5;
  }
  if (paddleTwoY >= (600-paddleTwoSize)) {
    paddleTwoY = (600-paddleTwoSize);
  } else if (paddleTwoY <= 0) {
    paddleTwoY = 0;
  }
}

function displayPaddleOne() {
  rect(10,paddleOneY,15,60);
}

function displayPaddleTwo() {
  rect(775,paddleTwoY,15,60);
}

function resetLeft() {
  resetTimer = 3;
  frameRate(1);
  ballX = 400;
  ballY = 500;
  xSpeed = 3;
  ySpeed = 3;
  powerUpTimer = 0 + round((playerOneScore + playerTwoScore)/2)*10;
  tempTimer = 0;
  paddleOneX = 10;
  paddleOneY = 270;
  paddleTwoX = 775;
  paddleTwoY = 270;
  pTwoSpeed = 5;
  pOneSpeed = 5;
  powerUpChoice = 0;
}

function resetRight() {
  resetTimer = 3;
  frameRate(1);
  ballX = 400;
  ballY = 100;
  xSpeed = -3;
  ySpeed = -3;
  powerUpTimer = 0 + round((playerOneScore + playerTwoScore)/2)*10;
  tempTimer = 0;
  paddleOneX = 10;
  paddleOneY = 270;
  paddleTwoX = 775;
  paddleTwoY = 270;
  pTwoSpeed = 5;
  pOneSpeed = 5;
  powerUpChoice = 0;
}

function displayBackgroundPB() {
  background(backgroundColour);
  if (backgroundColourChange == 1) {
    backgroundColour = backgroundColour + 0.10;
  } else {
    backgroundColour = backgroundColour - 0.10;
  }
  if (backgroundColour >= 40) {
    backgroundColourChange = 0;
  } else if (backgroundColour <= 0) {
    backgroundColourChange = 1;
  }
  fill(random(0,255),random(0,255),random(0,255));
  rect(395,0,10,40);
  rect(395,80,10,40);
  rect(395,160,10,40);
  rect(395,240,10,40);
  rect(395,320,10,40);
  rect(395,400,10,40);
  rect(395,480,10,40);
  rect(395,560,10,40);

  textSize(75);
  fill(255,0,0);
  text(playerTwoScore,550,80);
  fill(0,0,255);
  text(playerOneScore,200,80);
}

function bouncePB() {
  if (ballX > 790) {
    playerOneScore = playerOneScore + 1
    resetLeft();
  } else if (ballX < 10) {
    playerTwoScore = playerTwoScore + 1
    resetRight();
  }

  if (ballY > (600-(ballSize/2)) || ballY < ballSize/2) {
    ySpeed = -ySpeed
  }
  paddleCollideLeft = collideRectCircle(paddleOneX,paddleOneY,15,paddleOneSize,ballX,ballY,ballSize);
  paddleCollideRight = collideRectCircle(paddleTwoX,paddleTwoY,15,paddleTwoSize,ballX,ballY,ballSize);

  print(paddleCollideLeft, paddleCollideRight)
  if (paddleLeftTimer <= 0) {
    if (paddleCollideLeft == true) {
      xSpeed = -xSpeed;
      paddleLeftTimer = 30;
      if (xSpeed >= 3) {
        xSpeed = xSpeed + 0.25;
      } else if (xSpeed <= -3) {
        xSpeed = xSpeed - 0.25;
      }
      if (ySpeed >= 3) {
        ySpeed = ySpeed + 0.25;
      } else if (ySpeed <= -3) {
        ySpeed = ySpeed - 0.25;
      }
    }
  }
  if (paddleRightTimer <= 0) {
    if (paddleCollideRight == true) {
      xSpeed = -xSpeed;
      paddleRightTimer = 30;
      if (xSpeed >= 3) {
        xSpeed = xSpeed + 0.25;
      } else if (xSpeed <= -3) {
        xSpeed = xSpeed - 0.25;
      }
      if (ySpeed >= 3) {
        ySpeed = ySpeed + 0.25;
      } else if (ySpeed <= -3) {
        ySpeed = ySpeed - 0.25;
      }
    }
  }
}

function drawBallPB() {

  if (paddleCollideLeft == true) {
    ballColour = 1;
  }
  if (paddleCollideRight == true) {
    ballColour = 0;
  }

  if (ballColour == -1) {
    fill(255);
  } else if (ballColour == 0) {
    fill(255,0,0);
  } else if (ballColour == 1) {
    fill(0,0,255)
  }
  ellipse(ballX,ballY,ballSize)
}

function movePaddleOnePB() {
  if (keyIsDown(87)) {
    paddleOneY = paddleOneY - pOneSpeed;
  } else if (keyIsDown(83)) {
    paddleOneY = paddleOneY + pOneSpeed;
  }
  if (keyIsDown(65)) {
    paddleOneX = paddleOneX - pOneSpeed;
  } else if (keyIsDown(68)) {
    paddleOneX = paddleOneX + pOneSpeed;
  }
  if (paddleOneX >= 775) {
    paddleOneX = 775;
  } else if (paddleOneX <= 10) {
    paddleOneX = 10;
  }
  if (paddleOneY >= (600-paddleOneSize)) {
    paddleOneY = (600-paddleOneSize);
  } else if (paddleOneY <= 0) {
    paddleOneY = 0;
  }
}

function movePaddleTwoPB() {
  if (keyIsDown(38)) {
    paddleTwoY = paddleTwoY - pTwoSpeed;
  } else if (keyIsDown(40)) {
    paddleTwoY = paddleTwoY + pTwoSpeed;
  }
  if (keyIsDown(37)) {
    paddleTwoX = paddleTwoX - pTwoSpeed;
  } else if (keyIsDown(39)) {
    paddleTwoX = paddleTwoX + pTwoSpeed;
  }
  if (paddleTwoX >= 775) {
    paddleTwoX = 775;
  } else if (paddleTwoX <= 10) {
    paddleTwoX = 10;
  }
  if (paddleTwoY >= (600-paddleTwoSize)) {
    paddleTwoY = (600-paddleTwoSize);
  } else if (paddleTwoY <= 0) {
    paddleTwoY = 0;
  }
}

function displayPaddleOnePB() {
  fill(0,0,255)
  rect(paddleOneX,paddleOneY,15,paddleOneSize);
}

function displayPaddleTwoPB() {
  fill(255,0,0)
  rect(paddleTwoX,paddleTwoY,15,paddleTwoSize);
}

function powerUps() {
  if (powerUpTimer >= 1200) {
    powerUpTimer = 0;
    powerUpChoice = round(random(1,3.1));
  }
  if (powerUpChoice == 1) {
    fill(255);
    textSize(40);
    text("Large Paddles!",268,50);
    paddleTwoSize = 120;
    paddleOneSize = 120;
  } else if (powerUpChoice == 2) {
    fill(255);
    textSize(40)
    text("Speed Boost!",275,50);
    pTwoSpeed = 7;
    pOneSpeed = 7;
  } else if (powerUpChoice == 3) {
    fill(255);
    textSize(40)
    text("Slow Down!",280,50);
    pTwoSpeed = 3;
    pOneSpeed = 3;
    if (xSpeed > 0) {
      xSpeed = 3
    } else if (xSpeed < 0) {
      xSpeed = -3
    }
    if (ySpeed > 0) {
      ySpeed = 3
    } else if (ySpeed < 0) {
      ySpeed = -3
    }
  } else if (powerUpChoice == 4) {

  } else if (powerUpChoice == 5) {

  }
}
