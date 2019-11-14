var houseWidth = 400;
//^^Edit this Variable for House Size

var houseX = 150; //These represent the BOTTOM LEFT corner of the house!
var houseY = 550; //These represent the BOTTOM LEFT corner of the house!

var smokeHeight = houseY-houseWidth*0.85-houseWidth*0.275-houseWidth*0.075; // These represent the height of the smoke
var smokeSize = houseWidth*0.1; // The smoke size

function setup() {
  createCanvas(800,600);
  stroke(0);
  strokeWeight(4);
  fill(150, 212, 214);
  rect(0,0,800,600); // Background Sky
}

function draw() {

  strokeWeight(4);
  fill(41, 150, 17);
  rect(0,550,800,50);
  // Ground

  strokeWeight(2);
  fill(237, 221, 40);
  ellipse(800,0,120,120);
  // Sun

  stroke(250);
  fill(255);
  ellipse(600,30,120,80);
  ellipse(640,45,80,60);
  // CloudLeft

  ellipse(75,40,110,90);
  ellipse(160,35,150,100);
  ellipse(85,50,100,60);
  // CloudRight

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

  stroke(250);
  fill(255);
  ellipse(houseX+houseWidth*0.6+houseWidth*0.0375,smokeHeight,smokeSize,smokeSize * 0.75);
  if (smokeHeight >= -200) {
    smokeHeight = smokeHeight - 1;
  }
  if (smokeHeight <= -128) {
    if (houseWidth <= 470) {
      smokeHeight = houseY-houseWidth*0.85-houseWidth*0.275-houseWidth*0.075;
      stroke(0);
      strokeWeight(4);
      fill(150, 212, 214);
      rect(0,0,800,600); // Background Sky
    }
  }
  smokeSize = smokeSize + random(-2,2);
  // ChimneySmoke

  stroke(35);
  fill(158, 160, 163);
  rect(houseX+houseWidth*0.6,houseY-houseWidth*0.85,houseWidth*0.075,-houseWidth*0.275)
  rect(houseX+houseWidth*0.6-houseWidth*0.0125,houseY-houseWidth*0.85-houseWidth*0.275,houseWidth*0.1,-houseWidth*0.0275)
  // Chimney

  fill(102, 75, 60);
  triangle(houseX-houseWidth*0.1,houseY-houseWidth*0.8,houseX+houseWidth*0.375,houseY-houseWidth*0.8-houseWidth*0.3,houseX+houseWidth*0.85,houseY-houseWidth*0.8);
  // Roof of main rectangle

  fill(125, 125, 125);
  quad(houseX+houseWidth*0.1875,houseY,houseX+houseWidth*0.1875+houseWidth*0.09375,houseY,houseX+houseWidth*0.3175+houseWidth*0.09375,600,houseX+houseWidth*0.0575,600);
  // Pathway

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



  if (keyIsDown(107) || keyIsDown(187)) {
    houseWidth += 5;
  }
  if (keyIsDown(109) || keyIsDown(189)) {
    houseWidth -= 5;
  }
  if (keyIsDown(67)) {
    strokeWeight(4);
    fill(150, 212, 214);
    rect(0,0,800,600);
  }
  if (keyIsDown(82)) {
    houseWidth = 400;
    strokeWeight(4);
    fill(150, 212, 214);
    rect(0,0,800,600);
    smokeHeight = houseY-houseWidth*0.85-houseWidth*0.275-houseWidth*0.075;
  }
}
// Allows you to hold down the '+' or '-' key to change the HouseWidth variable.
// Lets you press 'C' to clear any drawings / redraw the background
// Lets you press 'R' to reset the program
