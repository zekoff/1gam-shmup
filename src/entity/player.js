/* global Phaser, game, shmup */
var Player = function() {
    Phaser.Sprite.call(this, game, 400, 500, 'ship');
    game.physics.arcade.enable(this);
    this.anchor.set(0.5);
    this.scale.set(0.5);
    this.shotTimer = 0;
    this.body.setSize(this.body.width * .5, this.body.height * .25);
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
    if (game.physics.arcade.distanceToPointer(this) > 10)
        game.physics.arcade.moveToPointer(this,
            game.input.activePointer.isDown ? 250 : 500);
    else this.body.velocity.set(0);
    if ((this.shotTimer += game.time.physicsElapsed) >= .12) {
        this.shotTimer = 0;
        var shot, i;
        if (!game.input.activePointer.isDown) {
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
    }

};

module.exports = Player;