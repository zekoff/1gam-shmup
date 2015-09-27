/* global Phaser, game */
module.exports = {
    preload: function() {
        game.load.baseURL = './assets/';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.load.image('pix');
    },
    create: function() {
        game.load.audio('burning_engines', 'Music/burning_engines.ogg');
        game.load.audio('challenge', 'Music/challenge.ogg');
        game.load.audio('downtown', 'Music/downtown.ogg');
        game.load.audio('ftl', 'Music/ftl.ogg');
        game.load.audio('grand_prix', 'Music/grand_prix.ogg');
        game.load.image('ship');
        game.load.image('starfield');
        game.load.image('explosion');
        game.load.image('laser', 'Lasers/laserGreen02.png');
        var i, name;
        ['Black', 'Blue', 'Green', 'Red'].forEach(function(color) {
            for (i = 1; i < 6; i++) {
                name = 'enemy' + color + i;
                game.load.image(name, 'Enemies/' + name + '.png');
            }
        });
        for (i = 1; i <= 6; i++) {
            name = 'explode' + i;
            game.load.audio(name, 'Sounds/' + name + '.ogg');
        }
        game.load.audio('boss_explode', 'Sounds/boss_explode.ogg');
        game.load.bitmapFont('font','font.png','font.fnt');
        game.load.start();
    },
    update: function() {
        if (game.load.hasLoaded) {
            game.state.start('title');
        }
    }
};