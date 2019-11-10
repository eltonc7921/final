function spawnDeathEffect(x, y, size, opacity, amount) {
  for (let i = 0; i < amount; i++) {
    var color = [random(255), 0, 0]; //range of red
    effects.push(new DeathEffect(x, y, random(-5, 5), random(-5, 5), size, opacity, color)) //makes death effect
  }
}

function death(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let ii = 0; ii < array2.length; ii++) {
      if (array2[ii].checkHit(array1[i])) {
        spawnDeathEffect(array1[i].x, array1[i].y, 10, 200, 50);
        array1.splice(i, 1);
        break
      }
    }
  }
}

function enemyDeath(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].hp <= 0) { //check if no hp
      array.splice(i, 1);
      i--;
    }
  }
}

class Effect {
  constructor() {
    this.hp = 1;
  }
  display() {}
}

class DelayEffect extends Effect {
  constructor(frames) {
    super();
    this.frames = frames;
  }
  display() {
    if (this.frames <= 0) {
      this.hp = 0;
    } else {
      this.frames--;
    }
  }
}

class DeathEffect extends Effect {
  constructor(x, y, vX, vY, size, opacity, color) {
    super();
    this.x = x;
    this.y = y;
    this.vX = vX;
    this.vY = vY;
    this.size = size;
    this.opacity = opacity;
    this.color = color;
  }

  display() {
    stroke(0);
    strokeWeight(1);
    fill(this.color[0], this.color[1], this.color[2], this.opacity);
    ellipse(this.x, this.y, this.size);
    this.x += this.vX;
    this.y += this.vY;
    if (this.opacity <= 0) {
      this.hp = 0;
    } else {
      this.opacity -= 1;
    }
  }
}
