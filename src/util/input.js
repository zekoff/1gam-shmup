/* global game, shmup, Phaser */
var DEADZONE = .1;
var MOUSE_INPUT = function() {
    if (this.inputDisabled) return;
    if (game.physics.arcade.distanceToPointer(shmup.player) > 10)
        game.physics.arcade.moveToPointer(shmup.player,
            game.input.activePointer.isDown ?
            shmup.player.SLOW_SPEED : shmup.player.FAST_SPEED);
    else {
        shmup.player.body.velocity.set(0);
        shmup.player.x = game.input.activePointer.x;
        shmup.player.y = game.input.activePointer.y;
    }
    if ((shmup.player.shotTimer += game.time.physicsElapsed) >= .12) {
        shmup.player.shoot(!game.input.activePointer.isDown);
    }
};
var GAMEPAD_INPUT = function() {
    if (this.inputDisabled) return;
    if ((shmup.player.shotTimer += game.time.physicsElapsed) >= .12)
        shmup.player.shoot(!this.pad.isDown(Phaser.Gamepad.XBOX360_A));

    if (!game.input.gamepad.supported || !game.input.gamepad.active ||
        !this.pad.connected) return;

    shmup.player.body.velocity.set(0);
    var xDir = 0,
        yDir = 0;

    // d-pad control
    if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) xDir = -1;
    else if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) xDir = 1;
    if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)) yDir = -1;
    else if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)) yDir = 1;
    this.dummyPoint.copyFrom(shmup.player);
    this.dummyPoint.x += xDir;
    this.dummyPoint.y += yDir;
    if (xDir || yDir)
        game.physics.arcade.moveToObject(shmup.player, this.dummyPoint,
            this.pad.isDown(Phaser.Gamepad.XBOX360_A) ?
            shmup.player.SLOW_SPEED : shmup.player.FAST_SPEED);

    // thumbstick control
    var xAxis = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
    var yAxis = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
    if (Math.abs(xAxis) < DEADZONE) xAxis = 0;
    if (Math.abs(yAxis) < DEADZONE) yAxis = 0;
    this.dummyPoint.copyFrom(shmup.player);
    this.dummyPoint.x += xAxis * 100;
    this.dummyPoint.y += yAxis * 100;
    if (xAxis || yAxis)
        game.physics.arcade.moveToObject(shmup.player, this.dummyPoint,
            this.pad.isDown(Phaser.Gamepad.XBOX360_A) ?
            shmup.player.SLOW_SPEED : shmup.player.FAST_SPEED);
};

var Input = function(useGamepad) {
    game.input.gamepad.start();
    this.pad = game.input.gamepad.pad1;
    this.dummyPoint = new Phaser.Point();
    if (useGamepad) this.update = GAMEPAD_INPUT.bind(this);
    else this.update = MOUSE_INPUT.bind(this);
};
Input.prototype = {};
Input.prototype.constructor = Input;

module.exports = Input;