/* global Phaser, game, shmup */
var Hud = function() {
    Phaser.Group.call(this, game);
    this.scoreText = game.make.bitmapText(0, 0, 'font', 'SCORE: ', 32);
    this.add(this.scoreText);
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
};

module.exports = Hud;