/* global shmup, game */
var Enemy = require('../entity/enemy');
var MovementTypes = require('../util/movement');
var ShotTypes = require('../util/shot');

var Stage = function(seed, difficulty) {
    this.waves = [];
    for (var i = 0; i < 5; i++)
        this.waves.push(new Wave(difficulty));

    // XXX temp
    this.updateTimer = 0;
};
Stage.prototype = {};
Stage.prototype.constructor = Stage;
Stage.prototype.update = function() {
    this.waves[0].update();
    // if (this.waves[0].isComplete) {
    //     this.waves.shift();
    // }

    // XXX temp
    this.updateTimer += game.time.physicsElapsed;
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
    this.movementPattern = game.rnd.pick(MovementTypes);
    this.shotPattern = game.rnd.pick(ShotTypes);
    this.imageKey = game.rnd.pick(Enemy.prototype.IMAGE_KEYS);
    this.healthRating = game.rnd.between(3, 9);
};
Wave.prototype = {};
Wave.prototype.constructor = Wave;
Wave.prototype.update = function() {
    // this.isComplete = true;
    // this.enemies.forEach(function(enemy) {
    //     print(enemy.alive);
    //     if (enemy.alive) this.isComplete = false;
    // });
    // if (this.isComplete) print('complete'); else print('not complete');
    this.timeToAdd += game.time.physicsElapsed;
    if (this.timeToAdd > 0.5 && this.numberAdded < 5) {
        this.timeToAdd = 0;
        this.numberAdded++;
        var enemy = new Enemy(this.imageKey, this.healthRating,
            this.movementPattern, this.shotPattern);
        shmup.enemies.add(enemy);
        this.enemies.push(enemy);
    }
};

module.exports = Stage;