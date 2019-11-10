const MOVEMENT_KEYS = [65, 87, 68, 83]; //[left,up,right,down]
const MOVEMENT_VECTORS = [
  [-1, 0], //left
  [0, -1], //up
  [1, 0], //right
  [0, 1] //down
];
const SHIFT = 16; //Shift
const SPECIAL_ATTACKS = [75, 76]; //[k,l]

function keyReleased() {
  for (let i = 0; i < MOVEMENT_KEYS.length; i++) {
    if (keyCode == MOVEMENT_KEYS[i]) { // checks if the key pressed is same as one within the array
      pKeyPressed = MOVEMENT_KEYS[i]; //saves previous button clicked
      dashTimer = 0;
    }
  }
}

class Ship {
  constructor(x, y, hp) {
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.speed = 5;
    this.shiftSpeed = 2;
  }
  display() {
    stroke(0);
    strokeWeight(1);
    fill(0, 255, 0);
    rectMode(CENTER);

    quad(this.x, this.y, //bottom
      this.x + 10, this.y - 10, //right
      this.x, this.y - 40, //top
      this.x - 10, this.y - 10); //left

    quad(this.x - 10, this.y - 10, //top
      this.x, this.y + 10, //right
      this.x - 10, this.y + 25, //bottom
      this.x - 25, this.y + 10); //left

    quad(this.x + 10, this.y - 10, //top
      this.x, this.y + 10, //left
      this.x + 10, this.y + 25, //bottom
      this.x + 25, this.y + 10); //right

    fill(0, 255, 255);
    rect(this.x, this.y, 5, 5);
  }

  move() {
    var s;
    if (keyIsDown(SHIFT)) {
      s = this.shiftSpeed;
    } else {
      s = this.speed;
    }
    for (let i = 0; i < MOVEMENT_KEYS.length; i++) {
      if (keyIsDown(MOVEMENT_KEYS[i])) {
        this.x += MOVEMENT_VECTORS[i][0] * s; //multiplies by s
        this.y += MOVEMENT_VECTORS[i][1] * s; //^
      }
    }
  }

  dash() {
    var dashDist = 40;
    for (let i = 0; i < MOVEMENT_KEYS.length; i++) {
      if (keyIsDown(pKeyPressed) && dashTimer <= 25 && dashCooldown <= 0) { //checks if the key is pressed twice
        if (keyIsDown(MOVEMENT_KEYS[i])) {
          this.x += MOVEMENT_VECTORS[i][0] * dashDist; //multiplies by dash distance
          this.y += MOVEMENT_VECTORS[i][1] * dashDist; //^
          dashTimer = 0;
          pKeyPressed = false;
          dashCooldown = 300; // 5 seconds
        }
      } else {
        dashCooldown--;
        dashTimer++;
      }
    }
  }

  bound() { // checks if its outisde canvas
    if (this.x >= width) { //right
      this.x -= this.speed;
    } else {
      if (this.x <= 0) { //left
        this.x += this.speed;
      } else {
        if (this.y >= height) { //bottom
          this.y -= this.speed;
        } else {
          if (this.y <= 0) { // top
            this.y += this.speed;
          }
        }
      }
    }
  }

  special() {
    for (let i = 0; i < SPECIAL_ATTACKS.length; i++) {
      for (let j = 0; j < grazeBar.length; j++) {
        if (keyIsDown(SPECIAL_ATTACKS[i]) && ships.length >= 1 && grazeBar[j].w >= 75) { //checks if key is j
          barriers.push(new Barrier(this.x, this.y, 175, 15)); //makes barrier
          grazeBar[j].w -= 75;
        }
      }
    }
  }
}
