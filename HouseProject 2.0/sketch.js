var pointNum1 = 0
var pointNum2 = 0
var pointNum3 = 0
var stageNum = 1 // Change this to 4 if you just want the house to spawn without stars.


function setup() {
  // put setup code here
  createCanvas(800,600);
  background(0);
}

function draw() {

  // All these If commands are just making the star background. The part of the project is below.
  if (stageNum == 1) {
    strokeWeight(4);
    rotate(random(-10,10))
    stroke(random(0,255),random(0,255),random(0,255),random(0,50))
    makeCircle1(random(275,325),random(275,325),random(1,3));
    if (pointNum1 >= 1000) {
      stageNum = 2;
    }
  }

  if (stageNum == 2) {
    strokeWeight(4);
    rotate(random(-10,10))
    stroke(random(0,255),random(0,255),random(0,255),random(0,50))
    makeCircle2(random(250,350),random(250,350),random(1,3));
    makeCircle2(random(250,350),random(250,350),random(1,3));
    if (pointNum2 >= 1000) {
      stageNum = 3;
    }
  }

  if (stageNum == 3) {
    strokeWeight(4);
    stroke(random(0,255),random(0,255),random(0,255),random(0,50))
    makeCircle3(random(0,800),random(0,600),random(1,3));
    if (pointNum3 >= 1000) {
      stageNum = 4;
    }
  }

  if (stageNum == 4) {
    drawNeighbourhoodCC(150,600,500,400,255,0,0,0,0,0,0,255,0,0,0,255,100,100,100,100,0,100) // This is the input for drawNeighbourhoodCC
    // Variables in order: far left X value, bottom y value, total length of house row, total height of house columns. Followed by RGB for each row.
    noLoop()
  }

  print("PointNumbers In Order:",pointNum1,pointNum2,pointNum3,"StageNum:",stageNum)
}

function makeCircle1(x,y,size) {
pointNum1 = pointNum1 + 1;
ellipse(x,y,size,size);
}

function makeCircle2(x,y,size) {
pointNum2 = pointNum2 + 1;
ellipse(x,y,size,size);
}

function makeCircle3(x,y,size) {
pointNum3 = pointNum3 + 1;
ellipse(x,y,size,size);
}

function drawHouse(houseX,houseY,width,height,houseRed,houseGreen,houseBlue) {
  strokeWeight((width+height)/100);
  fill(houseRed,houseGreen,houseBlue);
  rect(houseX,houseY,width,-height);
  //^^ Main house block/rect

  fill(houseRed-20,houseGreen-20,houseBlue-20);
  rect(houseX + width*0.4,houseY,width*0.6,-height*0.5);
  //^^ Bottom-Right house block/rect

  fill(houseRed-100,houseGreen-100,houseBlue-100);
  triangle(houseX+width*0.32,houseY-height*0.5,houseX+width*0.7,houseY-height*0.65,houseX+width*1.08,houseY-height*0.5);
  //^^ Lower roof

  triangle(houseX-width*0.08,houseY-height,houseX+width*0.5,houseY-height*1.5,houseX+width*1.08,houseY-height);
  //^^ Upper Roof

  fill(100, 207, 217);
  rect(houseX+width*0.5,houseY-height*0.1,width*0.4,-height*0.3);
  line(houseX+width*0.7,houseY-height*0.1,houseX+width*0.7,houseY-height*0.4);
  line(houseX+width*0.5,houseY-height*0.25,houseX+width*0.9,houseY-height*0.25);
  //^^ Window
}

function drawBlockRC(startingX,startingY,totalLength,height) {
  drawHouse(startingX,startingY,totalLength*0.2,height,random(0,255),random(0,255),random(0,255));
  /*^^Draws the house at the X & Y value you give it. It then makes it's length equal to a
  small portion of the Total length you gave it. Finally, it uses the height value you gave
  it for it's own height, and chooses random numbers for the RGB value of it's colour
  */
  drawHouse(startingX+totalLength*0.2667,startingY,totalLength*0.2,height,random(0,255),random(0,255),random(0,255));
  /*^^Draws the house at the x-value you gave it, plus the length of the first house, plus a small portion
  of the house length to give space between each house. It is at the same Y you inoputed, and the same leng of
  the house. Also has the same height, but has a different random colour with randgom RGB values.
  */

  drawHouse(startingX+totalLength*0.5334,startingY,totalLength*0.2,height,random(0,255),random(0,255),random(0,255));
  drawHouse(startingX+totalLength*0.8,startingY,totalLength*0.2,height,random(0,255),random(0,255),random(0,255));
  /*These two just follow the pattern. Adding lengths of the houses for each one before it, plus an extra
  spacer to make the houses have a distance between them. They all have the same height, and each house gets
  a random RGB value for it's colour.
  */
}

function drawBlockCC(startingX,startingY,totalLength,height,houseRed,houseGreen,houseBlue) {
  drawHouse(startingX,startingY,totalLength*0.2,height,houseRed,houseGreen,houseBlue);
  drawHouse(startingX+totalLength*0.2667,startingY,totalLength*0.2,height,houseRed+40,houseGreen+40,houseBlue+40);
  drawHouse(startingX+totalLength*0.5334,startingY,totalLength*0.2,height,houseRed+80,houseGreen+80,houseBlue+80);
  drawHouse(startingX+totalLength*0.8,startingY,totalLength*0.2,height,houseRed+120,houseGreen+120,houseBlue+120);
}
/*^^ This function above is the same as drawBlockRC, just it has custom colours that you input.
The houseRed variable, houseGreen variable, and houseBlue variable are all used to colour the hosue function,
rather than giving it a random value (as in drawBlockRC). It also adds multiples of 40 to the original red, green,
and blue value to make each row ombre.
*/

function drawNeighbourhoodRC(startingX,startingY,totalLength,totalHeight) {
  drawBlockRC(startingX,startingY,totalLength,(totalHeight/6)*0.66);
  drawBlockRC(startingX,startingY-(totalHeight/6),totalLength,(totalHeight/6)*0.66);
  drawBlockRC(startingX,startingY-(2*totalHeight/6),totalLength,(totalHeight/6)*0.66);
  drawBlockRC(startingX,startingY-(3*totalHeight/6),totalLength,(totalHeight/6)*0.66);
  drawBlockRC(startingX,startingY-(4*totalHeight/6),totalLength,(totalHeight/6)*0.66);
  drawBlockRC(startingX,startingY-(5*totalHeight/6),totalLength,(totalHeight/6)*0.66);
}
/* This just calls drawBlockRC four times. It divides the totalHeight into 6 parts for the height at which
each house needs to start from. It also uses 2/3s of 1/6 of the height you give for each house height.
(It uses 2/3s of the 1/6 because each drawHouse function is actually 1.5 times as tall as the height you give it)
*/

function drawNeighbourhoodCC(startingX,startingY,totalLength,totalHeight,row1R,row1G,row1B,row2R,row2G,row2B,row3R,row3G,row3B,row4R,row4G,row4B,row5R,row5G,row5B,row6R,row6G,row6B) {
  fill(72, 173, 68);
  stroke(0);
  strokeWeight(4);
  rect(0,startingY-(5*totalHeight/6),800,600)

  drawBlockCC(startingX,startingY,totalLength,(totalHeight/6)*0.66,row1R,row1G,row1B);
  drawBlockCC(startingX,startingY-(totalHeight/6),totalLength,(totalHeight/6)*0.66,row2R,row2G,row2B,);
  drawBlockCC(startingX,startingY-(2*totalHeight/6),totalLength,(totalHeight/6)*0.66,row3R,row3G,row3B);
  drawBlockCC(startingX,startingY-(3*totalHeight/6),totalLength,(totalHeight/6)*0.66,row4R,row4G,row4B);
  drawBlockCC(startingX,startingY-(4*totalHeight/6),totalLength,(totalHeight/6)*0.66,row5R,row5G,row5B);
  drawBlockCC(startingX,startingY-(5*totalHeight/6),totalLength,(totalHeight/6)*0.66,row6R,row6G,row6B);
}
/* Same as drawNeighbourhoodRC, just has a whole ton of extra parameters to specify the colour of each row.
*/
