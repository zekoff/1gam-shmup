/* global shmup, game */
var Enemy = require('../entity/enemy');
var MovementTypes = require('../util/movement');
var ShotTypes = require('../util/shot');
var Boss = require('../entity/boss');

var Stage = function(seed, difficulty) {
    game.rnd.sow([seed]);
    this.background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    this.background.fixedToCamera = true;
    this.waves = [];
    for (var i = 0; i < 1; i++)
        this.waves.push(new Wave(difficulty));
    this.waves.push(new BossWave(1));
    // XXX temp
    this.updateTimer = 0;
    game.rnd.sow(new Date().toString());

    this.stageState = this.INIT;
    this.stateTween = null;
};
Stage.prototype = {};
Stage.prototype.constructor = Stage;
Stage.prototype.INIT = -1;
Stage.prototype.INTRO = 0;
Stage.prototype.MAIN = 1;
Stage.prototype.OUTTRO = 2;
Stage.prototype.update = function() {
    switch (this.stageState) {
        case this.INIT:
            shmup.input.inputDisabled = true;
            shmup.player.x = 400;
            shmup.player.y = 600;
            this.stateTween = game.add.tween(shmup.player);
            this.stateTween.to({
                y: 500
            }, 2000, null, true);
            this.stateTween.onComplete.add(function() {
                this.stageState = this.MAIN;
            }, this);
            this.stageState = this.INTRO;
            break;
        case this.INTRO:
            shmup.input.inputDisabled = true;
            break;
        case this.MAIN:
            shmup.input.inputDisabled = false;
            this.background.tilePosition.y += 1200 * game.time.physicsElapsed;
            this.waves[0].update();

            // XXX temp
            this.updateTimer += game.time.physicsElapsed;
            if (this.waves.length == 1) {
                if (shmup.enemies.total == 0) this.stageState = this.OUTTRO;
                else return;
            }
            if (this.updateTimer > 5) {
                this.waves.shift();
                this.updateTimer = 0;
                // if (this.waves.length == 0) this.stageState = this.OUTTRO;
            }
            break;
        case this.OUTTRO:
            shmup.player.body.velocity.set(0);
            this.stateTween = game.add.tween(shmup.player);
            this.stateTween.to({
                y: 0
            }, 3000, null, true);
            this.stateTween.onComplete.add(function() {
                print('done');
            });
            shmup.input.inputDisabled = true;
            break;
    }
};

var Wave = function(difficulty) {
    this.isComplete = false;
    this.timeToAdd = 0;
    this.numberAdded = 0;
    this.enemies = [];
    // set up single batch of enemies
    this.numberInWave = difficulty * 3;
    this.movementPattern = game.rnd.pick(MovementTypes);
    this.shotPattern = game.rnd.pick(ShotTypes);
    this.imageKey = game.rnd.pick(Enemy.prototype.IMAGE_KEYS);
    this.healthRating = game.rnd.between(1, 3) * 3;
};
Wave.prototype = {};
Wave.prototype.constructor = Wave;
Wave.prototype.update = function() {
    this.timeToAdd += game.time.physicsElapsed;
    if (this.timeToAdd > 0.5 && this.numberAdded < this.numberInWave) {
        this.timeToAdd = 0;
        this.numberAdded++;
        var enemy = new Enemy(this.imageKey, this.healthRating,
            this.movementPattern, this.shotPattern);
        shmup.enemies.add(enemy);
        this.enemies.push(enemy);
    }
};

var BossWave = function(difficulty) {
    this.init = false;
    this.difficulty = difficulty;
};
BossWave.prototype = {};
BossWave.prototype.constructor = BossWave;
BossWave.prototype.update = function() {
    if (!this.init) {
        this.init = true;
        shmup.enemies.add(new Boss(this.difficulty));
    }
};

module.exports = Stage;