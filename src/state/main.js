/*global game*/
var state = {};

state.create = function() {
    print('main');
    game.add.image(0,0,'starfield');
    var ship = game.add.sprite(0,0,'ship');
    ship.update = function() {
        this.x = game.input.activePointer.x;
        this.y = game.input.activePointer.y;
    };
};

state.update = function() {};

module.exports = state;