/* global game, shmup */
var Stage = require('../util/stage');
var state = {};

var shots;

state.create = function() {
    shots = game.add.physicsGroup();
    shmup.enemies = game.add.group();
    shmup.stage = new Stage();

    var background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    background.update = function() {
        this.tilePosition.y += 1200 * game.time.physicsElapsed;
    };
    var ship = game.add.sprite(0, 0, 'ship');
    game.physics.arcade.enable(ship);
    ship.anchor.set(0.5);
    ship.scale.set(0.4);
    ship.shotTimer = 0;
    ship.update = function() {
        ship.body.velocity.set(0);
        if (game.physics.arcade.distanceToPointer(ship) > 5)
            game.physics.arcade.moveToPointer(ship, 300);
        if ((this.shotTimer += game.time.physicsElapsed) >= .25) {
            this.shotTimer = 0;
            var shot;
            if ((shot = shots.getFirstDead())) {
                shot.x = this.x;
                shot.y = this.y;
                shot.revive();
            }
            else {
                shot = game.make.sprite(this.x, this.y, 'pix');
                shot.height = 8;
                shot.width = 4;
                shot.anchor.set(0.5);
                shot.tint = 0x00ff00;
                shot.checkWorldBounds = true;
                shot.outOfBoundsKill = true;
                shots.add(shot);
                shot.body.velocity.y = -600;
            }
        }
    };
};

state.update = function() {
    shmup.stage.update();
    game.physics.arcade.overlap(shmup.enemies, shots, function(enemy, shot) {
        shot.kill();
    });
};

module.exports = state;