/* global Phaser, game, shmup */
var Player = function() {
    Phaser.Sprite.call(this, game, 400, 500, 'ship');
    game.physics.arcade.enable(this);
    this.anchor.set(0.5);
    this.scale.set(0.5);
    this.shotTimer = 0;
    this.body.setSize(this.body.width * .7, this.body.height * .4, 0, 5);
    this.body.collideWorldBounds = true;

    this.weaponLevels = [4, 1, 1];
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.FAST_SPEED = 500;
Player.prototype.SLOW_SPEED = 250;
Player.prototype.update = function() {};
Player.prototype.shoot = function(alternate) {
    this.shotTimer = 0;
    var shot, i;
    var offset = alternate ? 10 : 5;
    var spread = alternate ? 15 : 2;
    for (var i = -this.weaponLevels[0]; i < this.weaponLevels[0] + 1; i++) {
        shot = shmup.playerBullets.getBullet();
        shot.x = this.x + (offset * i);
        shot.y = this.y;
        shot.body.reset(shot.x, shot.y);
        shot.body.velocity.x = spread * i;
        game.physics.arcade.velocityFromAngle(-90 + (spread * i), 500, shot.body.velocity);
        shot.revive();
        shot.update = function() {
            this.rotation = Phaser.Math.angleBetweenPoints(this.previousPosition, this) - (Math.PI / 2);
        };
    }
};

module.exports = Player;