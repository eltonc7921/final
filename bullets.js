class Bullet {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }

  move() {
    this.y -= this.velY;
    this.x += this.velX;
  }

  display() {
    strokeWeight(1);
    fill(0, 255, 255);
    quad(this.x, this.y - 12, //top
      this.x + 4, this.y, //right
      this.x, this.y + 12, //bottom
      this.x - 4, this.y); //left
  }
}

class Opshell {
  constructor(x, y, w, h, vel) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.vel = vel;
    this.graze = false;
  }

  display() {
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h, 5);
  }

  move() {
    this.y += this.vel;
  }

  checkHit(ship) { //checks if ship is within itself
    if (ship.y <= this.y + this.h / 2 && // bottom hitbox
      ship.y >= this.y - this.h / 2 && // top hitbox
      ship.x <= this.x + this.w / 2 && // right hitbox
      ship.x >= this.x - this.w / 2) { // left hitbox
      return true;
    } else {
      return false;
    }
  }
}

class Boomerang {
  constructor(x, y, targetX, targetY, travelFrames) {
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.h = targetX;
    this.v = targetY;
    this.travelFrames = travelFrames;
    this.distance = 100;
    this.i = 0;

    this.d = this.startX - this.h;

    this.m = (this.startY - this.v) / Math.pow(this.startX - this.h, 2); // (y-v)/(x-h)**2
  }

  display() {
    stroke(0);
    strokeWeight(1);
    fill(255);
    push();
    translate(this.x, this.y)
    rotate(radians(this.i * 12));
    quad(0, -7, -12, 0, 0, 0, 12, 7);
    pop();
  }

  move() {
    this.x = this.startX - (this.i / this.travelFrames) * this.d; //time to get to target
    this.y = parabola(this.m, this.x, this.h, this.v);
    this.i++;
  }

  checkHit(ship) { //checks if boomerang is within ship
    if (dist(this.x, this.y, ship.x, ship.y) <= 5) {
      return true;
    } else {
      return false;
    }
  }
}

class BombShell extends Opshell {
  constructor(x, y, d, vel) {
    super(x, y, d, d, 0);
    this.velocity = vel;
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 10, 10);
  }

  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }


}

class Bomb {
  constructor(x, y, d, ySpeed) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.ySpeed = ySpeed;
  }

  display() {
    strokeWeight(1);
    stroke(0);
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.d)
  }

  move() {
    this.ySpeed = constrain(this.ySpeed, 0, this.ySpeed);
    this.y += this.ySpeed;
    for (let i = 0; i < ships.length; i++) {
      if (dist(this.x, this.y, ships[i].x, ships[i].y) <= 150) { //explodes if ship is close to bomb
        for (let j = 0; j < bombShellsAmount; j++) {
          var v = createVector(1, 0);
          v.rotate(radians(360 / bombShellsAmount * j)); //formula for bomb
          opShells.push(new BombShell(this.x, this.y, 10, v));
        }
        this.x = -1; //spawns it outside of the canvas to splice it
      }
    }
  }

  checkHit(ship) {
    if (dist(this.x, this.y, ships.x, ships.y) <= 100) {
      return true;
    } else {
      return false;
    }
  }
}

function attack(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let ii = 0; ii < array2.length; ii++) {
      if (array1.length >= 1) {
        if (array1[i].y <= array2[ii].y + array2[ii].h / 2 && // bottom hitbox
          array1[i].y >= array2[ii].y - array2[ii].h / 2 && // top hitbox
          array1[i].x <= array2[ii].x + array2[ii].w / 2 && // right hitbox
          array1[i].x >= array2[ii].x - array2[ii].w / 2) { //left hitbox

          array2[ii].hp -= 5; //removes hp
          array1.splice(i, 1);
          i--;
          break
        }
      }
    }
  }
}
