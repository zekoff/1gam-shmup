/* global game, shmup */
var Stage = require('../util/stage');
var state = {};

var background;

state.create = function() {
    shmup.playerBullets = game.add.physicsGroup();
    shmup.playerBullets.getBullet = function() {
        var shot = this.getFirstDead();
        if (!shot) {
            shot = game.make.sprite(this.x, this.y, 'laser');
            shot.height = 24;
            shot.width = 8;
            shot.anchor.set(0.5);
            shot.checkWorldBounds = true;
            shot.outOfBoundsKill = true;
            shmup.playerBullets.add(shot);
            shot.body.velocity.y = -600;
        }
        return shot;
    };
    shmup.enemies = game.add.group();
    shmup.stage = new Stage();

    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    background.fixedToCamera = true;
    background.update = function() {
        this.tilePosition.y += 1200 * game.time.physicsElapsed;
    };
    shmup.ship = game.add.sprite(400, 500, 'ship');
    game.physics.arcade.enable(shmup.ship);
    shmup.ship.anchor.set(0.5);
    shmup.ship.scale.set(0.75);
    shmup.ship.shotTimer = 0;
    shmup.ship.update = function() {
        shmup.ship.body.velocity.set(0);
        if (game.physics.arcade.distanceToXY(shmup.ship, game.input.activePointer.worldX, game.input.activePointer.worldY) > 7)
            game.physics.arcade.moveToXY(shmup.ship, game.input.activePointer.worldX, game.input.activePointer.worldY,
                game.input.activePointer.isDown ? 150 : 400);
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

    game.camera.x = 200;
};

state.update = function() {
    shmup.stage.update();
    game.physics.arcade.overlap(shmup.enemies, shmup.playerBullets, function(enemy, shot) {
        shot.kill();
    });
};

module.exports = state;