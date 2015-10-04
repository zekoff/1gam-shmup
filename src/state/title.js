/* global game, shmup */
var BLUE = 0x36bbf5;
var GREEN = 0x71c937;
var YELLOW = 0xb1c937;
var ORANGE = 0xac8039;
var RED = 0xac3939;
var DARK_RED = 0xcc2929;
var GREY = 0x404040;
module.exports = {
    create: function() {
        this.background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
        shmup.data.game = {
            tier: 0,
            index: 0,
            history: []
        };
        shmup.data.ship = {
            score: 0,
            weaponLevels: [1, 1, 1],
            currentWeapon: 0,
            stars: 0,
            lives: 2
        };
        // create title image
        // create main "play" button
        var playButton = game.add.image(250, 400, 'metalPanel');
        playButton.width = 300;
        playButton.height = 150;
        playButton.tint = BLUE;
        playButton.inputEnabled = true;
        playButton.events.onInputUp.add(function() {
            game.state.start('level_select');
        });
        game.add.bitmapText(400, 479, 'font', 'PLAY!', 36).anchor.set(0.5);
        // create challenge mode button
        var challengeButton = game.add.image(50, 400, 'metalPanel');
        challengeButton.width = 150;
        challengeButton.height = 150;
        challengeButton.tint = RED;
        challengeButton.inputEnabled = true;
        challengeButton.events.onInputUp.add(function() {
            game.state.start('challenge');
        });
        var challengeText = game.add.bitmapText(125, 479, 'font', 'Challenge\nMode', 16);
        challengeText.anchor.set(0.5);
        challengeText.align = 'center';
        // create fullscreen button
        var fullscreenButton = game.add.image(600, 410, 'metalPanel');
        fullscreenButton.width = 150;
        fullscreenButton.height = 50;
        fullscreenButton.tint = GREEN;
        fullscreenButton.inputEnabled = true;
        fullscreenButton.events.onInputUp.add(function() {
            game.scale.startFullScreen();
        });
        game.add.bitmapText(675, 439, 'font', 'FULLSCREEN', 16).anchor.set(0.5);
        // create gamepad button
        var gamepadButton = game.add.image(600, 490, 'metalPanel');
        var gamepadText = game.add.bitmapText(675, 519, 'font', "GAMEPAD?", 16);
        gamepadText.align = 'center';
        var activateGamepad = function() {
            shmup.data.global.gamepad = true;
            gamepadButton.tint = GREEN;
            gamepadButton.events.onInputUp.addOnce(deactivateGamepad);
            gamepadText.setText('GAMEPAD\nACTIVE');
        };
        var deactivateGamepad = function() {
            shmup.data.global.gamepad = false;
            gamepadButton.tint = GREY;
            gamepadButton.events.onInputUp.addOnce(activateGamepad);
            gamepadText.setText("GAMEPAD?");
        };
        gamepadText.anchor.set(0.5);
        gamepadButton.width = 150;
        gamepadButton.height = 50;
        gamepadButton.inputEnabled = true;
        deactivateGamepad();
        // create help button
    },
    update: function() {
        this.background.tilePosition.y += 10 * game.time.physicsElapsed;
    }
};