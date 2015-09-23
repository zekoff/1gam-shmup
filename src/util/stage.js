/* global shmup, game */
var Enemy = require('../entity/enemy');
var MovementTypes = require('../util/movement');
var ShotTypes = require('../util/shot');
var Boss = require('../entity/boss');

var Stage = function(seed, difficulty) {
    game.rnd.sow([seed]);
    this.waves = [];
    for (var i = 0; i < 1; i++)
        this.waves.push(new Wave(difficulty));
    this.waves.push(new BossWave(5));
    // XXX temp
    this.updateTimer = 0;
    game.rnd.sow(new Date().toString());
};
Stage.prototype = {};
Stage.prototype.constructor = Stage;
Stage.prototype.update = function() {
    this.waves[0].update();

    // XXX temp
    this.updateTimer += game.time.physicsElapsed;
    if (this.waves.length == 1) return;
    if (this.updateTimer > 5) {
        this.waves.shift();
        this.updateTimer = 0;
    }
};

var Wave = function(difficulty) {
    this.isComplete = false;
    this.timeToAdd = 0;
    this.numberAdded = 0;
    this.enemies = [];
    // set up single batch of enemies
    this.numberInWave = difficulty * 3;
    this.movementPattern = game.rnd.pick(MovementTypes);
    this.shotPattern = game.rnd.pick(ShotTypes);
    this.imageKey = game.rnd.pick(Enemy.prototype.IMAGE_KEYS);
    this.healthRating = game.rnd.between(1, 3) * 3;
};
Wave.prototype = {};
Wave.prototype.constructor = Wave;
Wave.prototype.update = function() {
    this.timeToAdd += game.time.physicsElapsed;
    if (this.timeToAdd > 0.5 && this.numberAdded < this.numberInWave) {
        this.timeToAdd = 0;
        this.numberAdded++;
        var enemy = new Enemy(this.imageKey, this.healthRating,
            this.movementPattern, this.shotPattern);
        shmup.enemies.add(enemy);
        this.enemies.push(enemy);
    }
};

var BossWave = function(difficulty) {
    this.init = false;
    this.difficulty = difficulty;
};
BossWave.prototype = {};
BossWave.prototype.constructor = BossWave;
BossWave.prototype.update = function() {
    if (!this.init) {
        this.init = true;
        shmup.enemies.add(new Boss(this.difficulty));
    }
};

module.exports = Stage;