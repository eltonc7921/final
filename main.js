var ships = [];
var bullets = [];
var enemies = [];
var opShells = [];
var effects = [];
var barriers = [];
var grazeBar = [];
var waves;
var barrierCooldown = 60;
var reloadTime = 3;
var bombShellsAmount = 20;
var dashTimerStart = false;
var pKeyPressed = false;
var dashTimer = 0;
var dashCooldown = 300;
var start = false;

function setup() {
  createCanvas(400, 600);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(10);
  ships.push(new Ship(width / 2, height * 2 / 3, 1)); //make ship
  grazeBar.push(new GrazeBar(20, 560, 0, 20, 100)); // make grazebar

  waves = [ //stores wave data
    createBasicWave(2, 180),
    createBasicWave(4, 60),
    createParabolaWave(2, 60),
    createBasicWave(6, 60),
    createParabolaWave(3, 60),
    createExplosiveEnemyWave(1, 60),
    createMultipleEnemyWave(3,2,0,60),
    createMultipleEnemyWave(2,3,0,60),
    createMultipleEnemyWave(2,2,1,60),
    createMultipleEnemyWave(3,2,2,60),
    createMultipleEnemyWave(6,4,3,60),
  ]
}

function draw() {
  background(0);
  if(keyCode == 74) {
    start = true;
  }
  if(start == true) {
  	spawnBasicWaves(waves);
  }

  for (let i = 0; i < ships.length; i++) {
    if (keyIsDown(74) && reloadTime <= 0 && ships.length >= 1) {
      bullets.push(new Bullet(ships[i].x, ships[i].y, 2, 15)); //right bullets
      bullets.push(new Bullet(ships[i].x, ships[i].y, 0, 15)); //middle bullets
      bullets.push(new Bullet(ships[i].x, ships[i].y, -2, 15)); //left bullets
      reloadTime = 3;
    } else {
      reloadTime--;
    }
  }

	//calls functions for each individual object
  for (let i = 0; i < ships.length; i++) {
    ships[i].move();
    ships[i].display();
    ships[i].bound();
    ships[i].special();
    ships[i].dash();
  }

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].display();
    bullets[i].move();
  }

  for (let i = 0; i < opShells.length; i++) {
    opShells[i].display();
    opShells[i].move();
  }

  for (let i = 0; i < effects.length; i++) {
    effects[i].display();
  }

  for (let i = 0; i < grazeBar.length; i++) {
    grazeBar[i].display();
  }

  for (let i = 0; i < barriers.length; i++) {
    barriers[i].display();
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].display();
    enemies[i].move();
    enemies[i].bound();
    if (enemies[i].readyToShoot()) {
      opShells.push(enemies[i].makeBullet());
    }
  }

  boundaryKill(bullets);
  boundaryKill(opShells);
  attack(bullets, enemies);
  enemyDeath(enemies);
  enemyDeath(effects);
  death(ships, enemies);
  death(ships, opShells);
  barrierBreak(barriers, opShells);
  grazes(ships, opShells, grazeBar);
  gameover();
}

function boundaryKill(array) { //removes "array" when its out of canvas
  for (let i = 0; i < array.length; i++) {

    if (array[i].y <= 0 || //top
      array[i].y >= height || //bottom
      array[i].x <= 0 || //left
      array[i].x >= width) { //right
      array.splice(i, 1);
    }
  }
}

function gameover() {
 	if(enemies.length == 0 && waves.length == 0 || ships.length == 0) {
   	fill(255,0,0);
    strokeWeight(1);
    text("GAME OVER",width/2,height/2);
  }
}
