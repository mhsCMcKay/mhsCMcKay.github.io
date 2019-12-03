var r1 = 0
var g1 = 0
var b1 = 0
var timer = 0
var size = 20
var size2 = 20
var boom = 0
var lineX1 = 0
var lineY1 = 0
var lineX2 = 800
var lineY2 = 0
var lineX3 = 800
var lineY3 = 600
var lineX4 = 0
var lineY4 = 600
var lineMS = 2
var shape = 1

function setup() {
  // put setup code here
  createCanvas(800,600);
}

function draw() {
  // put drawing code here

  // Draw an ellipse at the mouse location
  // Using variables: mouseX & mouseY

  strokeWeight(12);
  stroke(255,255,255,191);
  line(lineX1,lineY1,mouseX,mouseY);
  line(lineX2,lineY2,mouseX,mouseY);
  line(lineX3,lineY3,mouseX,mouseY);
  line(lineX4,lineY4,mouseX,mouseY);

  strokeWeight(1);
  stroke(0);
  fill(0,0,0,33);
  rectMode(CORNER)
  rect(0,0,800,600);

  if (mouseIsPressed) {
    if (shape == 1) {
      fill(r1,g1,b1);
      ellipse(mouseX,mouseY,size,size)
    } else if (shape == 2) {
      fill(r1,g1,b1);
      rectMode(CENTER);
      rect(mouseX,mouseY,size,size);
    }
  }

  if (timer == 60) {
    fill(r1,g1,b1,75);
    if (shape == 1) {
      ellipse(mouseX,mouseY,100,100);
      timer = 0;
    } else if (shape == 2) {
      rectMode(CENTER);
      rect(mouseX,mouseY,100,100);
      timer = 0;
    }
  }
  timer = timer + 1
  print(timer)
  if (boom == 1) {
    boomShape();
  }
  lineMath()
}

function mousePressed() {
  r1 = random(0,255);
  g1 = random(0,255);
  b1 = random(0,255);
}

function mouseReleased() {
  if (size == 100) {
    size = 20;
    boom = 1;
  }
  size = size + 2;
}

function boomShape() {
  fill(r1,g1,b1,50)
  if (shape == 1) {
    ellipse(mouseX,mouseY,size2,size2);
  } else if (shape == 2) {
    rectMode(CENTER)
    rect(mouseX,mouseY,size2,size2);
  }
  size2 = size2 + 10;
  if (size2 == 1600) {
    boom = 0;
    size2 = 20;
  }
}

function doubleClicked() {
  if (shape == 1) {
    shape = 2;
  } else if (shape == 2) {
    shape = 1;
  }
}

function lineMath() {
  if (lineX1 < 800 && lineY1 === 0) {
    lineX1 = lineX1 + lineMS;
  } else if (lineX1 === 800 && lineY1 < 600) {
    lineY1 = lineY1 + 0.75*lineMS;
  } else if (lineX1 > 0 && lineY1 === 600) {
    lineX1 = lineX1 - lineMS;
  } else if (lineX1 === 0 && lineY1 > 0) {
    lineY1 = lineY1 - 0.75*lineMS;
  }
  if (lineX2 < 800 && lineY2 === 0) {
    lineX2 = lineX2 + lineMS;
  } else if (lineX2 === 800 && lineY2 < 600) {
    lineY2 = lineY2 + 0.75*lineMS;
  } else if (lineX2 > 0 && lineY2 === 600) {
    lineX2 = lineX2 - lineMS;
  } else if (lineX2 === 0 && lineY2 > 0) {
    lineY2 = lineY2 - 0.75*lineMS;
  }
  if (lineX3 < 800 && lineY3 === 0) {
    lineX3 = lineX3 + lineMS;
  } else if (lineX3 === 800 && lineY3 < 600) {
    lineY3 = lineY3 + 0.75*lineMS;
  } else if (lineX3 > 0 && lineY3 === 600) {
    lineX3 = lineX3 - lineMS;
  } else if (lineX3 === 0 && lineY3 > 0) {
    lineY3 = lineY3 - 0.75*lineMS;
  }
  if (lineX4 < 800 && lineY4 === 0) {
    lineX4 = lineX4 + lineMS;
  } else if (lineX4 === 800 && lineY4 < 600) {
    lineY4 = lineY4 + 0.75*lineMS;
  } else if (lineX4 > 0 && lineY4 === 600) {
    lineX4 = lineX4 - lineMS;
  } else if (lineX4 === 0 && lineY4 > 0) {
    lineY4 = lineY4 - 0.75*lineMS;
  }
}
