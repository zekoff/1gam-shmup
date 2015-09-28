/* global game, Phaser, shmup */

var Enemy = function(imageKey, healthRating, movementFunction, shotFunction) {
    Phaser.Sprite.call(this, game, 0, 0, imageKey);
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(this.body.width * .8, this.body.height * .8);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.moveTimer = 0;
    this.speedFactor = healthRating / 3; // higher speed factor is slower (?)
    this.speedFactor *= 0.5;
    this.shotTimer = 0;
    this.scale.set(healthRating / 10);
    this.health = healthRating * healthRating / 2 * 10;
    this.moveUpdate = movementFunction.bind(this);
    if (shotFunction)
        this.shotUpdate = shotFunction.bind(this);
    this.events.onKilled.add(function() {
        if (this.health > 0) return;
        shmup.emitter.burst(this.x, this.y);
        game.sound.play('explode' + game.rnd.between(1, 6), 0.2);
    }, this);
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