/* global Phaser, game, shmup */
var Hud = function() {
    Phaser.Group.call(this, game);
    this.scoreText = game.make.bitmapText(790, 600, 'font', 'SCORE: ', 24);
    this.scoreText.anchor.set(1, 1);
    this.livesText = game.make.bitmapText(120, 600, 'font', 'LIVES: ', 24);
    this.livesText.anchor.set(0, 1);
    this.add(this.scoreText);
    this.add(this.livesText);
    this.lastFrameScore = 0;
    this.displayedScore = 0;
    this.scoreTween = null;
    this.weaponDisplay = new WeaponDisplay();
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

var WeaponDisplay = function() {
    Phaser.Group.call(this, game);
    this.x = 10;
    this.y = 490;
    var background = game.make.image(0, 0, 'pix');
    background.alpha = 0.5;
    background.width = 100;
    background.height = 100;
    this.add(background);
    // icons
    var redIcon = game.make.image(40, 70, 'powerup_red');
    redIcon.width = 20;
    redIcon.height = 20;
    this.add(redIcon);
    var greenIcon = game.make.image(10, 70, 'powerup_green');
    greenIcon.width = 20;
    greenIcon.height = 20;
    this.add(greenIcon);
    var blueIcon = game.make.image(70, 70, 'powerup_blue');
    blueIcon.width = 20;
    blueIcon.height = 20;
    this.add(blueIcon);
    // bars
    this.redBars = [];
    this.greenBars = [];
    this.blueBars = [];
    var i, bar;
    for (i = 0; i < 4; i++) {
        bar = game.make.image(40, 10 + (15 * (3 - i)), 'pix');
        bar.height = 10;
        bar.width = 20;
        bar.tint = 0xac3939;
        this.redBars.push(bar);
        this.add(bar);
    }
    for (i = 0; i < 4; i++) {
        bar = game.make.image(10, 10 + (15 * (3 - i)), 'pix');
        bar.height = 10;
        bar.width = 20;
        bar.tint = 0x71c937;
        this.greenBars.push(bar);
        this.add(bar);
    }
    for (i = 0; i < 4; i++) {
        bar = game.make.image(70, 10 + (15 * (3 - i)), 'pix');
        bar.height = 10;
        bar.width = 20;
        bar.tint = 0x36bbf5;
        this.blueBars.push(bar);
        this.add(bar);
    }
};
WeaponDisplay.prototype = Object.create(Phaser.Group.prototype);
WeaponDisplay.prototype.constructor = WeaponDisplay;
WeaponDisplay.prototype.RED = 0xac3939;
WeaponDisplay.prototype.GREEN = 0x71c937;
WeaponDisplay.prototype.BLUE = 0x36bbf5;
WeaponDisplay.prototype.GREY = 0x404040;
WeaponDisplay.prototype.update = function() {
    this.redBars.forEach(function(bar) {
        bar.tint = this.GREY;
    }, this);
    this.greenBars.forEach(function(bar) {
        bar.tint = this.GREY;
    }, this);
    this.blueBars.forEach(function(bar) {
        bar.tint = this.GREY;
    }, this);
    var i;
    for (i = 0; i < shmup.player.weaponLevels[1]; i++) this.redBars[i].tint = this.RED;
    for (i = 0; i < shmup.player.weaponLevels[0]; i++) this.greenBars[i].tint = this.GREEN;
    for (i = 0; i < shmup.player.weaponLevels[2]; i++) this.blueBars[i].tint = this.BLUE;
};
WeaponDisplay.prototype.showThenHide = function() {};

module.exports = Hud;