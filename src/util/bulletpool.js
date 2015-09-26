/* global Phaser, game */

var BulletPool = function(key) {
    Phaser.Group.call(this, game, game.world, 'bulletpool', false,
        true, Phaser.Physics.ARCADE);
    this.key = key;
};
BulletPool.prototype = Object.create(Phaser.Group.prototype);
BulletPool.prototype.constructor = BulletPool;
BulletPool.prototype.getBullet = function() {
    var shot = this.getFirstDead();
    if (!shot) {
        shot = game.make.sprite(this.x, this.y, this.key);
        shot.height = 24;
        shot.width = 8;
        shot.anchor.set(0.5);
        shot.checkWorldBounds = true;
        shot.outOfBoundsKill = true;
        this.add(shot);
    }
    return shot;
};

module.exports = BulletPool;