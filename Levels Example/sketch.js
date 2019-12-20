/*
We will initially set the level variable to 0
Level 0 --> Instructions
Level 1 --> Game
Level 2 --> Win Screen
*/
let level = 0;

var playerHP = 3

//Create the x and y variables for our character
let playerX;

let playerSize

let ballX;
let ballY;

let xSpeed;
let ySpeed;

var changingXSpeed;
var changingYSpeed;

let angle;

//Create a variable that will store our image
let img;

var brickNumberY = 0;
var brickNumberX = 0;

var numberOfBricks = 48;

var ballRotation = 1;

var levelsCompleted = 1;

var timer = 0;

let bricks = [];

function preload() {
  //Assign the image file to the variable
  img = loadImage('hammer.png');
}


function setup() {
  // put setup code here
  //Create the canvas
  createCanvas(800,600);

  for (let i = 0; i < 156; i++) {
    bricks.push(new Brick());
  }

  //Assign the initial values for x and y
  x = width/2;
  y = height/2;
}

function draw() {
  // put drawing code here

/*-----------------INSTRUCTIONS---------------*/
  if (level == 4) {
    background(0);      // Alligns Instructions and Title
    fill(255);
    textAllign(CENTER, CENTER);
    textSize(32);
    text('INSTRUCTIONS', width/2, height/2)

    text('LEFT ARROW ---> Move Left \n RIGHT ARROW ---> Move Right \n UP ARROW ---> Increase Angle \n DOWN ARROW ---> Decrease LEFT_ARROW',width/2, height/2+50);
    // Text that explains Game
    text('Press enter to Play', width/2, height/2+100);

    // if Enter is pressed, move to first level
    if (keyIsDown(ENTER)) {
      playerSize = 80;
      level+=1;
      ballX = 300;
      ballY = 300;
      playerX = 400
      xSpeed = 3;
      ySpeed = 5;
      changingXSpeed = 3;
      changingYSpeed = 5;
      angle = 0;
      brickNumberX = 0;
      brickNumberY = 0;
      for (let i = 0; i < numberOfBricks; i++) {
        bricks[i].reset()
      }
      // Creates the array of bricks.
    }
  }


/*---------------END-INSTRUCTIONS-------------*/


/*--------------------STARTSCREEN--------------------*/
  if (level ===0) {
    //Show the instructions to the user
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text('Demolitionist', width/2, height/2);

    textSize(16);
    text('You are a Demolitionist. See how many levels of bricks you can defeat without loosing your hammer! \n Press TAB for instructions', width/2, height/2+50);
    text('Press enter to Play', width/2, height/2+100);

    // if Tab is pressed, move to INSTRUCTIONS level
    if (keyIsDown(9)) {
      level = 4;
    }

    // if Enter is pressed, move to first level
    if (keyIsDown(ENTER)) {
      playerSize = 80;
      level+=1;
      ballX = 300;
      ballY = 300;
      playerX = 400
      xSpeed = 3;
      ySpeed = 5;
      changingXSpeed = 3;   // Resets all the Speed values and the editable ones to the original values.
      changingYSpeed = 5;
      angle = 0;
      brickNumberX = 0;
      brickNumberY = 0;
      for (let i = 0; i < numberOfBricks; i++) {
        bricks[i].reset()
      }
      // Resets the bricks, making them have full HP and resetting their position.
    }
  }
  /*--------------------END STARTSCREEN--------------------*/


  /*--------------------GAME--------------------*/
  else if (level ===1) {
    if (xSpeed < 0) {
      changingXSpeed = -abs(changingXSpeed)
    } else if (xSpeed > 0) {
      changingXSpeed = abs(changingXSpeed)
    }
    // Setting the changable XSpeed to be relative to the object's movements. (If the object is moving Right, the changingXSpeed becomes positive & vice verca for Moving Left.)

    // Change the background and add the player
    background(0);
    stroke(0);
    fill(255)
    rect(playerX,520,playerSize,20);
    stroke(255);

    // Adds in the Line that shows what angle the object will bounce off your pad at.
    line(playerX+(changingXSpeed*10)+(playerSize/2),520-abs(ySpeed*10),playerX+(playerSize/2),520)
    stroke(0);


    brickExists = 0;
    // Sets the Brick Exists Variable to zero. All the bricks change this variable to 1 if they have HP left. So if none have HP, it will stay zero and the next level will occur.

    ballX = ballX + xSpeed;
    ballY = ballY + ySpeed;

    //Move the character based on input from the user (arrow keys)
    if (keyIsDown(RIGHT_ARROW)) {
      playerX+=5;
    }

    if (keyIsDown(LEFT_ARROW)) {
      playerX-=5;
    }

    // Changes the XSpeed that you change.
    if (keyIsDown(DOWN_ARROW)) {
      if (changingXSpeed < 0) {
        changingXSpeed = changingXSpeed + 0.1;
      } else if (changingXSpeed > 0) {
        changingXSpeed = changingXSpeed - 0.1;
      }
    }

    if (keyIsDown(UP_ARROW)) {
      if (changingXSpeed < 0) {
        changingXSpeed = changingXSpeed - 0.1;
      } else if (changingXSpeed > 0) {
        changingXSpeed = changingXSpeed + 0.1;
      }
    }
    // Sets the number of Bricks that should be displayed (Max of 156)
    if (numberOfBricks < 156) {
      numberOfBricks = 24 + (levelsCompleted*12)
    }

    for (let i = 0; i < numberOfBricks; i++) {
      bricks[i].display();
      bricks[i].collision();
    }
    // Displays the bricks that are allowed to be displayed

    angle = angle + 0.1;

    /* Displays the Rotating Hammer. First it sets the center of the creen to be at the ball's position, then it rotates by the angle,
      It then displays the hammer in the center of the screen. Finally, it rotates back by the amount it initially rotated by, and
      the custom settings are reset (Push and Pull functions)

    */
    if (ballRotation == 1) {
      push();
      translate(ballX,ballY)
      rotate(-angle);
      imageMode(CENTER);
      image(img,0,0,40,40);
      rotate(angle);
      pop();
    } else if (ballRotation == 2) {
      push();
      translate(ballX,ballY)
      rotate(angle);
      imageMode(CENTER);
      image(img,0,0,40,40);
      rotate(-angle);
      pop();
    }
    // Two different Rotation Modes. One rotations clockwise, the other counterclockwise.

    if (playerX >= 800-playerSize) {
      playerX = 800-playerSize;
    }
    if (playerX <= 0) {
      playerX = 0;
    }
    // If the player attemps to go off screen, it moves them back onto the screen.

    ballCollided = collideRectCircle(playerX,520,playerSize,20,ballX,ballY,25);
    // Checks if the ball Collided with the player

    if (ballX > 800-(25/2)) {
      xSpeed = -xSpeed;
      ballRotation = 1;
    } else if (ballX < 0+25/2) {
      xSpeed = -xSpeed;
      ballRotation = 2;
    }
    // If the bakk attempts to go off screen (left or Right), it will bounce off the edge of the screen.

    if (ballY < 0+(25/2)) {
      ySpeed = -ySpeed
    }

    // changes YSpeed if the ball touches the top of the screen

    if (ballCollided == true) {
      ySpeed = changingYSpeed;
      xSpeed = changingXSpeed;
      ySpeed = -ySpeed;
    }

    // makes the ball bounce off the player. It also sets the ball speed to be equal to the amount set by the player.

    if (brickExists == 0) {
      level = 3;
    }
    // If no bricks exist, it goes to level end.

    if (ballY >= 620) {
      loseLife();
    }
    // if the ball goes off the bottom of the screen, it runs the LoseLife function.

    if (timer > 0) {
      textSize(150)
      fill(0,255,0,85)
      text(timer,400,250)
    }
    // displays the countdown timer if the Timer is above 0.


    if (timer == 0) {
      frameRate(60);
      changingXSpeed = 3;
      changingYSpeed = levelsCompleted*0.5 + 4.5;
      xSpeed = 1.5;
      ySpeed = 2.5;
    }
    // once the timer hits 0, it will return the game to normal speed and allow the ball to move.

    timer = timer - 1;

    if (playerHP == -1) {
      background(255,0,0);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(32);
      text('GAME OVER', width/2, height/2);
      textSize(16);
      text('You completed '+levelsCompleted+' level(s) before you lost.', width/2, height/2+50);
      noLoop();
    }
    // If the player loses all three lives and loses once more, the game will be over.
  }
  /*--------------------END GAME--------------------*/

  /*--------------------WIN SCREEN--------------------*/
  else if (level===3) {
    //Change the backround and inform the user that they have beaten a level.
    background(0,255,0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text('You have completed '+levelsCompleted+' level(s)', width/2, height/2);
    textSize(16);
    text('Press enter to continue', width/2, height/2+50);

    //If the user presses enter, reset the x and y value and reset the level to the first level. Also adds one to the Levels Completed Variable
    if (keyIsDown(ENTER)) {
      x=width/2;
      y=height/2;
      level=0;
      levelsCompleted = levelsCompleted + 1;
    }
  }
  /*--------------------END WIN SCREEN--------------------*/


}


function loseLife() {
  ballX = 350;
  ballY = 300;
  xSpeed = 0;
  ySpeed = 0;
  playerHP = playerHP - 1;
  frameRate(1);
  timer = 3;
}
// loseLife function. Sets the FPS to 1, timer to 3, and makes the ball unable to move also while moving the ball into the screen.
// Plus it subtracts one from the player's HP

class Brick {
  constructor() { // Creates all the variables for the brick Object to use.
    this.x = 12+brickNumberX*65
    this.y = 40+brickNumberY*22
    this.brickCollided = false
    this.hp = 2;
    brickNumberX = brickNumberX + 1 //Increases this global variable by one. This variable dictates the X value of the bricks.
    if (brickNumberX > 11) { // Once there has been 12 bricsk placed on one Y level, it resets the X value and changes the Y.
      brickNumberX = 0;
      brickNumberY = brickNumberY + 1;
    }
  }
  display() {
    if (this.hp == 2) { // Displays the brick as white if it has 2 hp.
      fill(255);
      rect(this.x,this.y,60,20)
    } else if (this.hp == 1) { // Displays as Grey if it has 1 hp.
      fill(155);
      rect(this.x,this.y,60,20)
    }
    if (this.hp > 0) { // if The brick has ANY hp, it will change the variable of 'brickExists' to one, so that the game will continue
      brickExists = 1;
    }
  }
  collision() {
    if (this.hp > 0) {
      this.brickCollided = collideRectCircle(this.x,this.y,60,20,ballX,ballY,25);
      if (this.brickCollided == true) {
        ySpeed = -ySpeed;
        ballX = ballX + xSpeed;
        ballY = ballY + ySpeed;
        this.hp = this.hp - 1;
      }
      // if the brick collides with the hammer, the brick loses HP. The ball also is moved and the ySpeed inverted.
    }
    if (keyIsDown(46)) {
        if (this.hp > 0) {
          this.hp = this.hp -1 //Cheat code of pressing DELETE to reduce HP of the bricks.
      }
    }
  }
  reset() { // Resets all values of the brick and makes it draw itself again.
    this.hp = 2;
    this.x = 12+brickNumberX*65
    this.y = 40+brickNumberY*22
    brickNumberX = brickNumberX + 1
    if (brickNumberX > 11) {
      brickNumberX = 0;
      brickNumberY = brickNumberY + 1;
    }
  }
}
