/* global game, Phaser, shmup */

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
    for (i = 0; i < shmup.data.ship.weaponLevels[1]; i++) this.redBars[i].tint = this.RED;
    for (i = 0; i < shmup.data.ship.weaponLevels[0]; i++) this.greenBars[i].tint = this.GREEN;
    for (i = 0; i < shmup.data.ship.weaponLevels[2]; i++) this.blueBars[i].tint = this.BLUE;
    this.redBackground.exists = false;
    this.greenBackground.exists = false;
    this.blueBackground.exists = false;
    switch (shmup.data.ship.currentWeapon) {
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

module.exports = WeaponDisplay;