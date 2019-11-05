function setup() {
  // put setup code here
  createCanvas(800,600);
}

function draw() {
  background(186, 145, 20); // wooden table
  fill(255,255,255);
  ellipse(200, 200, 350, 350); // plate
  ellipse(200, 200, 300, 300);

  // KitKat
  fill(66, 34, 34);
  rect(65, 220, 95, 10);
  rect(65, 230, 95, 10);
  rect(65, 240, 95, 10);
  rect(65, 250, 95, 10);

  // Orange
  fill(209, 108, 20);
  ellipse(258,280,60,60);
  fill(61, 30, 9);
  ellipse(253,274,4,2);

  // fries
  stroke(0, 0, 0);
  fill(235, 217, 97);
  rect(222,210,65,8);
  rect(220,205,65,8);
  rect(240,195,65,8);
  beginShape();
  vertex(220,220);
  vertex(225,225);
  vertex(290,200);
  vertex(285,195);
  vertex(220,220);
  endShape();
  beginShape();
  vertex(220,200);
  vertex(225,205);
  vertex(290,180);
  vertex(285,175);
  vertex(220,200);
  endShape();


  // peas
  fill(15, 153, 8);
  noStroke();
  ellipse(145,135,60,60);
  ellipse(135,115,40,40);
  ellipse(145,155,35,35);
  stroke(0, 0, 0);
  ellipse(150,150,7,6);
  ellipse(145,145,8,8);
  ellipse(140,135,8,9);
  ellipse(160,145,8,8);
  ellipse(155,140,10,9);
  ellipse(140,155,9,9);
  ellipse(135,140,8,7);
  ellipse(155,160,7,8);
  ellipse(140,150,7,6);
  ellipse(135,145,8,8);
  ellipse(130,135,8,9);
  ellipse(150,145,8,8);
  ellipse(145,140,10,9);
  ellipse(130,155,9,9);
  ellipse(125,140,8,7);
  ellipse(145,160,7,8);
  ellipse(135,125,8,8);
  ellipse(130,115,8,9);
  ellipse(150,125,8,8);
  ellipse(145,130,10,9);
  ellipse(130,145,9,9);
  ellipse(125,110,8,7);
  ellipse(145,120,7,8);
}
