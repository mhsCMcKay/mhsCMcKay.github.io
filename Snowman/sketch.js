function setup() {
  createCanvas(400,400)
}

function draw() {
// ground
rect(-1,350,401,50);

// body
ellipse(200, 300, 150, 150);
ellipse(200, 200, 100, 100);
ellipse(200, 120, 75, 75);

// arms
line(160,200,100,100);
line(240,200,300,100);

}
