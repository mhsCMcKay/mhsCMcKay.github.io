
var player;
var enemy = [];

var direction = 'up'

var score = 1;

var bullets = [];

var enemySpawn = 0;

var cooldown = 0;

var keptBullets = [];

var enemyCollision = 0;

var level = 0;

var levelsCompleted = 0;

var textBlink = 0;

var scoreNumber = [];

var backgroundMusic

var fRTimer = 0

var secondsAlive = 0;

var shotRecent = 0;

var ammo = 4;

var ammoTimer = 0;

/* This is my variable collection (above). I won't explain what they all do, but instead will explain their uses when we get to it.
Most of the variables here are just set to 0, to then by edited when they need to be, or a starting amount (like ammo & direction)*/

function preload() {
  // This function preloads all the sounds and images in the game.
  look_right = loadImage('looking_right.png')
  look_right_shoot = loadImage('looking_right_shoot.png')
  // Pretty self explanetory of what they do via the names (look_right is for when you're looking right, look_right_shoot is for when your shooting etc)

  look_left = loadImage('looking_left.png')
  look_left_shoot = loadImage('looking_left_shoot.png')

  look_down = loadImage('looking_down.png')
  look_down_shoot = loadImage('looking_down_shoot.png')

  look_up = loadImage('looking_up.png')
  look_up_shoot = loadImage('looking_up_shoot.png')

  backgroundMusic = loadSound('Background.mp3')

  shooting_sound = loadSound('fire.mp3')

  img = loadImage('Title.png'); // this image is just the title screen image (the Name in pixel art)

  /* The three groups of loaded images (flight, tank, and basic) are the images for each of the enemies.
  There are two images for each enemy, one for them facing right, the other facing left
  */

  flightLeft = loadImage('Flying_left.png');
  flightRight = loadImage('Flying_right.png')

  tankLeft = loadImage('Roach_left.png');
  tankRight = loadImage('Roach_right.png');

  basicLeft = loadImage('Hydra_left.png');
  basicRight = loadImage('Hydra_right.png')
}

function setup() {
  // put setup code here
  createCanvas(800,800);

  player = new Player(); // Creates a new player on game setup
}

function draw() {
  backgroundMusic.playMode('untilDone')
  backgroundMusic.setVolume(0.1)
  backgroundMusic.play();

  // The backgroundMusic stuff above sets the volume to low, and then by using the UntilDone playmode, it plays the song on a loop.

//------------------------You lost Screen-------------//
  if (level == -2) {
    stroke(0,0,0);
    frameRate(15)
    fill(200,200,200,25)
    rect(0,0,800,800)
    /* Drawing a background grey rectangle thats slightly clear. This is so that the lose screen doesn't just Jump out at you
    Instead, it fades in a little, and still lets you see game state when you died. */

    fill(100,100,100)
    rect(200,200,400,400)

    textAlign(CENTER, CENTER)
    fill(0,0,0);
    stroke(0,0,0);
    strokeWeight(2)
    textSize(35)
    text('Oh no! You lost!',width/2,250);
    textSize(15)
    text('You survived '+levelsCompleted+ ' wave(s) and lasted ' +secondsAlive+ ' seconds!',width/2,350);

    text('Press Enter to play again!',width/2,450)

    // Displaying all the text for the lose screen (above). Pretty simple. Just setting the alignment to Center and then putting
    // it in the center of the screen (wdith Wise). Also changes the stroke and fill to make them black text

    if (keyIsDown(ENTER)) { // If enter is pressed, it resets a bunch of variables that are normally zero when the game starts
      fRTimer = 0; // Timer of the number of ingame frames that have passed
      secondsAlive = 0; // The amount of seconds that have passed (fRTimer / 60)
      score = 1; // Resets the score to 1 (as you lose when score = 0)
      levelsCompleted = 0; // Resets the levels completed, as this indicates progress and changes enemy spawns
      player.x = width/2 // Puts the player back in the center of the screen
      player.y = height/2 // Puts the player back in the center of the screen
      enemy = []; // Clears all enemies
      ammo = 4; // Fills your ammo
      level = 1; // Finally, it starts the game again
    }
  }
//-----------------You lost Screen End--------//

//-----------------Tutorial Screen--------//
  if (level == -1) {
    frameRate(2) // The FrameRate is set down to 2 so that TextBlink will work without super large numbers.
    textSize(15)
    background(200);
    text('Use the arrow keys to move around. \n Use the left mouse button to shoot a bullet. \n (In the direction your facing) \n You have four shots, as shown in the top right by the number of yellow boxes \n You can reload your shots by pressing R \n \n To gain points, stand on the green Rectangle in the center of the screen or kill enemies. \n While off the green rectangle, you will lose points. Also, you will lose 1000 points whenever you get hit. \n Careful! do not get to 0 points or you will lose! \n \n At the top left of the screen, there will be two point totals. \n The one in green is your points, the one in black is your target points. \n Once you reach the target points, you will progress to the next level! \n See how many levels you can progress before you lose!',width/2,height/2)
    // Displaying the text that teaches you how to play (double \n to provide some spacing in the text wall)

    // this textblink is just a simple loop of displaying the text below ever few frames
    if (textBlink <= 0) { // if its 0, it displays it and sets it back to 3
      textAlign(CENTER, CENTER);
      text('Press Enter to return to start the game',width/2,700)
      textBlink = 3;
    }

    textBlink = textBlink - 1; // every frame it subtracts 1 from the textblink varialb.e

    if (keyIsDown(ENTER)) { // Starts the game again when you press enter
      level = 1;
    }
  }
//-----------------End Tutorial Screen--------//

//------------Start Screen---------------------\\
  if (level == 0) {

    background(200);

    frameRate(2)
    for (let i = 0; i < 15; ++i) {
      image(img,112,112,575,575); // displaying the Game Title Image
    }

    if (textBlink <= 0) {
      textAlign(CENTER, CENTER);
      text('Press Enter to start \n Press Space for Tutorial',width/2,600)
      textBlink = 3; // Another Textblink (Same as above)
    }

    textBlink = textBlink - 1;
    // print(textBlink)  <---- Testing Stuff

    if (keyIsDown(ENTER)) { // Score to 1 (so you don't lose instantly) and also starts the game
      score = 1;
      level = 1;
    } else if (keyIsDown(32)) { // Brings you to the Tutorial Screen
      level = -1;
    }

  }

//------------End Start Screen------------------\\

//----------------Levels---------------------------\\

  if (level == 1) {
    fRTimer = fRTimer + 1; // The FrameTimer for seeing how long you've survived for

    shotRecent = shotRecent - 1; // Simple timer for keeping the Shooting Image displayed for about 1/3 of a second

    secondsAlive = round(fRTimer/60) // Setting SecondsAlive to be in seconds.

    if (score <= 0) { // Lose screen if your points are zero or below
      level = -2;
    }

    levelCalc(); // Info below
    frameRate(60) // making sure the FrameRate is 60
    cooldown = cooldown - 1 // Cooldown for Shooting Bullets

    enemySpawn = enemySpawn - 1; //Timer for spawning Enemies
    if (enemySpawn <= 0) {  // Checks that the timer is at 0 or below
      if (levelsCompleted > 5) { // checks to see if 5+ levels have been completed. If so, more enemies are spawned.
        for (let i = 0; i < 6; i++) { // Spawns 6 enemies here (only if 5+ lvels are completed)
          enemy.push( new Enemy());
        }
        enemySpawn = 300 - levelsCompleted*10 // Changes the timer to be less the more levels you've completed
        if (enemySpawn < 60) { // stops the enemy spawn rate from going below once per 60 frames.
          enemySpawn = 60;
        }
      } else {
        for (let i = 0; i < 4; i++) { // spawns 4 enemies. If <5 levels have been completed.
          enemy.push( new Enemy());
        }
        enemySpawn = 300 - levelsCompleted*10 // Changes the timer to be less the more levels you've completed
        if (enemySpawn < 60) { // stops the enemy spawn rate from going below once per 60 frames.
          enemySpawn = 60;
        }
      }
    }

    drawBackground(); // explained below

    inCenter = collideRectCircle(300,300,200,200,player.x,player.y,30)
    // Checking to see if the player is colliding with the rectangle in the center of the screen (for points per frame)

    if (inCenter == true) { // if they're collding, it gives them +1 point per frame
      score = score + 1;
    } else { // if they're not in the center, they lose 1 point per frame
      score = score -1;
    }

    player.show();      // Calls the Show function for the player (Displays them)
    player.movement();  // Calls Movement Function which Detects the arrow Keys input and moves the player in the direction they push

    keptBullets = [] // Sets KeptBullets to be an empty array
    for (let b = 0; b < bullets.length; ++b) {
      bullets[b].move();
      bullets[b].show();
      if (!bullets[b].location()) {
        keptBullets.push(bullets[b]); // this entire chuck here basicly shows and moves all the bullets, then, if they're not outside of the screen, adds them to keptBullets.
      }
      bullets = keptBullets // Removes all bullets that aren't on the screen by Setting current bullets to all that were added to keptBullets
    }
      //bullets[b].collide();
      for (let a = 0; a < enemy.length; ++a) { // Loop that displays and checks if all enemies have taken damage
      /*let bulletHit = dist(bullets[b].x,bullets[b].y,enemy[a].x,enemy[a].y) <= 5;
      if (bulletHit == true) {

      }
      //print('BulletHit(Bullet):',bulletHit)
      if (!bulletHit && !bullets[b].location()) {
        keptBullets.push(bullets[b]);
      } */

      // NOTE: This commented out code above was something I had worked on at the beginning, but gave up on in favour of completing the project sooner.
      // Might work on this in my own spare time, so I kept it here for reference.
        enemy[a].damage(); // Checks if any enemies have taken damage or need to take damage
        enemy[a].move(); // moves all enemies
      }

      //bullets = keptBullets


    //print(direction,score)

    let keptEnemies = []
    //print('BeforeTest:KeptEnemies:',keptEnemies)
    for (let a = 0; a < enemy.length; ++a) {
      enemy[a].show();
      if (enemy[a].alive()) {
        keptEnemies.push(enemy[a]);
        // This is the same tool as the bullet one. It checks if the enemies are allive or not. If they are alive,
        // it adds them to a temporary array, and then any who aren't added to the array end up deleted.
      }
      //print('AfterTest:Enemies',enemy,'KeptEnemies:',keptEnemies)
    }
    enemy = keptEnemies; // removes all dead enemies.

    if (enemyCollision <= 0) { // Checks if the player has collided with the enemy recently.
      player.speed = 3;
      for (let a = 0; a < enemy.length; ++a) {
        let hit = collideCircleCircle(player.x,player.y,30,enemy[a].x,enemy[a].y,enemy[a].radius)
        // Checks if the player is currently colliding with an enemy. If true, it adds and sets the Damaged Variable to True
        if (hit == true) {
          var damaged = true;
        }
      }
      if (damaged == true) { // if the player was damaged, it does the following
        enemyCollision = 180; // invulernable to damage for 180 frames (only runs collision while this variable is <= 0)
        player.speed = 4; // Gives the player a 1 pixel per frame speed boost
        score = score - 1000; // subtracts 1000 from the player's score
        scoreNumber.push(new Score(player.x,player.y,"-1000",255,0,0)) // Creates the -1000 text when you take damage
      }
    }
    enemyCollision = enemyCollision - 1 // removes the invulernability.

    for (let s = 0; s < scoreNumber.length; ++s) { // displays all the score numbers
      scoreNumber[s].display();
    }

    if (keyIsDown(82)) { // Reloading mechanic. The more ammo they have when the reload, the shorter the reload time is
      if (ammo == 0) {
        ammoTimer = 90
      } else if (ammo == 1) {
        ammoTimer = 80
      } else if (ammo == 2) {
        ammoTimer = 60
      } else if (ammo == 3) {
        ammoTimer = 30;
      }
    }

    if (ammoTimer == 0) { // When the timer gets to zero, it gives them 4 ammo.
      ammo = 4;
    }

    ammoTimer = ammoTimer - 1 // lowers the ammoTimer

    if (ammo == 0) { // this is the display for the ammount of ammo the player has. Filled rectangles for each ammo the player has (max 4)
      stroke(0)
      strokeWeight(4)
      fill(255)
      rect(695,5,25,50)
      rect(720,5,25,50)
      rect(745,5,25,50)
      rect(770,5,25,50)
    } else if (ammo == 1) {
      stroke(0)
      strokeWeight(4)
      fill(255)
      rect(695,5,25,50)
      rect(720,5,25,50)
      rect(745,5,25,50)
      fill(255,255,0)
      rect(770,5,25,50)
    } else if (ammo == 2) {
      stroke(0)
      strokeWeight(4)
      fill(255)
      rect(695,5,25,50)
      rect(720,5,25,50)
      fill(255,255,0)
      rect(745,5,25,50)
      rect(770,5,25,50)
    } else if (ammo == 3) {
      stroke(0)
      strokeWeight(4)
      fill(255)
      rect(695,5,25,50)
      fill(255,255,0)
      rect(720,5,25,50)
      rect(745,5,25,50)
      rect(770,5,25,50)
    } else if (ammo == 4) {
      stroke(0)
      strokeWeight(4)
      fill(255,255,0)
      rect(695,5,25,50)
      rect(720,5,25,50)
      rect(745,5,25,50)
      rect(770,5,25,50)
    }
  }

//--------------End Levels-----------------\\

//--------------Level Complete Screen------------\\
  if (level == 3) {

    frameRate(2) // lowers FPS (For Textblink)
    enemy = []; // removes all enemies
    background(200);
    textAlign(CENTER, CENTER);
    textSize(50)
    fill(0);
    stroke(0);
    strokeWeight(1) // displays the amount of waves you have completed
    text('You have survived ' +levelsCompleted+ ' wave(s).',width/2,height/2)


    if (textBlink <= 0) {
      textAlign(CENTER, CENTER);
      textSize(10);
      fill(0);
      stroke(0);
      strokeWeight(1)
      text('Press Enter to continue',width/2,600) // displays the "press enter to Continue" and also has the blink affect. (explained above)
      textBlink = 3;
    }

    textBlink = textBlink - 1;

    if (keyIsDown(ENTER)) { // If you press Enter, it moves you to the center of the screen and then also starts the game again
      level = 1;
      player.x = width/2
      player.y = height/2
    }

  }
//-------------End Level Complete Screeen------------\\
}

function mousePressed() { // when you click the mouse
  if (level == 1) { // if your playing a level
    if (ammo > 0) { // if you have ammo
      if (cooldown < 0) { // if your shooting cooldown its below 0 (aka you can't shoot super fast)
        bullets.push( new Bullet()) // makes a new bullet
        cooldown = 90
        shotRecent = 20 // makes the image for shooting last for 20 frames
        shooting_sound.play() // plays the sound effect for shooting
        ammo = ammo - 1
      }
    }
  }
}

function drawBackground() {
  stroke(0);
  strokeWeight(10);
  fill(230);
  rect(0,0,800,800); // draws a background rectangle with a thick outside (so you know where the edges of the screen are)

  strokeWeight(2);
  stroke(0);
  fill(100,130,100);
  rect(300,300,200,200); // displays the central green rectangle for points per frame

  stroke(0);
  fill(0,0,0);
  textSize(30);
  textAlign(CENTER,CENTER)
  fill(0,255,0);
  text(score,55,30); // displays your current score
  fill(0,0,0);
  text(5000 + levelsCompleted*1250,55,55) // displays the score you need to get to progress
}

function Enemy() { // This is the enemy function
  this.random = round(random(0.5,4)) // creates a random location of the enemy (along the edges of the screen)
  if (this.random == 1) {
    this.x = random(0,800);
    this.y = 0;
  } else if (this.random == 2) {
    this.x = 800;
    this.y = random(0,800);
  } else if (this.random == 3) {
    this.x = random(0,800);
    this.y = 800;
  } else if (this.random == 4) {
    this.x = 0;
    this.y = random(0,800);
  }

  if (levelsCompleted > 0) {
    if (levelsCompleted == 1) { // these are the random generators for the enemies.
      this.randomType = round(random(0.5,3.5)) // on wave 2, you can get enemy types Basic & Tank
        if (this.randomType <= 2) { // basic - Regular enemy. Average speed, Hp, and size
          this.imageType = 1
          this.radius = 18;
          this.speed = 1.5;
          this.hp = 3;
        } else if (this.randomType == 3) { // tank - Tankier enemy. Slower Speed, Higher HP and Size
          this.imageType = 2
          this.radius = 26;
          this.speed = 1;
          this.hp = 10;
      }

    } else if (levelsCompleted == 2) {
      this.randomType = round(random(0.5,5.5)) // on wave 3, you can get basic and Flight
        if (this.randomType <= 2) { // basic
          this.imageType = 1
          this.radius = 18;
          this.speed = 1.5;
          this.hp = 3;
        } else if (this.randomType >= 3) { // flight - Faster enemy (Scout) - Fastest Speed, low Hp, small size
          this.imageType = 3
          this.radius = 14;
          this.speed = 2;
          this.hp = 1;
        }

    } else if (levelsCompleted == 3) {
      this.randomType = round(random(0.5,5.5)) // Wave 4 is Tanks and Flights
      if (this.randomType <= 2) { // tanks
        this.imageType = 2
        this.radius = 26;
        this.speed = 1;
        this.hp = 10;
      } else if (this.randomType >= 3) { // flight
        this.imageType = 3
        this.radius = 14;
        this.speed = 2;
        this.hp = 1;
      }
    } else if (levelsCompleted == 4) {
      this.randomType = round(random(0.5,7.5)) // round 5 is all three, with more tanks, then equal Flights & Basics
      if (this.randomType <= 2) { // basic - Upgraded Basic (more HP)
        this.imageType = 1
        this.radius = 18;
        this.speed = 1.5;
        this.hp = 6;
      }
      if (this.randomType >= 3 && this.randomType <= 5) { // tank - Upgraded (more HP)
        this.imageType = 2
        this.radius = 26;
        this.speed = 1;
        this.hp = 12;
      }
      if (this.randomType >= 6) { // flight - Upgraded (more HP)
        this.imageType = 3
        this.radius = 14;
        this.speed = 2.5;
        this.hp = 3;
      }
    } else if (levelsCompleted >= 5) {
      this.randomType = round(random(0.5,8.5)) // Wave 6 and beyond is all three as well. Mostly Tanks and Flights, only some Basics
      if (this.randomType <= 2) { // basic - Upgraded Basic (more HP)
        this.imageType = 1
        this.radius = 18;
        this.speed = 1.5;
        this.hp = 6;
      }
      if (this.randomType >= 3 && this.randomType <= 6) { // tank - Upgraded (more HP)
        this.imageType = 2
        this.radius = 26;
        this.speed = 1;
        this.hp = 12;
      }
      if (this.randomType <= 6) { // flight - Upgraded (more HP) Note: You still one hit it, but it will now survive bullet grazes.
        this.imageType = 3
        this.radius = 14;
        this.speed = 2.5;
        this.hp = 3;
      }
    }
  } else { // If you haven't completed a level yet, it always summons a basic unit.
    this.randomtType = 1;
    this.imageType = 1;
    this.radius = 18;
    this.speed = 1.5;
    this.hp = 3;
  }

  this.alive = function() {
    return this.hp > 0 // returns true or false if they have HP (Dead or alive)
  }

  this.move = function() { // moves the enemy
    if (this.x < player.x - 5) { // moves towards their x value
      this.x = this.x + this.speed
    } else if (this.x > player.x + 5) {
      this.x = this.x -this.speed
    }
    if (this.y < player.y - 5) { // moves towards their y value
      this.y = this.y + this.speed
    } else if (this.y > player.y + 5) {
      this.y = this.y - this.speed
    }
  }

  this.show = function() { // Displays the enemy
    if (this.hp > 0) {
      fill(255,0,0);
      stroke(0);
      strokeWeight(2);
      imageMode(CENTER)
      if (this.imageType == 1) { // checks their image type (1 is basic, 2 is tank, 3 is flight) Then displays the right image if they are to the left or right of the player (for facing left vs right)
        if (player.x < this.x) {
          image(basicLeft,this.x,this.y,45,45)
        } else if (player.x > this.x) {
          image(basicRight,this.x,this.y,45,45)
        }
      } else if (this.imageType == 2) {
        if (player.x < this.x) {
          image(tankLeft,this.x,this.y,75,75)
        } else if (player.x > this.x) {
          image(tankRight,this.x,this.y,75,75)
        }
      } else if (this.imageType == 3) {
        if (player.x < this.x) {
          image(flightLeft,this.x,this.y,50,50)
        } else if (player.x > this.x) {
          image(flightRight,this.x,this.y,50,50)
        }
      }
      //ellipse(this.x,this.y,this.radius) //------> Old display (also displays the hitbox)
      textAlign(CENTER,CENTER);
      stroke(255);
      textSize(this.radius/2);
      fill(255);
      //text(this.hp,this.x,this.y);
    }
  }

  this.damage = function() { // Damage function for enemies
    for (let b = 0; b < bullets.length; ++b) {
      let hit = dist(bullets[b].x,bullets[b].y,this.x,this.y) <= this.radius // checks if the enemy is touching a bullet
      if (hit == true) {
        this.hp = this.hp - 1; // if true (they are touching a bullet), it will subtract an HP from the player (it does this once per frame with no Cooldown, meaning they take damage multiple times from one bullet.)
      }
    }
    if (this.hp == 0) { // if they have no hp, it checks what type of enemy they are (Via their image type, so 1 = basic, 2 = tank, 3 = flight)
      if (this.imageType == 1) {
        score = score + 100; // acutally adds the points

        scoreNumber.push(new Score(this.x,this.y,"+100",240,240,0)) // 100 points for basic kill (Displays it using the Score function)
        this.hp = -1;
      } else if (this.imageType == 2) {
        score = score + 250; // acutally adds the points

        scoreNumber.push(new Score(this.x,this.y,"+250",240,240,0)) // 250 points for tank kill (Display part)
        this.hp = -1;
      } else if (this.imageType == 3) {
        score = score + 125; // acutally adds the points

        scoreNumber.push(new Score(this.x,this.y,"+125",240,240,0)) // 125 points for flight kill (Display part)
        this.hp = -1;
      }
    }
    //print('HP:',this.hp)
  }
}

function levelCalc() { // Checks if the player's score is high enough for them to continue
  if (score >= 5000 + levelsCompleted*1250) {
    score = 0;
    level = 3;
    levelsCompleted = levelsCompleted + 1
  }
}

function Score(x,y,score,r,g,b) { // this is the score function. It takes in the x & y position, the text you want displayed (Score) and then the colour of the text
  this.x = x
  this.y = y
  this.number = score
  this.timer = 60
  this.r = r
  this.g = g
  this.b = b
  // ^^ takes in all the variables given

  this.display = function() { // when the display function is run it shows itself if there is time left on the timer.
    if (this.timer >= 0) {
      stroke(0);
      fill(this.r,this.g,this.b); // fill based on the colour given to it in parameters
      textSize(10);
      text(this.number,this.x,this.y,30,30) // displays the text
    }
    this.timer = this.timer - 1 // reduces the timer every frame
  }
}

function Bullet() { // bullet function
  this.x = player.x;
  this.y = player.y;
  this.dir = direction // gives the bullet a direction based on what direction the player was when they fired the bullet
  this.r = 5;
  this.hit = false // set itself to currently not hitting something
  this.hitNumber = 0

  this.show = function() { // shows the bullet at it's position and at a radius of 5
    fill(255,0,0);
    stroke(255,0,0);
    ellipse(this.x,this.y,5);
  }

  this.move = function() { // when the enemy move function it runs this.
    if (this.dir == 'left') { // moves according to the direction given to it (8 per frame)
      this.x = this.x - 8
    } else if (this.dir == 'right') {
      this.x = this.x + 8
    } else if (this.dir == 'up') {
      this.y = this.y - 8
    } else if (this.dir == 'down') {
      this.y = this.y + 8
    }
  }

  /*this.collide = function() {
    for (let a = 0; a < enemy.length; ++a) {
      this.hit = dist(enemy[a].x,enemy[a].y,this.x,this.y) <= 5
      print(this.hit)
      if (this.hit == false) {
        keptBullets.push(bullets)
      }
    }
    print('bullets',bullets)
    print('kept',keptBullets)
    bullets = keptBullets
  } */ // Old code for bullet collision with enemy  (for removing bullets on collision with enemy rather than pasing through)

  this.location = function() {
    return this.x > 800 || this.x < 0 || this.y > 800 || this.y < 0 // displays the location of the bullet as a true or false of being inside the screen.
  }
}

function Player(){ // player function
  this.x = width/2; // sets its location to the center of the screen on setup
  this.y = height/2;
  this.speed = 3; // sets its speed value to 3 for the beginning

  this.show = function(){ // displays the player
    fill(70,200,115);
    stroke(0);
    strokeWeight(2);
    if (direction == 'left') { // if facing left, it displays one of the left sprites
      if (shotRecent > 0) { // if the player has shot recently (increases when you press the mouse) it will display the shooting sprite isntead of idle sprite
        image(look_left_shoot,this.x-10,this.y,50,50)
      } else {
        image(look_left,this.x-10,this.y,50,50)
      }
    } else if (direction == 'right') { // same as above but for right
        if (shotRecent > 0) {
          image(look_right_shoot,this.x+8,this.y,50,50)
        } else {
          image(look_right,this.x,this.y,50,50)
        }
    } else if (direction == 'up') { // same as above but for up
      if (shotRecent > 0) {
        image(look_up_shoot,this.x,this.y-2,50,60)
      } else {
        image(look_up,this.x,this.y,50,50)
      }
    } else if (direction == 'down') { // same as above but for down
      if (shotRecent > 0) {
        image(look_down_shoot,this.x,this.y,50,50)
      } else {
        image(look_down,this.x,this.y,50,50)
      }
    }
  }

  this.movement = function(){ // Movement checks
    if (this.x > 800) {
      this.x = 800;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y > 800) {
      this.y = 800
    }
    if (this.y < 0) {
      this.y = 0
    }

    if (keyIsDown(65)) { // if you're pressing left, it sets your direction to left and moves you to the left by your speed.

      this.x = this.x - this.speed
      direction = 'left'
      // NOTE: So that I would have to use less sprites (And to save time), you can only move in one direction at a time.
      // When pushing all directions at once, you will automatically be forced to go left.
    } else if (keyIsDown(68)) { // if you're pressing right, it sets your direction to right and moves you to the right by your speed.

      this.x = this.x + this.speed
      direction = 'right'

    } else if (keyIsDown(87)) { // same as above by for up
      this.y = this.y - this.speed
      direction = 'up'

    } else if (keyIsDown(83)) { // same as above by for down
      this.y = this.y + this.speed
      direction = 'down'

    }

    if (keyIsDown(187)) { // cheat code to get +100 points per frame (use "+"")
      score = score + 100;
    }
  }
}
