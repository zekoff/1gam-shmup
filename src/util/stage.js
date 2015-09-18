/* global shmup, game */
var Enemy = require('../entity/enemy');
var Stage = function(seed, difficulty) {
    this.timeToAdd = 0;
    this.numberAdded = 0;
};
Stage.prototype = {};
Stage.prototype.createEnemy = function() {
    shmup.enemies.add(new Enemy(0, 0));
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