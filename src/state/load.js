/* global game */
module.exports = {
    preload: function() {
        game.load.baseURL = './assets/';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('pix');
    },
    create: function() {
        game.load.image('ship');
        game.load.image('starfield');
        game.load.image('laser', 'Lasers/laserGreen02.png');
        var i, name;
        ['Black', 'Blue', 'Green', 'Red'].forEach(function(color) {
            for (i = 1; i < 6; i++) {
                name = 'enemy' + color + i;
                game.load.image(name, 'Enemies/' + name + '.png');
            }
        });
        game.load.start();
    },
    update: function() {
        if (game.load.hasLoaded) {
            game.state.start('title');
        }
    }
};