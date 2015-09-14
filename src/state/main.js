/*global game*/
var state = {};

var background, ship;

state.create = function() {
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    ship = game.add.sprite(0, 0, 'ship');
    game.physics.arcade.enable(ship);
    ship.anchor.set(0.5);
    ship.scale.set(0.4);
    ship.update = function() {
        ship.body.velocity.set(0);
        if (game.physics.arcade.distanceToPointer(ship) > 10)
            game.physics.arcade.moveToPointer(ship, 300);
    };
};

state.update = function() {
    background.tilePosition.y += 200 * game.time.physicsElapsed;
};

module.exports = state;