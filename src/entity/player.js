/* global Phaser, game, shmup */
var Player = function() {
    Phaser.Sprite.call(this, game, 400, 500, 'ship');
    game.physics.arcade.enable(this);
    this.anchor.set(0.5);
    this.scale.set(0.5);
    this.shotTimer = 0;
    this.body.setSize(this.body.width * .7, this.body.height * .4, 0, 5);
    this.body.collideWorldBounds = true;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.FAST_SPEED = 500;
Player.prototype.SLOW_SPEED = 250;
Player.prototype.update = function() {};
Player.prototype.shoot = function(spread) {
    this.shotTimer = 0;
    var shot, i;
    if (spread) {
        for (var i = -2; i < 3; i++) {
            shot = shmup.playerBullets.getBullet();
            shot.x = this.x + (10 * i);
            shot.y = this.y;
            shot.body.velocity.x = 120 * i;
            shot.revive();
        }
    }
    else {
        for (var i = -2; i < 3; i++) {
            shot = shmup.playerBullets.getBullet();
            shot.x = this.x + (5 * i);
            shot.y = this.y;
            shot.body.velocity.x = 15 * i;
            shot.revive();
        }

    }
};

module.exports = Player;