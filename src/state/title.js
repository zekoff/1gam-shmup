/* global game, shmup */
module.exports = {
    create: function() {
        shmup.data.game = {};
        shmup.data.ship = {
            score: 0,
            weaponLevels: [1, 1, 1],
            stars: 0,
            lives: 2
        };
        game.state.start('main');
    }
};