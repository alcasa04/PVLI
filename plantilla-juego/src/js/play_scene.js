'use strict';


var prota;
var enemigo;
var cabeza;
var sueloNormal;
var sueloNormal2;
var sueloNormal3;
var velCaida = 10;
var teclas;
var fuerzaEmpuje = 250;
var velocidadProta = 10;
var flipFlop = false;
var flipFlop2 = false;
var auxSueloY = 0;
var auxSueloX = 0;
var flipFlop3 = false;
var dirEnemigo = false;
var saltoEnemigo = 0;
var teclas;
	var Movible = function(game, spriteObj, posX, posY)
	{
		Phaser.Sprite.call(this, game, posX, posY, spriteObj);
		game.physics.arcade.enable(this);
		this.anchor.set(.5,0);
	}
	Movible.prototype = Object.create(Phaser.Sprite.prototype);
	Movible.constructor = Movible;
	Movible.prototype.update= function()
	{
	var damageCabeza = this.game.physics.arcade.overlap(prota, cabeza);
		if(damageCabeza)
	{
		  cabeza.destroy();
	}
	var choque = this.game.physics.arcade.collide(this, sueloNormal);
	var choque2 = this.game.physics.arcade.collide(this, sueloNormal2);
	var choque3 = this.game.physics.arcade.collide(this, sueloNormal3);
	if(choque || choque2 || choque3)
	  {
		flipFlop2 = true;
	  }
      else
	  {
		  flipFlop2 = false;
	  }
	  if(flipFlop2)
	  {
		if(this.body.velocity.x > 0)
		  this.body.velocity.x -= 5;
	    else if(prota.body.velocity.x <0)
		  this.body.velocity.x += 5;
	  }
	  if(prota.body.velocity.y >= 150)
	{
		prota.body.velocity.y = 150;
	}
	if(prota.position.y < this.game.world.position.y){
		prota.position.y = this.game.world.position.y;
		prota.body.velocity.y = 150;
	}
	if(prota.position.x > this.game.width)
	{
		prota.position.x = 0;
	}
	else if(prota.position.x < 0)
	{
		prota.position.x = this.game.width;
	}
	

	else if(!flipFlop2)
	{
		prota.body.velocity.y += velCaida;
	}
	if(teclas.up.isDown)
	{
		flipFlop2 = false;
		if(!flipFlop)
		{
			prota.body.velocity.y = 0;
			prota.body.velocity.y -= fuerzaEmpuje;
			flipFlop = true;
		}
	}
	else if(teclas.up.isUp)
	{
		flipFlop = false;
	}
	if(teclas.left.isDown && prota.body.velocity.x > -200)
	{
		prota.body.velocity.x -= velocidadProta;
		prota.scale.setTo(-1, 1);
	}
	if(teclas.right.isDown && prota.body.velocity.x < 200)
	{
			prota.body.velocity.x += velocidadProta;
			prota.scale.setTo(1, 1);
	}
	}
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
    teclas = this.game.input.keyboard.createCursorKeys();
	prota = this.game.world.addChild(new Movible(this.game,'prota', this.game.width/2-50, this.game.height-600));
	this.game.physics.startSystem(Phaser.Physics.ARCADE);

	
	this.teclas = this.game.input.keyboard.createCursorKeys();
	enemigo = this.game.add.sprite(this.game.width-200, 200, 'enemigo');
	//enemigo.width = enemigo.height = 50;
	enemigo.scale.x = enemigo.scale.y = 0.1;
	enemigo.anchor.set(0.5, 0.5);
	this.game.physics.arcade.enable(enemigo);
	enemigo.body.collideWorldBounds = false;
	cabeza = enemigo.addChild(this.game.add.sprite(0, -enemigo.height*7, 'cabeza'));
	cabeza.anchor.set(0.5, 0.5);
	cabeza.scale.y = cabeza.scale.y*0.3;
	this.game.physics.arcade.enable(cabeza);

	
	sueloNormal = this.game.add.sprite(0, this.game.height-100, 'suelo');
	sueloNormal.width = 250; sueloNormal.height = 100;
	this.game.physics.arcade.enable(sueloNormal);
	sueloNormal.body.immovable = true;
	
	sueloNormal2 = this.game.add.sprite(this.game.width-250, this.game.height-100, 'suelo');
	sueloNormal2.width = 250; sueloNormal2.height = 100;
	this.game.physics.arcade.enable(sueloNormal2);
	sueloNormal2.body.immovable = true;
	
	sueloNormal3 = this.game.add.sprite(this.game.width/2-119, this.game.height/2-20, 'suelo');
	sueloNormal3.width = 250; sueloNormal3.height = 50;
	this.game.physics.arcade.enable(sueloNormal3);
	sueloNormal3.body.immovable = true;
	
  },
  
  update: function()
  {
	  this.game.physics.arcade.collide(enemigo, sueloNormal);
	  this.game.physics.arcade.collide(enemigo, sueloNormal2);
	  this.game.physics.arcade.collide(enemigo, sueloNormal3);
	  this.game.physics.arcade.collide(cabeza, sueloNormal3);
	  
	//Movimiento del enemigo
	saltoEnemigo ++;
	if(enemigo.body.velocity.y >= 150)
	{
		enemigo.body.velocity.y = 150;
	}
	else if(enemigo.position.y <= this.game.height-100)
	{
		enemigo.body.velocity.y += velCaida;
	}
	if(enemigo.position.x > this.game.width)
	{
		enemigo.position.x = 0;
	}
	else if(enemigo.position.x < 0)
	{
		enemigo.position.x = this.game.width;
	}
	if(enemigo.position.y <= this.game.world.position.y)
	{
		enemigo.body.velocity.y = 150;
	}
	if(enemigo.position.y >= this.game.height-100 && !flipFlop3)
	{
		enemigo.body.velocity.y -= fuerzaEmpuje;
		flipFlop3 = true;
	}
	else
	{
		flipFlop3 = false;
		if(enemigo.position.y >= this.game.height-100)
		saltoEnemigo = 0;
	}
	if(enemigo.body.velocity.x < 150 && dirEnemigo == false)
	{
		enemigo.body.velocity.x+=5;
	}
	else if(enemigo.body.velocity.x > -150 && dirEnemigo == true)
	{
		enemigo.body.velocity.x-=5;
	}
	if(enemigo.body.velocity.x >= 150 && this.game.rnd.integerInRange(0, 200) <= 1)
	{
		dirEnemigo = true;
	}
	else if(enemigo.body.velocity.x <= -150 && this.game.rnd.integerInRange(0, 200) <= 1)
	{
		dirEnemigo = false;
	}
	
	if(saltoEnemigo >= 35 && !flipFlop3 && this.game.rnd.integerInRange(0, 100) <= 4)
	{
		enemigo.body.velocity.y -= fuerzaEmpuje*1.5;
		flipFlop3 = true;
		saltoEnemigo = 0;
	}		
  },
};

module.exports = PlayScene;
