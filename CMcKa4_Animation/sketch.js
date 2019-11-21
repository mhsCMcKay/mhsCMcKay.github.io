var houseX = 50
var houseY = 600
var yVelocity = 0
var xVelocity = 0
var pMS = 2
var pGravity = 0.3
var jumps = 0
var friction = 0.95
var houseWidth = 100
var $rectX1 = 600
var $rectY1 = 500
var $rectX2 = 0
var $rectY2 = 400
var $rectX3 = 200
var $rectY3 = 250
var $rectX4 = 500
var $rectY4 = 350
var $rectX5 = 100
var $rectY5 = 400
var $rectX6 = 0
var $rectY6 = 200
var lvl = 1
var lvlStart = 0

function setup() {
  // put setup code here
  createCanvas(800,600);
}

function draw() {
  /*
  Can you make a more complicated shape move around?
  Can you simulate gravity by increasing speedY every time around the draw loop?
  Can you simulate friction by decreasing speedX and speedY every time around the draw loop?
  Can you make the object bounce off other objects, not just the edges of the canvas?
  */
  // Draws Background
  background(24, 112, 120)

  if (lvl == 1) { // Only Activates the following is LVL 1 is Active

  // Object A: Bottom Right Object in LVL 1
  stroke(0);
  strokeWeight(4);
  rect($rectX1,$rectY1,200,100);
  if (houseY > $rectY1 && houseX + houseWidth > $rectX1) {
    if (jumps == 1) {
      houseY = $rectY1;
      jumps = 0;
    } else {
      houseY = $rectY1;
      jumps = 0;
      yVelocity = 0;
    }
  } // Object A

    // Object B: Object that is on the far right and middle y.
    stroke(0);
    strokeWeight(4);
    rect($rectX2,$rectY2,200,25);
    if ((houseY > $rectY2 && houseY < $rectY2 + 50) && (houseX + houseWidth > $rectX2 && houseX < $rectX2 + 200)) {
      if (jumps == 1) {
        houseY = $rectY2;
        jumps = 0;
      } else {
        houseY = $rectY2;
        jumps = 0;
        yVelocity = 0;
      }
    } // Object B

    // Object D: lvl End Circle (Green Circle)
    stroke(64, 181, 43);
    strokeWeight(10);
    fill(106, 240, 81);
    ellipse(450,200,100,100);
    if (houseY < $rectY3-10 && (houseX > 380 && houseX < 420)) {
      lvl = 2;
    } // Object D: Lvl End Circle

    // Object C Object: Middle Thin object (Green circle is on it)
    stroke(0);
    strokeWeight(4);
    fill(255);
    rect($rectX3,$rectY3,300,25);
    if ((houseY > $rectY3 && houseY < $rectY3 + 50) && (houseX + houseWidth > $rectX3 && houseX < $rectX3 + 300)) {
      if (jumps == 1) {
        houseY = $rectY3;
        jumps = 0;
      } else {
        houseY = $rectY3;
        jumps = 0;
        yVelocity = 0;
      }
    } // Object C
  }

  if (lvl == 2 && lvlStart == 1) { // Only activates the following if LVL 2 is active.
    stroke(0);
    strokeWeight(4);
    rect($rectX1,$rectY1,200,100);
    if (houseY > $rectY1 && houseX + houseWidth > $rectX1) {
      if (jumps == 1) {
        houseY = $rectY1;
        jumps = 0;
      } else {
        houseY = $rectY1;
        jumps = 0;
        yVelocity = 0;
      }
    } // Object A (Bottom Right Object)

    // Object B: Object Above Object A
    stroke(0);
    strokeWeight(4);
    rect($rectX4,$rectY4,200,25);
    if ((houseY > $rectY4 && houseY < $rectY4 + 50) && (houseX + houseWidth > $rectX4 && houseX < $rectX4 + 200)) {
      if (jumps == 1) {
        houseY = $rectY4;
        jumps = 0;
      } else {
        houseY = $rectY4;
        jumps = 0;
        yVelocity = 0;
      }
    } // Object B

    // OBJECT C: Far left Object (lower of two)
    stroke(0);
    strokeWeight(4);
    rect($rectX5,$rectY5,200,25);
    if ((houseY > $rectY5 && houseY < $rectY5 + 50) && (houseX + houseWidth > $rectX5 && houseX < $rectX5 + 200)) {
      if (jumps == 1) {
        houseY = $rectY5;
        jumps = 0;
      } else {
        houseY = $rectY5;
        jumps = 0;
        yVelocity = 0;
      }
    } // Object C

    // OBJECT D: Far left Object (higher of two)
    stroke(0);
    strokeWeight(4);
    rect($rectX6,$rectY6,200,25);
    if ((houseY > $rectY6 && houseY < $rectY6 + 50) && (houseX + houseWidth > $rectX6 && houseX < $rectX6 + 200)) {
      if (jumps == 1) {
        houseY = $rectY6;
        jumps = 0;
      } else {
        houseY = $rectY6;
        jumps = 0;
        yVelocity = 0;
      }
    } // Object d
  }

  strokeWeight(houseWidth*0.01);
  stroke(35);
  fill(120, 134, 156);
  rect(houseX,houseY,houseWidth*0.75,-houseWidth*0.8);
  // Main house rectangle

  fill(145, 158, 179);
  rect(houseX+houseWidth*0.75,houseY,houseWidth*0.25,-houseWidth*0.4);
  // Small rectangle outcrop on right side


  fill(102, 75, 60);
  triangle(houseX+houseWidth*0.75,houseY-houseWidth*0.4,houseX+houseWidth*0.75,houseY-houseWidth*0.55,houseX+houseWidth*1.05,houseY-houseWidth*0.4);
  // Roof of small rectangle outcrop

  stroke(35);
  fill(158, 160, 163);
  rect(houseX+houseWidth*0.6,houseY-houseWidth*0.85,houseWidth*0.075,-houseWidth*0.275)
  rect(houseX+houseWidth*0.6-houseWidth*0.0125,houseY-houseWidth*0.85-houseWidth*0.275,houseWidth*0.1,-houseWidth*0.0275)
  // Chimney

  fill(102, 75, 60);
  triangle(houseX-houseWidth*0.1,houseY-houseWidth*0.8,houseX+houseWidth*0.375,houseY-houseWidth*0.8-houseWidth*0.3,houseX+houseWidth*0.85,houseY-houseWidth*0.8);
  // Roof of main rectangle
  fill(41, 85, 163);
  rect(houseX+houseWidth*0.1875,houseY,houseWidth*0.09375,-houseWidth*0.2);
  // Door

  fill(0)
  strokeWeight(houseWidth*0.005);
  ellipse(houseX+houseWidth*0.17+houseWidth*0.09375,houseY-houseWidth*0.09,houseWidth*0.012,houseWidth*0.012);
  // Door knob

  strokeWeight(houseWidth*0.01);
  fill(221, 226, 235);
  rect(houseX+houseWidth*0.1875-houseWidth*0.02-houseWidth*0.025,houseY,houseWidth*0.025,-houseWidth*0.22);
  // Door Awning Pillar (Left)

  rect(houseX+houseWidth*0.1875+houseWidth*0.09375+houseWidth*0.02,houseY,houseWidth*0.025,-houseWidth*0.22);
  // Door Awning Pillar (Right)

  fill(102, 75, 60);
  triangle(houseX+houseWidth*0.1875-houseWidth*0.02-houseWidth*0.05,houseY-houseWidth*0.22,(houseX+houseWidth*0.1875-houseWidth*0.02-houseWidth*0.025+houseX+houseWidth*0.1875+houseWidth*0.09375+houseWidth*0.02+houseWidth*0.025)/2,houseY-houseWidth*0.3,houseX+houseWidth*0.1875+houseWidth*0.09375+houseWidth*0.02+houseWidth*0.05,houseY-houseWidth*0.22);
  // Door Awning Roof

  stroke(47, 57, 71);
  strokeWeight(houseWidth*0.0075);
  line(houseX,houseY-houseWidth*0.4,houseX+houseWidth*0.75,houseY-houseWidth*0.4);
  // Floor Separating Detail

  fill(99, 110, 128);
  rect(houseX+houseWidth*0.421875-houseWidth*0.02,houseY-houseWidth*0.04+houseWidth*0.02,houseWidth*0.046875*5+houseWidth*0.04,-houseWidth*0.36);
  // Window Detail (First Floor)

  fill(255);
  rect(houseX+houseWidth*0.421875,houseY-houseWidth*0.04,houseWidth*0.046875,-houseWidth*0.32);
  rect(houseX+houseWidth*0.46875,houseY-houseWidth*0.04,houseWidth*0.046875,-houseWidth*0.32);
  rect(houseX+houseWidth*0.5625,houseY-houseWidth*0.04,houseWidth*0.046875,-houseWidth*0.32);
  rect(houseX+houseWidth*0.609375,houseY-houseWidth*0.04,houseWidth*0.046875,-houseWidth*0.32);
  line(houseX+houseWidth*0.421875,houseY-houseWidth*0.04-houseWidth*0.16,houseX+houseWidth*0.46875+houseWidth*0.046875,houseY-houseWidth*0.04-houseWidth*0.16);
  line(houseX+houseWidth*0.5625,houseY-houseWidth*0.04-houseWidth*0.16,houseX+houseWidth*0.609375+houseWidth*0.046875,houseY-houseWidth*0.04-houseWidth*0.16);
  // First Floor Windows

  fill(99, 110, 128);
  rect(houseX+houseWidth*0.0875-houseWidth*0.02,houseY-houseWidth*0.44+houseWidth*0.02,houseWidth*0.03125*9+houseWidth*0.04,-houseWidth*0.36)
  // Window Detail (Second Floor Left)

  fill(255);
  rect(houseX+houseWidth*0.0875,houseY-houseWidth*0.44,houseWidth*0.03125*2,-houseWidth*0.32);
  rect(houseX+houseWidth*0.0875+houseWidth*0.03125*2,houseY-houseWidth*0.44,houseWidth*0.03125*2,-houseWidth*0.32);
  rect(houseX+houseWidth*0.0875+houseWidth*0.03125+houseWidth*0.03125*4,houseY-houseWidth*0.44,houseWidth*0.03125*2,-houseWidth*0.32);
  rect(houseX+houseWidth*0.0875+houseWidth*0.03125+houseWidth*0.03125*6,houseY-houseWidth*0.44,houseWidth*0.03125*2,-houseWidth*0.32);
  // Second Floor Windows (left)

  fill(99, 110, 128);
  rect(houseX+houseWidth*0.421875-houseWidth*0.02,houseY-houseWidth*0.44+houseWidth*0.02,houseWidth*0.046875*5+houseWidth*0.04,-houseWidth*0.36)

  fill(255);
  rect(houseX+houseWidth*0.421875,houseY-houseWidth*0.44,houseWidth*0.046875*5,-houseWidth*0.32);
  line(houseX+houseWidth*0.421875,houseY-houseWidth*0.44-houseWidth*0.064,houseX+houseWidth*0.421875+houseWidth*0.046875*5,houseY-houseWidth*0.44-houseWidth*0.064);
  line(houseX+houseWidth*0.421875,houseY-houseWidth*0.44-houseWidth*0.128,houseX+houseWidth*0.421875+houseWidth*0.046875*5,houseY-houseWidth*0.44-houseWidth*0.128);
  line(houseX+houseWidth*0.421875,houseY-houseWidth*0.44-houseWidth*0.192,houseX+houseWidth*0.421875+houseWidth*0.046875*5,houseY-houseWidth*0.44-houseWidth*0.192);
  line(houseX+houseWidth*0.421875,houseY-houseWidth*0.44-houseWidth*0.256,houseX+houseWidth*0.421875+houseWidth*0.046875*5,houseY-houseWidth*0.44-houseWidth*0.256);
  // Second Floor Windows (right)

  if (houseX < 0) {
    houseX = 0;
  }

  if (houseX > 800 - houseWidth) {
    houseX = 800 - houseWidth;
  }

  houseX = houseX + xVelocity;

  // Gravity
  if (houseY < 550) {
    yVelocity = yVelocity + pGravity;
  }

  houseY = houseY + yVelocity;

  if (houseY > 600) {
    houseY = 600;
    jumps = 0
  }

  // Left & Right Input
  if (keyIsDown(LEFT_ARROW)) {
    if (xVelocity > -6) {
      xVelocity = xVelocity - pMS;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (xVelocity < 6) {
      xVelocity = xVelocity + pMS;
    }
  }

  if (lvl == 2 && houseY > 400) {
    lvlStart = 1;
  }

  // Friction
  xVelocity = xVelocity * friction;

  print("HouseX:",round(houseX),"HouseY:",round(houseY),"HouseYVelocity:",round(yVelocity),"Jumps:",jumps,"Lvl & LvlStart:",lvl,",",lvlStart);
}

  // Jump Input
function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (jumps == 0 || jumps == 1) {
      yVelocity = -6;
      jumps = jumps + 1
    }
  }
}
