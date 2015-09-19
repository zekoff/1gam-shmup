/* global shmup, game */
var Enemy = require('../entity/enemy');
var MovementTypes = require('../util/movement');

var Stage = function(seed, difficulty) {
    this.timeToAdd = 0;
    this.numberAdded = 0;
    this.waves = [];

    // XXX temporary
    this.movementPattern = game.rnd.pick(MovementTypes);
    // this.shotPattern = game.rnd.pick(ShotTypes);
    this.imageKey = game.rnd.pick(Enemy.prototype.IMAGE_KEYS);
};
Stage.prototype = {};
Stage.prototype.createEnemy = function() {
    shmup.enemies.add(new Enemy(this.imageKey, .4, this.movementPattern));
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