/* global shmup, game */
var getBullet = function() {
    var shot = shmup.enemyBullets.getFirstDead();
    if (!shot) {
        shot = game.make.sprite(0, 0, 'pix');
        shot.checkWorldBounds = true;
        shot.outOfBoundsKill = true;
        game.physics.arcade.enable(shot);
        shmup.enemyBullets.add(shot);
    }
    return shot;
};

var straight = function() {
    this.shotTimer += game.time.physicsElapsed;
    if (this.shotTimer > .75 && game.rnd.frac() < .05) {
        this.shotTimer = 0;
        var shot = getBullet();
        shot.x = this.x;
        shot.y = this.y;
        shot.width = shot.height = 15;
        shot.tint = 0xff0000;
        shot.body.reset(shot.x, shot.y);
        shot.revive();
        shot.body.velocity.x = 0;
        shot.body.velocity.y = 250;
    }
};
var aimed = function() {
    this.shotTimer += game.time.physicsElapsed;
    if (this.shotTimer > 1.5 && game.rnd.frac() < .02) {
        this.shotTimer = 0;
        var shot = getBullet();
        shot.tint = 0xff80ff;
        shot.x = this.x;
        shot.y = this.y;
        shot.body.reset(shot.x, shot.y);
        shot.revive();
        game.physics.arcade.moveToObject(shot, shmup.player, 300);
    }
};
var fatAimed = function() {
    this.shotTimer += game.time.physicsElapsed;
    if (this.shotTimer > 1.5 && game.rnd.frac() < .05) {
        this.shotTimer = 0;
        var shot = getBullet();
        shot.tint = 0xffff00;
        shot.height = 30;
        shot.width = 30;
        shot.x = this.x;
        shot.y = this.y;
        shot.body.reset(shot.x, shot.y);
        shot.revive();
        game.physics.arcade.moveToObject(shot, shmup.player, 200);
    }
};
var burstAimed = function() {
    this.shotTimer += game.time.physicsElapsed;
    if (this.shotTimer > 1 && game.rnd.frac() < 0.01) {
        this.shotTimer = 0;
        for (var i = -2; i < 3; i++) {
            var shot = getBullet();
            shot.tint = 0xff8080;
            shot.height = shot.width = 15;
            shot.x = this.x;
            shot.y = this.y;
            shot.body.reset(shot.x, shot.y);
            shot.revive();
            game.physics.arcade.velocityFromAngle(90 + (15 * i), 200, shot.body.velocity);
        }
    }
};
var doubleStraight = function() {
    this.shotTimer += game.time.physicsElapsed;
    if (this.shotTimer > .75 && game.rnd.frac() < .05) {
        this.shotTimer = 0;
        var shot = getBullet();
        shot.x = this.x - 10;
        shot.y = this.y;
        shot.width = shot.height = 15;
        shot.tint = 0xff0000;
        shot.body.reset(shot.x, shot.y);
        shot.revive();
        shot.body.velocity.x = 0;
        shot.body.velocity.y = 250;
        shot = getBullet();
        shot.x = this.x + 10;
        shot.y = this.y;
        shot.width = shot.height = 15;
        shot.tint = 0xff0000;
        shot.body.reset(shot.x, shot.y);
        shot.revive();
        shot.body.velocity.x = 0;
        shot.body.velocity.y = 250;
    }
};

module.exports = [straight, aimed, fatAimed, burstAimed, doubleStraight];