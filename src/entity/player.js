/* global Phaser, game, shmup */
var Player = function() {
    Phaser.Sprite.call(this, game, 400, 500, 'ship');
    game.physics.arcade.enable(this);
    this.anchor.set(0.5);
    this.scale.set(0.5);
    this.shotTimer = 0;
    this.body.setSize(this.body.width * .7, this.body.height * .4, 0, 5);
    this.body.collideWorldBounds = true;

    this.weaponLevels = [2, 4, 1];
    this.weaponUpdate = gatling.bind(this);
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.FAST_SPEED = 350;
Player.prototype.SLOW_SPEED = 150;
Player.prototype.update = function() {
    this.shotTimer += game.time.physicsElapsed;
    this.weaponUpdate(this.alternateFire);
};

// Spread weapon. Alternate fire narrows spread.
var shotgun = function(alternate) {
    if (this.shotTimer < .12) return;
    this.shotTimer = 0;
    var shot, i;
    var offset = alternate ? 5 : 10;
    var spread = alternate ? 2 : 15;
    for (var i = -this.weaponLevels[0]; i < this.weaponLevels[0] + 1; i++) {
        shot = shmup.playerBullets.getBullet();
        shot.x = this.x + (offset * i);
        shot.y = this.y;
        shot.body.reset(shot.x, shot.y);
        shot.body.velocity.x = spread * i;
        game.physics.arcade.velocityFromAngle(-90 + (spread * i), 400, shot.body.velocity);
        shot.revive();
        shot.update = function() {
            this.rotation = Phaser.Math.angleBetweenPoints(this.previousPosition, this) - (Math.PI / 2);
        };
    }
};

// Fast frontal weapon. Alternate fire charges a big shot.
var gatling = function(alternate) {
    var fireSpeed = .1 - this.weaponLevels[1] / 100 * 2;
    if (this.shotTimer < fireSpeed) return;
    this.shotTimer -= fireSpeed;
    var shot = shmup.playerBullets.getBullet();
    shot.x = this.x + (game.rnd.between(-20, 20));
    shot.y = this.y;
    shot.body.reset(shot.x, shot.y);
    shot.body.velocity.y = -800;
    shot.revive();
    shot.rotation = 0;
    shot.angle = 0;
};

// Seeking weapon. Alternate fire increases speed but deactivates seeking
var missile = function(alternate) {};

module.exports = Player;