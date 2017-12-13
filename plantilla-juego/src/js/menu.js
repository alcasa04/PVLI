'use strict';


var teclas;
var foto;

var Menu = 
{
	
	preload: function()
	{
		
	},
	
  create: function () 
  {  
    teclas = this.game.input.keyboard.createCursorKeys();
	this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    foto = this.game.add.sprite(0, 0, 'menu');
	foto.width = this.game.width;
	foto.height = this.game.height-100;
	foto.position.y = this.game.height/2-foto.height/2.5;
	//this.game.state.start('play');
  },
  
  update: function()
  {
	  if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	  {
		  this.game.state.start('play');
	  }
  },
};

module.exports = Menu;
//comentario final