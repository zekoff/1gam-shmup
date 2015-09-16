/*global game,Phaser*/
var state = {};

var enemy, shots;

state.create = function() {
    shots = game.add.group();
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
        if (game.physics.arcade.distanceToPointer(ship) > 10)
            game.physics.arcade.moveToPointer(ship, 300);
        if ((this.shotTimer += game.time.physicsElapsed) >= .25) {
            this.shotTimer = 0;
            var shot = game.make.sprite(this.x, this.y, 'pix');
            shot.height = 8;
            shot.width = 4;
            shot.anchor.set(0.5);
            shot.tint = 0x00ff00;
            game.physics.arcade.enable(shot);
            shot.body.velocity.y = -600;
            shots.add(shot);
        }
    };

    enemy = game.add.sprite(0, 0, 'pix');
    enemy.height = enemy.width = 40;
    enemy.anchor.set(0.5);
    game.physics.arcade.enable(enemy);
    enemy.x = 300;
    enemy.y = 50;
    game.add.tween(enemy).to({
        y: 300,
        x: 500
    }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
};

state.update = function() {
    game.physics.arcade.overlap(enemy, shots, function(enemy, shot) {
        shot.kill();
    });
};

module.exports = state;