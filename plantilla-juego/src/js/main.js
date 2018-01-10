'use strict';

var PlayScene = require('./play_scene.js');
var Menu = require('./menu.js');
var Versus = require('./Versus.js');


var BootScene = {
  preload: function () {
	  this.game.load.baseURLR = 'http:/alcasa04.github.io/PVLI/plantilla-juego/src/index.html';
	  this.game.load.crossOrigin = 'anonymous';
	  
	  
	this.game.load.image('logo', 'images/Phaser.png');
	this.game.load.spritesheet('prota', 'images/PersonajeSpriteSheet.png', 50, 70);
	this.game.load.spritesheet('prota2', 'images/PersonajeSpriteSheet2.png', 50, 70);
	this.game.load.spritesheet('enemigo', 'images/enemigo.png', 70, 110);
	this.game.load.spritesheet('enemigo', 'images/enemigo.png', 75, 115);
	this.game.load.image('suelo', 'images/suelo.png');
	this.game.load.image('suelo2', 'images/suelo2.png');
	this.game.load.image('cabeza', 'images/cabezaEnemigo.png');
	this.game.load.spritesheet('enemigoMuere', 'images/enemigoMuere.png', 80, 115);
	this.game.load.image('background', 'images/background.png');
	this.game.load.image('ventana', 'images/ventana.png');
	this.game.load.spritesheet('rayo', 'images/Lightning.png', 300, 50);
	this.game.load.spritesheet('menu', 'images/Menu.png', 880, 650);
	this.game.load.image('flecha', 'images/Flecha.png');
	this.game.load.spritesheet('ray','images/Rayo.png', 300, 300);
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {

	
  },

  create: function () {
    this.game.state.start('menu');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  

	
  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('Versus', Versus);
  game.state.add('menu', Menu);
  game.state.start('boot');
  
  

};
