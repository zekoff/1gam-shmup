/* global game, shmup */
var Stage = require('../util/stage');
var Player = require('../entity/player');
var Input = require('../util/input');
var BulletPool = require('../util/bulletpool');
var Emitter = require('../entity/emitter');
var Hud = require('../entity/hud');
var state = {};

state.create = function() {
    shmup.emitter = new Emitter();
    shmup.enemyBullets = new BulletPool('pix');
    shmup.playerBullets = new BulletPool('player_lasers');
    shmup.enemies = game.add.group();
    shmup.pickups = game.add.group();
    shmup.stage = new Stage('example2', 2);

    shmup.player = new Player();
    game.add.existing(shmup.player);
    shmup.input = new Input();
    shmup.score = 0;
    shmup.hud = new Hud();

    // game.input.onUp.addOnce(function(){
    //     game.scale.startFullScreen();
    // });

};

state.update = function() {
    shmup.stage.update();
    shmup.input.update();
    game.physics.arcade.overlap(shmup.enemies, shmup.playerBullets, function(enemy, shot) {
        enemy.damage(shot.power);
        shot.kill();
    });
    game.physics.arcade.overlap(shmup.player, shmup.enemyBullets, function(player, shot) {
        shot.kill();
        print('ouch!');
    });
    game.physics.arcade.overlap(shmup.player, shmup.pickups, function(player, pickup) {
        pickup.pickedUp();
        pickup.kill();
    });
};

state.render = function() {
    game.debug.body(shmup.player);
};

module.exports = state;