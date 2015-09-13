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

state.create = function() {
    print('main');
    game.add.image(0,0,'starfield');
    var ship = game.add.sprite(0,0,'ship');
    ship.update = function() {
        this.x = game.input.activePointer.x;
        this.y = game.input.activePointer.y;
    };
};

state.update = function() {};

module.exports = state;
},{}],4:[function(require,module,exports){
/*global game*/
module.exports = {
    create:function(){
        print('title');
        game.state.start('main');
    }
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy5udm0vdjAuMTAuMzUvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc3RhcnR1cC5qcyIsInNyYy9zdGF0ZS9sb2FkLmpzIiwic3JjL3N0YXRlL21haW4uanMiLCJzcmMvc3RhdGUvdGl0bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWwgUGhhc2VyLCBnYW1lICovXG5nbG9iYWwuc2htdXAgPSB7fTtcbmdsb2JhbC5nYW1lID0gbmV3IFBoYXNlci5HYW1lKCk7XG5nbG9iYWwucHJpbnQgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuZ2FtZS5zdGF0ZS5hZGQoJ2xvYWQnLCByZXF1aXJlKCcuL3N0YXRlL2xvYWQnKSk7XG5nYW1lLnN0YXRlLmFkZCgndGl0bGUnLCByZXF1aXJlKCcuL3N0YXRlL3RpdGxlJykpO1xuZ2FtZS5zdGF0ZS5hZGQoJ21haW4nLCByZXF1aXJlKCcuL3N0YXRlL21haW4nKSk7XG5nYW1lLnN0YXRlLnN0YXJ0KCdsb2FkJyk7IiwiLypnbG9iYWwgZ2FtZSovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwcmVsb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZ2FtZS5sb2FkLmJhc2VVUkwgPSAnLi9hc3NldHMvJztcbiAgICAgICAgZ2FtZS5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xuICAgICAgICBnYW1lLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xuICAgICAgICBnYW1lLmxvYWQuaW1hZ2UoJ3BpeCcpO1xuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZ2FtZS5sb2FkLmltYWdlKCdzaGlwJyk7XG4gICAgICAgIGdhbWUubG9hZC5pbWFnZSgnc3RhcmZpZWxkJyk7XG4gICAgICAgIGdhbWUubG9hZC5zdGFydCgpO1xuICAgIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGdhbWUubG9hZC5oYXNMb2FkZWQpIHtcbiAgICAgICAgICAgIGdhbWUuc3RhdGUuc3RhcnQoJ3RpdGxlJyk7XG4gICAgICAgIH1cbiAgICB9XG59OyIsIi8qZ2xvYmFsIGdhbWUqL1xudmFyIHN0YXRlID0ge307XG5cbnN0YXRlLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHByaW50KCdtYWluJyk7XG4gICAgZ2FtZS5hZGQuaW1hZ2UoMCwwLCdzdGFyZmllbGQnKTtcbiAgICB2YXIgc2hpcCA9IGdhbWUuYWRkLnNwcml0ZSgwLDAsJ3NoaXAnKTtcbiAgICBzaGlwLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnggPSBnYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIueDtcbiAgICAgICAgdGhpcy55ID0gZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLnk7XG4gICAgfTtcbn07XG5cbnN0YXRlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge307XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdGU7IiwiLypnbG9iYWwgZ2FtZSovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgcHJpbnQoJ3RpdGxlJyk7XG4gICAgICAgIGdhbWUuc3RhdGUuc3RhcnQoJ21haW4nKTtcbiAgICB9XG59OyJdfQ==
