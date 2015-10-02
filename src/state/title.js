/* global game, shmup */
module.exports = {
    create: function() {
        shmup.data.game = {
            tier: 0,
            index: 0,
        };
        shmup.data.ship = {
            score: 0,
            weaponLevels: [1, 1, 1],
            stars: 0,
            lives: 2
        };
        // create main "play" button
        // create challenge mode button
        // create help button
        // create fullscreen button
        // create gamepad button
        game.state.start('level_select');
    }
};