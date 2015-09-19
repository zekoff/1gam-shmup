/* global game, shmup */
var Stage = require('../util/stage');
var Player = require('../entity/player');
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
    shmup.ship = new Player();
    game.add.existing(shmup.ship);

    game.camera.x = 200;
};

state.update = function() {
    shmup.stage.update();
    game.physics.arcade.overlap(shmup.enemies, shmup.playerBullets, function(enemy, shot) {
        shot.kill();
    });
};

module.exports = state;