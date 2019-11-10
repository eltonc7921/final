function barrierBreak(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i].checkHit(array2[j])) {

        array2.splice(j, 1);
        array1[i].opacity -= 15;

        if (array1[i].hp <= 0) { //check barrier's hp
          array1.splice(i, 1);
          i--;
          break
        } else {
          array1[i].hp--;
        }
      }
    }
  }
}

class Barrier {
  constructor(x, y, size, hp) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.hp = hp;
    this.opacity = 255;
  }

  display() {
    noFill();
    strokeWeight(5);
    stroke(230, 0, 255, this.opacity);
    ellipse(this.x, this.y, this.size);
  }

  checkHit(bullet) {
    if (dist(this.x, this.y, bullet.x, bullet.y) <= this.size / 2) { //checks if distance is close to the argument
      return true;
    } else {
      return false;
    }
  }
}

class GrazeBar {
  constructor(x, y, w, h, max) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.max = max;
  }

  display() {
    this.w = constrain(this.w, 0, this.max);
    strokeWeight(1);
    stroke(0);
    rectMode(CORNER);
    noFill();
    rect(this.x, this.y, this.max, this.h);
    fill(255, 255, 0, 150);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    text("Graze: " + this.w, this.x + this.w / 2, this.y + this.h / 1.5);
  }
}

function grazes(array1, array2, array3) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      for (let k = 0; k < array3.length; k++) {
        if (dist(array1[i].x, array1[i].y, array2[j].x, array2[j].y) <= 35) { //checks if array1 is near array2
          if (array2[j].graze == false) {
            array3[k].w += 5;
            array2[j].graze = true;
          }
        }
      }
    }
  }
}
