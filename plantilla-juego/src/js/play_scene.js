'use strict';


var prota;
var enemigo;
var velCaida = 10;
var teclas;
var fuerzaEmpuje = 250;
var velocidadProta = 10;
var flipFlop = false;

var PlayScene = {
	
	preload: function()
	{
	var logo = this.game.add.sprite(
    this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
	logo.destroy();
	

	},
	
  create: function () 
  {
	  
	prota = this.game.add.sprite(this.game.width/2-50, this.game.height-600, 'prota');
		prota.width = prota.height = 50;
	enemigo = this.game.add.sprite(this.game.width-200, 200, 'enemigo');
	    enemigo.width = enemigo.height = 50;
		
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.enable(prota, Phaser.Physics.ARCADE);
	this.teclas = this.game.input.keyboard.createCursorKeys();
	
  },
  
  update: function()
  {
    if(prota.body.velocity.y >= 150)
	{
		prota.body.velocity.y = 150;
	}
	else
	{
		prota.body.velocity.y += velCaida;
	}
	if(this.teclas.up.isDown)
	{
		if(!flipFlop)
		{
	    prota.body.velocity.y = 0;
		prota.body.velocity.y -= fuerzaEmpuje;
		flipFlop = true;
		}
	}
	else if(this.teclas.up.isUp)
	{
		flipFlop = false;
	}
	if(this.teclas.left.isDown && prota.body.velocity.x > -200)
	{
		prota.body.velocity.x -= velocidadProta;
	}
    if(this.teclas.right.isDown && prota.body.velocity.x < 200)
	{
		prota.body.velocity.x += velocidadProta;
	}
  },

  
};

module.exports = PlayScene;
