/* global Phaser, game, shmup */

var STARS_FOR_EXTRA_LIFE = 20;

var Hud = function() {
    Phaser.Group.call(this, game);
    this.scoreText = game.make.bitmapText(790, 600, 'font', 'SCORE: ', 24);
    this.scoreText.anchor.set(1, 1);
    this.livesText = game.make.bitmapText(120, 600, 'font', 'LIVES: ', 24);
    this.livesText.anchor.set(0, 1);
    this.starsText = game.make.bitmapText(120, 550, 'font', 'STARS: ', 16);
    this.livesText.anchor.set(0, 1);
    this.add(this.scoreText);
    this.add(this.livesText);
    this.add(this.starsText);
    this.lastFrameScore = 0;
    this.displayedScore = 0;
    this.scoreTween = null;
    this.weaponDisplay = new WeaponDisplay();
    this.boss = null;
    this.bossText = game.make.bitmapText(400, 40, 'font', "BOSS", 32);
    this.bossText.anchor.set(0.5, 0);
    this.bossText.exists = false;
    this.add(this.bossText);
    this.bossHealthBackground = game.make.image(400, 10, 'pix');
    this.bossHealthBackground.anchor.set(0.5, 0);
    this.bossHealthBackground.width = 400;
    this.bossHealthBackground.height = 20;
    this.bossHealthBackground.exists = false;
    this.bossHealthBackground.tint = 0x404040;
    this.add(this.bossHealthBackground);
    this.bossHealth = game.make.image(400, 11, 'pix');
    this.bossHealth.anchor.set(0.5, 0);
    this.bossHealth.width = 398;
    this.bossHealth.height = 18;
    this.bossHealth.exists = false;
    this.bossHealth.tint = 0xf89d00;
    this.add(this.bossHealth);
    this.scorePulse = null;
};
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;
Hud.prototype.pulseScore = function() {
    if (this.scorePulse) this.scorePulse.stop();
    this.scorePulse = game.add.tween(this.scoreText.scale);
    this.scorePulse.to({
        x: 1.3,
        y: 1.3
    }, 300, Phaser.Easing.Cubic.Out);
    this.scorePulse.to({
        x: 1,
        y: 1
    }, 500, Phaser.Easing.Cubic.In);
    this.scorePulse.start();
};
Hud.prototype.update = function() {
    if (this.lastFrameScore != shmup.score) {
        this.pulseScore();
        if (this.scoreTween) this.scoreTween.stop();
        this.scoreTween = game.add.tween(this);
        this.scoreTween.to({
            displayedScore: shmup.score
        }, 750, null, true);
    }
    if (shmup.stars >= STARS_FOR_EXTRA_LIFE) {
        shmup.stars -= STARS_FOR_EXTRA_LIFE;
        shmup.lives++;
    }
    this.lastFrameScore = shmup.score;
    this.scoreText.setText("SCORE: " + Math.floor(this.displayedScore));
    this.livesText.setText("LIVES: " + shmup.lives);
    this.starsText.setText("STARS: " + shmup.stars + "/" + STARS_FOR_EXTRA_LIFE);
    if (this.boss)
        this.bossHealth.width = 398 * (this.boss.health / this.boss.maxHealth);
};
Hud.prototype.setBoss = function(boss) {
    this.boss = boss;
    var bossExists = boss || 0;
    this.bossText.exists = bossExists;
    this.bossHealthBackground.exists = bossExists;
    this.bossHealth.exists = bossExists;
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
    // icon backgrounds
    this.redBackground = game.make.image(39, 69, 'pix');
    this.redBackground.width = this.redBackground.height = 22;
    this.redBackground.exists = false;
    this.add(this.redBackground);
    this.greenBackground = game.make.image(9, 69, 'pix');
    this.greenBackground.width = this.greenBackground.height = 22;
    this.greenBackground.exists = false;
    this.add(this.greenBackground);
    this.blueBackground = game.make.image(69, 69, 'pix');
    this.blueBackground.width = this.blueBackground.height = 22;
    this.blueBackground.exists = false;
    this.add(this.blueBackground);
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
    this.redBackground.exists = false;
    this.greenBackground.exists = false;
    this.blueBackground.exists = false;
    switch (shmup.player.currentWeapon) {
        case 0:
            this.greenBackground.exists = true;
            break;
        case 1:
            this.redBackground.exists = true;
            break;
        case 2:
            this.blueBackground.exists = true;
            break;
    }
};

module.exports = Hud;