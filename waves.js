function createBasicEnemies(amount) {
  e = [];
  for (let i = 0; i < amount; i++) {
    e.push(new Enemy(random(width), random(height / 2), 35, 50, 150, 150)); //makes enemies
  }
  return e;
}

function createParabolaEnemies(amount) {
  p = [];
  for (let i = 0; i < amount; i++) {
    p.push(new ParabolaEnemy(random(width), random(height / 3), 60, 45, 350, 350));// makes enemies
  }
  return p;
}

function createExplosiveEnemies(amount) {
  ee = [];
  for (let i = 0; i < amount; i++) {
    ee.push(new ExplosiveEnemy(random(width), random(height / 4), 150, 25, 1500, 1500)); //makes enemies
  }
  return ee;
}

function createMultipleEnemies(eAmount,pAmount,eeAmount) {
 	m = [];
  for (let i = 0; i < eAmount; i++) {
   	m.push(new Enemy(random(width), random(height / 2), 35, 50, 150, 150));//makes basic enemies
  }
  for (let i = 0; i < pAmount; i++) {
    m.push(new ParabolaEnemy(random(width), random(height / 3), 60, 45, 350, 350)); //makes parabola enemies
  }
  for (let i = 0; i < eeAmount; i++) {
    m.push(new ExplosiveEnemy(random(width), random(height / 4), 150, 25, 1500, 1500)); //makes explosive enemies
  }
  return m;
}

function spawnBasicWaves(waveList) {
  if (waveList.length == 0) {
		return;
  }
  var wave = waveList[0];
  if (enemies.length == 0 && effects.length == 0) { // checks number of enemies and effects
    if (wave.effects.length > 0) { //runs only if there is an effect in store
      for (let i = 0; i < wave.effects[0].length; i++) {
        effects.push(wave.effects[0][i]);
      }

      wave.effects.splice(0, 1);

      return;
    }
    for (let i = 0; i < wave.enemies.length; i++) {
      enemies.push(wave.enemies[i]);
    }
    waveList.splice(0, 1);
  }
}

function createBasicWave(amount, frames) {
  return { //dictionary
    enemies: createBasicEnemies(amount),
    effects: [
      [
        new DelayEffect(frames),
      ],
    ]
  }
}

function createParabolaWave(amount, frames) {
  return {//dictionary
    enemies: createParabolaEnemies(amount),
    effects: [
      [
        new DelayEffect(frames),
      ],
    ]
  }
}

function createExplosiveEnemyWave(amount, frames) {
  return {//dictionary
    enemies: createExplosiveEnemies(amount),
    effects: [
      [
        new DelayEffect(frames),
      ],
    ]
  }
}

function createMultipleEnemyWave(amount1,amount2,amount3, frames) {
  return {//dictionary
    enemies: createMultipleEnemies(amount1,amount2,amount3),
    effects: [
      [
        new DelayEffect(frames),
      ],
    ]
  }
}
