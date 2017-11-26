'use strict';


var prota;
var enemigo;
var cabeza;
var sueloNormal;
var velCaida = 10;
var teclas;
var fuerzaEmpuje = 250;
var velocidadProta = 10;
var flipFlop = false;
var flipFlop2 = false;
var auxSueloY = 0;
var auxSueloX = 0;
function movible(objeto, posX, posY, spriteObj){};

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
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
	  
	prota = this.game.add.sprite(this.game.width/2-50, this.game.height-600, 'prota');
	prota.width= 50;
	prota.height = 75;
	this.game.physics.arcade.enable(prota);
    prota.body.colliderWorldBounds = true;
	prota.body.checkCollision.down = true;
	
	enemigo = this.game.add.sprite(this.game.width-200, 200, 'enemigo');
	enemigo.width = enemigo.height = 50;
	this.game.physics.arcade.enable(enemigo);
	enemigo.body.colliderWorldBounds = true;
	cabeza = enemigo.addChild(this.game.add.sprite(0, -enemigo.height*3, 'cabeza'));
	cabeza.height = cabeza.height*0.3;
    this.game.physics.arcade.enable(cabeza);
	cabeza.body.colliderWorldBounds = true;
	
	sueloNormal = this.game.add.sprite(0, this.game.height-100, 'suelo');
	sueloNormal.width = 250; sueloNormal.height = 100;
	this.game.physics.arcade.enable(sueloNormal);
	sueloNormal.body.inmovable = true;
	auxSueloY = sueloNormal.position.y
	auxSueloX = sueloNormal.position.x
	
	this.teclas = this.game.input.keyboard.createCursorKeys();
  },
  
  update: function()
  {
	  var choque = this.game.physics.arcade.collide(prota, sueloNormal);
	  var damageCabeza = this.game.physics.arcade.overlap(prota, cabeza);
	  
	  if(choque){

		flipFlop2 = true;
		prota.body.velocity.y = 0;
		sueloNormal.body.velocity.y = 0;
		sueloNormal.body.velocity.x = 0;
		sueloNormal.position.y = auxSueloY;
		sueloNormal.position.x = auxSueloX;
	  }
      else{
		  flipFlop2 = false;
	  }
	  if(flipFlop2)
	  {
		if(prota.body.velocity.x > 0)
		  prota.body.velocity.x -= 5;
	    else if(prota.body.velocity.x <0)
		  prota.body.velocity.x += 5;
	  }
	  
	//Movimiento del prota
	if(prota.body.velocity.y >= 150)
	{
		prota.body.velocity.y = 150;
	}
	else if(!flipFlop2)
	{
		prota.body.velocity.y += velCaida;
	}
	if(this.teclas.up.isDown)
	{
		flipFlop2 = false;
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
	
	if(damageCabeza)
	{
		  cabeza.destroy();
	};
  },
};

module.exports = PlayScene;
