/* global game, Phaser */
var MovementTypes = require('../util/movement');

var Enemy = function(x, y) {
    Phaser.Sprite.call(this, game, x, y, 'ship');
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.moveTimer = 0;
    this.scale.set(0.4);
    this.scale.y *= -1;
    this.tint = 0xff0000;
    this.moveUpdate = game.rnd.pick(MovementTypes).bind(this);
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function() {
    this.rotation = Phaser.Math.angleBetweenPoints(this.previousPosition, this) - (Math.PI / 2);
    this.moveUpdate();
};

module.exports = Enemy;