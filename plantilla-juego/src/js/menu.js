'use strict';


var teclas;
var foto;
var anim = 10;
var auxAnim = 0;
var seleccion = 1;
var flipFlop1 = false;
var flipFlop2 = false;
var flecha;

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
	flecha = this.game.add.sprite(180, 0, 'flecha');
	//this.game.state.start('play');
  },
  
  update: function()
  {  
	  
	  auxAnim ++;
	  if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && seleccion == 1)
	  {
		  this.game.state.start('play');
	  }
	  if((teclas.up.isDown || teclas.down.isDown) && !flipFlop1 && !flipFlop2)
	  {
		  auxAnim = 0;
		  flipFlop1 = true;
		  flipFlop2 = true;
		  if(seleccion == 1)seleccion = 2;
		  else seleccion = 1;
	  }
	  if(teclas.up.isUp) flipFlop1 = false;
	  if(teclas.down.isUp)flipFlop2 = false;
	  if(seleccion == 1 && auxAnim < anim)
	  {
		  foto.frame = 1;
	  }
	  else if(seleccion == 2 && auxAnim < anim)
	  {
		  foto.frame = 2;
	  }
	  if(auxAnim > anim)
	  {
		  foto.frame = 0;
	  }
	  if(auxAnim > anim*2)
	  {

		  auxAnim = 0;
	  }
	  		  if(seleccion == 1)
		  {			  
	       flecha.position.y = 365;
		  }
		  else
		  {
			  flecha.position.y = 465;
		  }
  },
};

module.exports = Menu;
//comentario final