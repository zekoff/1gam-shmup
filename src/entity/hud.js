/* global Phaser, game, shmup */
var Hud = function() {
    Phaser.Group.call(this, game);
    this.scoreText = game.make.bitmapText(10, 10, 'font', 'SCORE: ', 32);
    this.livesText = game.make.bitmapText(10, 590, 'font', 'LIVES: ', 24);
    this.livesText.anchor.set(0, 1);
    this.add(this.scoreText);
    this.add(this.livesText);
    this.lastFrameScore = 0;
    this.displayedScore = 0;
    this.scoreTween = null;
};
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;
Hud.prototype.update = function() {
    if (this.lastFrameScore != shmup.score) {
        if (this.scoreTween) this.scoreTween.stop();
        this.scoreTween = game.add.tween(this);
        this.scoreTween.to({
            displayedScore: shmup.score
        }, 750, null, true);
    }
    this.lastFrameScore = shmup.score;
    this.scoreText.setText("SCORE: " + Math.floor(this.displayedScore));

    this.livesText.setText("LIVES: " + shmup.lives);
};

module.exports = Hud;