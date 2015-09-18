/* global Phaser, game */
var PATH_X = [100, 200, 400, 500, 550, 400, 200, 100];
var PATH_Y = [50, 75, 150, 300, 200, 350, 100, 50];
var spline = function() {
    this.moveTimer += game.time.physicsElapsed / 5;
    if (this.moveTimer > 1) this.moveTimer = 0;
    this.x = Phaser.Math.catmullRomInterpolation(PATH_X, this.moveTimer);
    this.y = Phaser.Math.catmullRomInterpolation(PATH_Y, this.moveTimer);
    this.body.reset(this.x, this.y);
};
module.exports = [spline];