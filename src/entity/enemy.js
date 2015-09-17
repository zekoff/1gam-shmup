/* global game, Phaser */
var Enemy = function(x, y) {
    Phaser.Sprite.call(this, game, x, y, 'pix');
    this.height = this.width = 40;
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.moveTimer = 0;
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function() {
    this.rotation = Phaser.Math.angleBetweenPoints(this.previousPosition, this);
    this.moveTimer += game.time.physicsElapsed / 5;
    if (this.moveTimer > 1) this.moveTimer = 0;
    this.x = Phaser.Math.catmullRomInterpolation(this.pathX, this.moveTimer);
    this.y = Phaser.Math.catmullRomInterpolation(this.pathY, this.moveTimer);
    this.body.reset(this.x, this.y);

};

module.exports = Enemy;