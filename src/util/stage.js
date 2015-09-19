/* global shmup, game */
var Enemy = require('../entity/enemy');
var MovementTypes = require('../util/movement');
var ShotTypes = require('../util/shot');

var Stage = function(seed, difficulty) {
    this.timeToAdd = 0;
    this.numberAdded = 0;
    this.waves = [];

    // XXX temporary
    this.movementPattern = game.rnd.pick(MovementTypes);
    this.shotPattern = game.rnd.pick(ShotTypes);
    this.imageKey = game.rnd.pick(Enemy.prototype.IMAGE_KEYS);
    this.healthRating = game.rnd.between(3, 9);
};
Stage.prototype = {};
Stage.prototype.createEnemy = function() {
    shmup.enemies.add(new Enemy(this.imageKey, this.healthRating, this.movementPattern, this.shotPattern));
};
Stage.prototype.update = function() {
    this.timeToAdd += game.time.physicsElapsed;
    if (this.timeToAdd > 0.5 && this.numberAdded < 5) {
        this.timeToAdd = 0;
        this.numberAdded++;
        this.createEnemy();
    }
};

module.exports = Stage;