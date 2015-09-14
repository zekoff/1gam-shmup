(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* global Phaser, game */
global.shmup = {};
global.game = new Phaser.Game();
global.print = console.log.bind(console);
game.state.add('load', require('./state/load'));
game.state.add('title', require('./state/title'));
game.state.add('main', require('./state/main'));
game.state.start('load');
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./state/load":2,"./state/main":3,"./state/title":4}],2:[function(require,module,exports){
/*global game*/
module.exports = {
    preload: function() {
        game.load.baseURL = './assets/';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image('pix');
    },
    create: function() {
        game.load.image('ship');
        game.load.image('starfield');
        game.load.start();
    },
    update: function() {
        if (game.load.hasLoaded) {
            game.state.start('title');
        }
    }
};
},{}],3:[function(require,module,exports){
/*global game*/
var state = {};

var background, ship;

state.create = function() {
    background = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    ship = game.add.sprite(0, 0, 'ship');
    game.physics.arcade.enable(ship);
    ship.anchor.set(0.5);
    ship.scale.set(0.4);
    ship.update = function() {
        ship.body.velocity.set(0);
        if (game.physics.arcade.distanceToPointer(ship) > 10)
            game.physics.arcade.moveToPointer(ship, 300);
    };
};

state.update = function() {
    background.tilePosition.y += 200 * game.time.physicsElapsed;
};

module.exports = state;
},{}],4:[function(require,module,exports){
/*global game*/
module.exports = {
    create: function() {
        game.state.start('main');
    }
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5udm0vdjAuMTAuMzUvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc3RhcnR1cC5qcyIsInNyYy9zdGF0ZS9sb2FkLmpzIiwic3JjL3N0YXRlL21haW4uanMiLCJzcmMvc3RhdGUvdGl0bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsIFBoYXNlciwgZ2FtZSAqL1xuZ2xvYmFsLnNobXVwID0ge307XG5nbG9iYWwuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZSgpO1xuZ2xvYmFsLnByaW50ID0gY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbmdhbWUuc3RhdGUuYWRkKCdsb2FkJywgcmVxdWlyZSgnLi9zdGF0ZS9sb2FkJykpO1xuZ2FtZS5zdGF0ZS5hZGQoJ3RpdGxlJywgcmVxdWlyZSgnLi9zdGF0ZS90aXRsZScpKTtcbmdhbWUuc3RhdGUuYWRkKCdtYWluJywgcmVxdWlyZSgnLi9zdGF0ZS9tYWluJykpO1xuZ2FtZS5zdGF0ZS5zdGFydCgnbG9hZCcpOyIsIi8qZ2xvYmFsIGdhbWUqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJlbG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWUubG9hZC5iYXNlVVJMID0gJy4vYXNzZXRzLyc7XG4gICAgICAgIGdhbWUuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcbiAgICAgICAgZ2FtZS5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdwaXgnKTtcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnc2hpcCcpO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3N0YXJmaWVsZCcpO1xuICAgICAgICBnYW1lLmxvYWQuc3RhcnQoKTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChnYW1lLmxvYWQuaGFzTG9hZGVkKSB7XG4gICAgICAgICAgICBnYW1lLnN0YXRlLnN0YXJ0KCd0aXRsZScpO1xuICAgICAgICB9XG4gICAgfVxufTsiLCIvKmdsb2JhbCBnYW1lKi9cbnZhciBzdGF0ZSA9IHt9O1xuXG52YXIgYmFja2dyb3VuZCwgc2hpcDtcblxuc3RhdGUuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgYmFja2dyb3VuZCA9IGdhbWUuYWRkLnRpbGVTcHJpdGUoMCwgMCwgODAwLCA2MDAsICdzdGFyZmllbGQnKTtcbiAgICBzaGlwID0gZ2FtZS5hZGQuc3ByaXRlKDAsIDAsICdzaGlwJyk7XG4gICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5lbmFibGUoc2hpcCk7XG4gICAgc2hpcC5hbmNob3Iuc2V0KDAuNSk7XG4gICAgc2hpcC5zY2FsZS5zZXQoMC40KTtcbiAgICBzaGlwLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzaGlwLmJvZHkudmVsb2NpdHkuc2V0KDApO1xuICAgICAgICBpZiAoZ2FtZS5waHlzaWNzLmFyY2FkZS5kaXN0YW5jZVRvUG9pbnRlcihzaGlwKSA+IDEwKVxuICAgICAgICAgICAgZ2FtZS5waHlzaWNzLmFyY2FkZS5tb3ZlVG9Qb2ludGVyKHNoaXAsIDMwMCk7XG4gICAgfTtcbn07XG5cbnN0YXRlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGJhY2tncm91bmQudGlsZVBvc2l0aW9uLnkgKz0gMjAwICogZ2FtZS50aW1lLnBoeXNpY3NFbGFwc2VkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0ZTsiLCIvKmdsb2JhbCBnYW1lKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGdhbWUuc3RhdGUuc3RhcnQoJ21haW4nKTtcbiAgICB9XG59OyJdfQ==
