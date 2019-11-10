class Enemy {
  constructor(x, y, w, h, hp, points) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hp = hp;
    this.points = points;
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
  }

  display() {
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    text(this.hp, this.x, this.y);
  }

  checkHit(ship) { // checks if ship is within itself
    if (ship.y <= this.y + this.h / 2 && // bottom hitbox
      ship.y >= this.y - this.h / 2 && // top hitbox
      ship.x <= this.x + this.w / 2 && // right hitbox
      ship.x >= this.x - this.w / 2) { // left hitbox
      return true;
    } else {
      return false;
    }
  }

  makeBullet() {
    return new Opshell(this.x, this.y, 8, 12, 3.5); //(x, y, w, h, vel,)
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (frameCount % 120 == 0) { //changes directions every 2 seconds
      this.xSpeed = random(-2, 2);
      this.ySpeed = random(-2, 2);
    }
  }

  bound() { //checks if within canvas
    if (this.x >= width || this.x <= 0) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.y >= height / 2 || this.y <= 0) {
      this.ySpeed = -this.ySpeed;
    }
  }

  readyToShoot() {
    if (frameCount % int(random(10, 25)) == 0 && ships.length >= 1) { // timer to shoot
      return true;
    } else {
      return false;
    }
  }
}

class ParabolaEnemy extends Enemy {
  constructor(x, y, w, h, hp, points) {
    super(x, y, w, h, hp, points);
  }

  display() {
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h, 5);
    fill(0);
    text(this.hp, this.x, this.y);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (frameCount % 120 == 0) { //change direction every 2 seconds
      this.xSpeed = random(-1, 1);
      this.ySpeed = random(-1, 1);
    }
  }

  makeBullet() {
    return new Boomerang(this.x, this.y, ships[0].x, ships[0].y, 60);
  }

  bound() {
    if (this.x >= width || this.x <= 0) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.y >= height / 2 || this.y <= 0) {
      this.ySpeed = -this.ySpeed;
    }
  }

  readyToShoot() {
    if (frameCount % int(random(45, 60)) == 0 && ships.length >= 1) { //timer to shoot
      return true;
    } else {
      return false;
    }
  }
}

class ExplosiveEnemy extends Enemy {
  constructor(x, y, w, h, hp, points) {
    super(x, y, w, h, hp, points);
  }

  display() {
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.w);
    fill(0);
    ellipse(this.x, this.y, this.w / 1.5);
    rect(this.x, this.y, this.w - 10, this.h - 20);
    rect(this.x, this.y, this.h - 20, this.w - 10);
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.w / 2);
    fill(0);
    text(this.hp, this.x, this.y);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (frameCount % 120 == 0) {
      this.xSpeed = random(-1, 1);
      this.ySpeed = random(-1, 1);
    }
  }

  checkHit(bullet) {
    if (dist(this.x, this.y, bullet.x, bullet.y) <= this.size / 2) {
      return true;
    } else {
      return false;
    }
  }

  readyToShoot() {
    if (frameCount % 240 == 0 && ships.length >= 1) { //checks if 4 seconds passed
      return true;
    } else {
      return false;
    }
  }

  makeBullet() {
    return new Bomb(this.x, this.y, 20, 3);
  }

  bound() {
    if (this.x >= width || this.x <= 0) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.y >= height / 4 || this.y <= 0) { //spawns top quarter of the canvas
      this.ySpeed = -this.ySpeed;
    }
  }
}
