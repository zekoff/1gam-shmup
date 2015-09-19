/* global game, Phaser */
// var MovementTypes = require('../util/movement');

var Enemy = function(imageKey, size, movementFunction, shotFunction) {
    Phaser.Sprite.call(this, game, 0, 0, imageKey);
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.moveTimer = 0;
    this.shotTimer = 0;
    this.scale.set(size);
    this.moveUpdate = movementFunction.bind(this);
    if (shotFunction)
        this.shotUpdate = shotFunction.bind(this);
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.IMAGE_KEYS = [];
['Black', 'Blue', 'Green', 'Red'].forEach(function(color) {
    for (var i = 1; i < 6; i++) {
        Enemy.prototype.IMAGE_KEYS.push('enemy' + color + i);
    }
});

Enemy.prototype.update = function() {
    this.rotation = Phaser.Math.angleBetweenPoints(this.previousPosition, this) - (Math.PI / 2);
    this.moveUpdate();
    if (this.shotUpdate)
        this.shotUpdate();
};


module.exports = Enemy;