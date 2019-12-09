// Create a Global Variable for a shape
var x = 100
var y = 100
var size = 50

function setup() {
  // put setup code here
  createCanvas(800,600);
}

function draw() {
  // put drawing code here

  

  background(255);

  fill(255,0,0);
  ellipse(x,y,size);

  if (keyIsDown(LEFT_ARROW)) {
    x = x - 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x = x + 5
  }
  if (keyIsDown(UP_ARROW)) {
    y = y - 5
  }
  if (keyIsDown(DOWN_ARROW)) {
    y = y + 5
  }
}
