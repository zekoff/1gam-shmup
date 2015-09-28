/* global Phaser, game, shmup */
var Player = function() {
    Phaser.Sprite.call(this, game, 400, 500, 'ship');
    game.physics.arcade.enable(this);
    this.anchor.set(0.5);
    this.scale.set(0.5);
    this.shotTimer = 0;
    this.body.setSize(this.body.width * .7, this.body.height * .4, 0, 5);
    this.body.collideWorldBounds = true;

    this.weapons = [shotgun, gatling, missile];
    this.weaponLevels = [2, 4, 1];
    this.currentWeapon = 0;
    this.weaponUpdate = this.weapons[this.currentWeapon].bind(this);
    this.chargeTime = 0;
    this.lastFrameCharging = false;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.FAST_SPEED = 350;
Player.prototype.SLOW_SPEED = 150;
Player.prototype.update = function() {
    this.shotTimer += game.time.physicsElapsed;
    this.weaponUpdate(this.alternateFire);
};
Player.prototype.cycleWeapon = function() {
    if (++this.currentWeapon > 2) this.currentWeapon = 0;
    this.weaponUpdate = this.weapons[this.currentWeapon].bind(this);
};

// Spread weapon. Alternate fire narrows spread.
// Powerup increases number of shots in blast
var shotgun = function(alternate) {
    var fireSpeed = .12;
    if (this.shotTimer < fireSpeed) return;
    this.shotTimer -= fireSpeed;
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
        shot.frame = 1;
        shot.power = 10;
        shot.update = function() {
            this.rotation = Phaser.Math.angleBetweenPoints(this.previousPosition, this) - (Math.PI / 2);
        };
    }
};

// Fast frontal weapon. Alternate fire charges a big shot.
// Powerup decreases time between shots
var gatling = function(alternate) {
    var shot;
    if (!alternate && this.lastFrameCharging) {
        this.lastFrameCharging = false;
        if (this.chargeTime > 1.5) this.chargeTime = 1.5;
        shot = shmup.playerBullets.getBullet();
        shot.x = this.x;
        shot.y = this.y;
        shot.body.reset(shot.x, shot.y);
        shot.body.velocity.y = -800;
        shot.revive();
        shot.rotation = 0;
        shot.update = function() {};
        shot.frame = 2;
        shot.power = this.chargeTime * 300;
        shot.height = 96 * this.chargeTime;
        shot.width = 48 * this.chargeTime;
        this.chargeTime = 0;
        return;
    }
    if (alternate) {
        this.chargeTime += game.time.physicsElapsed;
        this.lastFrameCharging = true;
        return;
    }
    this.lastFrameCharging = false;
    var fireSpeed = .1 - this.weaponLevels[1] / 100 * 2;
    if (this.shotTimer < fireSpeed) return;
    this.shotTimer -= fireSpeed;
    shot = shmup.playerBullets.getBullet();
    shot.x = this.x + (game.rnd.between(-20, 20));
    shot.y = this.y;
    shot.body.reset(shot.x, shot.y);
    shot.body.velocity.y = -800;
    shot.revive();
    shot.rotation = 0;
    shot.update = function() {};
    shot.frame = 2;
    shot.power = 10;
};

// Seeking weapon. Alternate fire increases speed but deactivates seeking
// Powerup increases payload
var missile = function(alternate) {
    var fireSpeed = alternate ? .1 : .2;
    if (this.shotTimer < fireSpeed) return;
    this.shotTimer -= fireSpeed;
    var shot = shmup.playerBullets.getBullet();
    shot.x = this.x;
    shot.y = this.y;
    shot.body.reset(shot.x, shot.y);
    shot.revive();
    shot.rotation = 0;
    shot.frame = 0;
    shot.power = this.weaponLevels[2] * 16;
    shot.update = function() {};
    if (alternate) {
        shot.angle = game.rnd.between(-15, 15);
        game.physics.arcade.velocityFromAngle(-90 + shot.angle, 300, shot.body.velocity);
    }
    else {
        shot.angle = game.rnd.between(-30, 30);
        game.physics.arcade.velocityFromAngle(-90 + shot.angle, 300, shot.body.velocity);
        shot.update = function() {
            var turnRate = Math.PI / 2;
            var closestDistance = 10000;
            var closestEnemy = null;
            shmup.enemies.forEachAlive(function(enemy) {
                var seekDistance = 300;
                var dist = game.physics.arcade.distanceBetween(enemy, this);
                if (dist < seekDistance && dist < closestDistance)
                    closestEnemy = enemy;
            }, this);
            if (closestEnemy) {
                var targetRotation = -Math.PI / 2 + game.physics.arcade.angleBetween(closestEnemy, this);
                if (this.rotation !== targetRotation) {
                    var delta = targetRotation - this.rotation;
                    if (delta > 0) this.rotation += turnRate * game.time.physicsElapsed;
                    else this.rotation -= turnRate * game.time.physicsElapsed;
                }
                if (Math.abs(delta) < turnRate * game.time.physicsElapsed) this.rotation = targetRotation;
                game.physics.arcade.velocityFromRotation(-Math.PI / 2 + this.rotation, 300, this.body.velocity);
            }
        };
    }
};

module.exports = Player;