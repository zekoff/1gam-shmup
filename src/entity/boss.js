/* global game, Phaser, shmup */
var Enemy = require('./enemy');

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

var Boss = function(difficulty) {
    Phaser.Sprite.call(this, game, 400, 0, game.rnd.pick(Enemy.prototype.IMAGE_KEYS));
    shmup.enemies.add(this);
    this.anchor.set(0.5);
    game.physics.arcade.enable(this);
    this.body.setSize(this.body.width * .7, this.body.height * .7);
    this.moveTimer = 0;
    this.moveState = this.INIT;
    this.moveTween = null;
    this.shotTimer = 0;
    this.scale.set(1.5);
    this.health = difficulty * 100; // shot-in-the-dark for balance
};
Boss.prototype = Object.create(Phaser.Sprite.prototype);
Boss.prototype.constructor = Boss;
Boss.prototype.INIT = 0;
Boss.prototype.PAN = 1;
Boss.prototype.RANDOM = 2;
Boss.prototype.update = function() {
    // handle movement based on move state / health
    switch (this.moveState) {
        case this.INIT:
            this.y += 30 * game.time.physicsElapsed;
            if (this.y >= 150) this.moveState = this.PAN;
            break;
        case this.PAN:

            break;
        case this.RANDOM:
            break;
    }
    // shoot based on boss pattern
    this.shotTimer += game.time.physicsElapsed;
    if (this.shotTimer > 0.5) {
        // add shots
        this.shotTimer = 0;
        var shot = getBullet();
        shot.tint = 0xff80ff;
        shot.x = this.x;
        shot.y = this.y;
        shot.height = shot.width = 20;
        shot.body.reset(shot.x, shot.y);
        shot.revive();
        game.physics.arcade.moveToObject(shot, shmup.player, 300);
    }
};

module.exports = Boss;