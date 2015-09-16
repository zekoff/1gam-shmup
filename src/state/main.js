/*global game,Phaser*/
var state = {};

var enemies, shots, enemy;

state.create = function() {
    shots = game.add.physicsGroup();
    enemies = game.add.physicsGroup();

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

    enemy = game.make.sprite(0, 0, 'pix');
    enemy.height = enemy.width = 40;
    enemy.anchor.set(0.5);
    enemy.x = 300;
    enemy.y = 50;
    // game.add.tween(enemy).to({
    //     y: 300,
    //     x: 500
    // }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
    enemies.add(enemy);

    enemy.pathX = [100, 200, 400, 500, 550, 400, 200, 100];
    enemy.pathY = [50, 75, 150, 300, 200, 350, 100, 50];
    enemy.moveTimer = 0;
};

state.update = function() {
    game.physics.arcade.overlap(enemies, shots, function(enemy, shot) {
        shot.kill();
    });
    enemy.moveTimer += game.time.physicsElapsed / 5;
    if (enemy.moveTimer > 1) enemy.moveTimer = 0;
    enemy.x = Phaser.Math.catmullRomInterpolation(enemy.pathX, enemy.moveTimer);
    enemy.y = Phaser.Math.catmullRomInterpolation(enemy.pathY, enemy.moveTimer);
    enemy.body.reset(enemy.x, enemy.y);
};

module.exports = state;