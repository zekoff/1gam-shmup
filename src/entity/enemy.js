/* global game, Phaser */

var Enemy = function(imageKey, healthRating, movementFunction, shotFunction) {
    Phaser.Sprite.call(this, game, 0, 0, imageKey);
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.moveTimer = 0;
    this.shotTimer = 0;
    this.scale.set(healthRating / 10);
    this.health = healthRating * healthRating / 2;
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
    if (!this.alive) return;
    this.rotation = Phaser.Math.angleBetweenPoints(this.previousPosition, this) - (Math.PI / 2);
    this.moveUpdate();
    if (this.shotUpdate)
        this.shotUpdate();
};


module.exports = Enemy;