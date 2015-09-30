/* global shmup, game, Phaser */
var Enemy = require('../entity/enemy');
var MovementTypes = require('../util/movement');
var ShotTypes = require('../util/shot');
var Boss = require('../entity/boss');

var MUSIC_TRACKS = [
    'burning_engines',
    'challenge',
    'downtown',
    'ftl',
    'grand_prix'
];
var MUSIC_VOLUME = 0.1;

var INTRO_LENGTH = 400;
var OUTRO_LENGTH = 4000;
var WARP_SPEED = 3000;

var Stage = function(seed, difficulty) {
    game.rnd.sow([seed]);
    this.trackName = game.rnd.pick(MUSIC_TRACKS);
    this.background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    this.background.fixedToCamera = true;
    this.backgroundSpeed = WARP_SPEED;
    this.waves = [];
    for (var i = 0; i < 15; i++)
        this.waves.push(new Wave(difficulty));
    this.waves.push(new BossWave(5));

    // XXX temp
    this.updateTimer = 0;

    this.stageState = this.INTRO;
    this.stateTween = null;
    if (shmup.music) shmup.music.stop();
    shmup.music = game.sound.play(this.trackName, MUSIC_VOLUME, true);
};
Stage.prototype = {};
Stage.prototype.constructor = Stage;
Stage.prototype.INTRO = 0;
Stage.prototype.MAIN = 1;
Stage.prototype.OUTTRO = 2;
Stage.prototype.update = function() {
    this.background.tilePosition.y += this.backgroundSpeed * game.time.physicsElapsed;
    switch (this.stageState) {
        case this.INTRO:
            if (!this.stateTween) {
                shmup.input.inputDisabled = true;
                shmup.player.x = 400;
                shmup.player.y = 600;
                this.stateTween = game.add.tween(shmup.player);
                this.stateTween.to({
                    y: 300
                }, INTRO_LENGTH / 2, Phaser.Easing.Sinusoidal.Out);
                this.stateTween.to({
                    y: 500
                }, INTRO_LENGTH / 2, Phaser.Easing.Sinusoidal.InOut);
                this.stateTween.onComplete.add(function() {
                    shmup.input.inputDisabled = false;
                    this.stageState = this.MAIN;
                    this.stateTween = null;
                }, this);
                this.stateTween.start();
                game.add.tween(this).to({
                    backgroundSpeed: 600
                }, INTRO_LENGTH, null, true);
            }
            break;
        case this.MAIN:
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
            }
            break;
        case this.OUTTRO:
            if (!this.stateTween) {
                shmup.enemyBullets.callAll('kill');
                shmup.player.body.reset(shmup.player.x, shmup.player.y);
                shmup.input.inputDisabled = true;
                this.stateTween = game.add.tween(shmup.player);
                this.stateTween.to({
                    x: 400,
                    y: 500
                }, OUTRO_LENGTH / 2, Phaser.Easing.Sinusoidal.Out);
                this.stateTween.to({
                    y: 0
                }, OUTRO_LENGTH / 2, Phaser.Easing.Sinusoidal.In);
                game.time.events.add(OUTRO_LENGTH / 2, function() {
                    game.add.tween(this).to({
                        backgroundSpeed: WARP_SPEED
                    }, OUTRO_LENGTH / 2, null, true);
                }, this);
                this.stateTween.start();
                this.stateTween.onComplete.add(function() {
                    print('done');
                    // XXX start stage end state
                });
            }
            break;
    }
};

var Wave = function(difficulty) {
    this.isComplete = false;
    this.timeToAdd = 0;
    this.numberAdded = 0;
    this.enemies = [];
    // set up single batch of enemies
    var enemyType = game.rnd.between(1, 3);
    this.healthRating = enemyType * 3;
    this.numberInWave = 9 / enemyType;
    this.timeBetweenAdding = 0.35 * enemyType;
    this.movementPattern = game.rnd.pick(MovementTypes);
    this.shotPattern = game.rnd.pick(ShotTypes);
    this.imageKey = game.rnd.pick(Enemy.prototype.IMAGE_KEYS);
};
Wave.prototype = {};
Wave.prototype.constructor = Wave;
Wave.prototype.update = function() {
    this.timeToAdd += game.time.physicsElapsed;
    if (this.timeToAdd > this.timeBetweenAdding && this.numberAdded < this.numberInWave) {
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
    this.boss = new Boss(difficulty);
};
BossWave.prototype = {};
BossWave.prototype.constructor = BossWave;
BossWave.prototype.update = function() {
    if (!this.init) {
        this.init = true;
        shmup.enemies.add(this.boss);
        shmup.hud.setBoss(this.boss);
    }
};

module.exports = Stage;