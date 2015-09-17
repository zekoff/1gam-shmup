/* global shmup, game */
var Enemy = require('../entity/enemy');
var Stage = function(seed, difficulty) {
    this.timeToAdd = 0;
    this.numberAdded = 0;
};
Stage.prototype = {};
Stage.prototype.createEnemy = function() {
    var enemy = new Enemy(0, 0);
    enemy.pathX = [100, 200, 400, 500, 550, 400, 200, 100];
    enemy.pathY = [50, 75, 150, 300, 200, 350, 100, 50];
    enemy.moveTimer = 0;
    shmup.enemies.add(enemy);
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