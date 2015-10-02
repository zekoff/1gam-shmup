/* global Phaser, game, shmup */
var WeaponDisplay = require('../entity/weapon_display');

var state = {};

var BLUE = 0x36bbf5;
var GREEN = 0x71c937;
var YELLOW = 0xb1c937;
var ORANGE = 0xac8039;
var RED = 0xac3939;
var DARK_RED = 0xcc2929;
var GREY = 0x404040;
var DIFFICULTY_COLORS = [GREEN, YELLOW, ORANGE, RED, DARK_RED];

var Stage = function(name, x) {
    Phaser.Sprite.call(this, game, x, 0, 'pix');
    this.stageName = name;
    this.x = x;
    this.height = this.width = 40;
    this.anchor.set(0.5);
};
Stage.prototype = Object.create(Phaser.Sprite.prototype);
Stage.prototype.constructor = Stage;

state.create = function() {
    var background = game.make.image(0, 0, 'starfield');
    game.add.bitmapText(400, 60, 'font', "STAGE SELECT", 48).anchor.set(0.5);


    this.stageTiers = [];
    // tier 1
    var tier1 = [];
    tier1.push(new Stage("It Is A Good Day To Die", 400));
    this.stageTiers.push(tier1);
    // tier 2
    var tier2 = [];
    tier2.push(new Stage("Glittering Prizes", 325));
    tier2.push(new Stage("Onscreen", 475));
    this.stageTiers.push(tier2);
    // tier 3
    var tier3 = [];
    tier3.push(new Stage("Make It So", 250));
    tier3.push(new Stage("Deck Me Out", 400));
    tier3.push(new Stage("Black Sheep Wall", 550));
    this.stageTiers.push(tier3);
    // tier 4
    var tier4 = [];
    tier4.push(new Stage("Something For Nothing", 175));
    tier4.push(new Stage("Ophelia", 325));
    tier4.push(new Stage("Unite The Clans", 475));
    tier4.push(new Stage("Power Overwhelming", 625));
    this.stageTiers.push(tier4);
    // tier 5
    var tier5 = [];
    tier5.push(new Stage("There Can Only Be One", 100));
    tier5.push(new Stage("There Is No Cow Level", 250));
    tier5.push(new Stage("Every Little Thing She Does", 400));
    tier5.push(new Stage("Modify The Phase Variance", 550));
    tier5.push(new Stage("Medieval Man", 700));
    this.stageTiers.push(tier5);
    // programmatically set traits
    var i, j;
    for (i = 0; i < 5; i++) {
        this.stageTiers[i].forEach(function(stage) {
            stage.y = 450 - (80 * i);
        });
        var difficulty = this.stageTiers[i].length;
        for (j = 0; j < this.stageTiers[i].length; j++) {
            var node = this.stageTiers[i][j];
            node.index = j;
            node.difficulty = difficulty--;
            node.tint = DIFFICULTY_COLORS[node.difficulty - 1];
        }
    }
    // line-drawing pass
    for (i = 0; i < 4; i++) {
        this.stageTiers[i].forEach(function(stage) {
            print(stage);
            var leftStage = this.stageTiers[i + 1][stage.index];
            var rightStage = this.stageTiers[i + 1][stage.index + 1];
            stage.leftLine = game.make.image(stage.x, stage.y, 'pix');
            stage.leftLine.anchor.set(0, 0.5);
            stage.leftLine.tint = RED;
            stage.leftLine.width = game.physics.arcade.distanceBetween(stage, leftStage);
            stage.leftLine.height = 2;
            stage.leftLine.rotation = game.physics.arcade.angleBetween(stage, leftStage);
            stage.rightLine = game.make.image(stage.x, stage.y, 'pix');
            stage.rightLine.anchor.set(0, 0.5);
            stage.rightLine.tint = GREEN;
            stage.rightLine.width = game.physics.arcade.distanceBetween(stage, rightStage);
            stage.rightLine.height = 2;
            stage.rightLine.rotation = game.physics.arcade.angleBetween(stage, rightStage);
        }, this);
    }

    var lineGroup = game.add.group();
    for (i = 0; i < 4; i++)
        this.stageTiers[i].forEach(function(stage) {
            lineGroup.add(stage.leftLine);
            lineGroup.add(stage.rightLine);
        });
    var nodeGroup = game.add.group();
    this.stageTiers.forEach(function(tier) {
        tier.forEach(function(stage) {
            nodeGroup.add(stage);
        });
    });
    var startNode = game.make.image(400, 530, 'pix');
    startNode.height = startNode.width = 15;
    startNode.anchor.set(0.5);
    nodeGroup.add(startNode);
    var startLine = game.make.image(400, 530, 'pix');
    startLine.width = game.physics.arcade.distanceBetween(startLine, this.stageTiers[0][0]);
    startLine.height = 2;
    startLine.anchor.set(0, 0.5);
    startLine.tint = GREEN;
    startLine.rotation = game.physics.arcade.angleBetween(startLine, this.stageTiers[0][0]);
    lineGroup.add(startLine);

    // set ship based on tier and index
    var currentLocation = shmup.data.game.tier == 0 ? startNode :
        this.stageTiers[shmup.data.game.tier - 1][shmup.data.game.index];
    this.ship = game.add.image(currentLocation.x, currentLocation.y, 'ship');
    this.ship.scale.set(0.5);
    this.ship.anchor.set(0.5);

    // enable input for nodes

    // add text
    game.add.bitmapText(10, 450, 'font', "STATUS", 32);
    // game.add.existing(new WeaponDisplay());
};

state.update = function() {};

module.exports = state;