/* global shmup, game */
var getBullet = function() {
    var shot = shmup.enemyBullets.getFirstDead();
    if (!shot) {
        shot = game.make.sprite(0, 0, 'pix');
        shot.width = 10;
        shot.height = 10;
        shot.tint = 0xff0000;
        game.physics.arcade.enable(shot);
        shmup.enemyBullets.add(shot);
    }
    return shot;
};

var straight = function() {
    this.shotTimer += game.time.physicsElapsed;
    if (this.shotTimer > .85 && game.rnd.frac() < .05) {
        this.shotTimer = 0;
        var shot = getBullet();
        shot.x = this.x;
        shot.y = this.y;
        shot.body.reset(shot.x, shot.y);
        shot.revive();
        shot.body.velocity.x = 0;
        shot.body.velocity.y = 250;
    }
};

module.exports = [straight];