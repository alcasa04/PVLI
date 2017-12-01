'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
	  this.game.load.baseURLR = 'http:/alcasa04.github.io/PVLI/plantilla-juego/src/index.html';
	  this.game.load.crossOrigin = 'anonymous';
    // load here assets required for the loading screen
    //this.game.load.image('preloader_bar', 'images/preloader_bar.png');
	this.game.load.image('logo', 'images/Phaser.png');
	this.game.load.image('prota', 'images/Personaje.png');
	this.game.load.image('enemigo', 'images/enemigo.png');
	this.game.load.image('suelo', 'images/suelo.png');
	this.game.load.image('cabeza', 'images/cabezaEnemigo.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    //this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    //this.loadingBar.anchor.setTo(0, 0.5);
    //this.load.setPreloadSprite(this.loadingBar);
    // TODO: load here the assets for the game
    //this.logo = this.game.add.sprite('logo');

	
  },

  create: function () {
    this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  

	
  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
  
  

};
