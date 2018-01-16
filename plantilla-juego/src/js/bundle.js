(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//Declaración de variables
var prota;
var prota2;
var enemigo;
var sueloNormal;
var sueloNormal2;
var sueloNormal3;
var velCaida = 10;

//entrada de teclado
var teclas;
var gameOver;
var fin = false;
var ganador;
var score1 = 0, score2 = 0;
var score1Text, score2Text;

var fuerzaEmpuje = 250;
var velocidadProta = 10;

//auxiliares para el salto y choques
var auxSueloY = 0;
var auxSueloX = 0;
var flipFlop3 = false;
var saltoEnemigo = 0;

//randomizado de objetos
var randomBooster;
var contador = 0;
var booster;

//Musica
var musicFondo;
var musicImp;
var musicExpl;
var musicGlob;

//el fondo
var background;

//variables empleadas en los rayos
var rayo;
var animRayo = 3;
var auxRayo = 0;

var vida = function(game, posX, posY)
{
	Phaser.Sprite.call(this, game, posX, posY, 'vida');
	game.physics.arcade.enable(this);
	this.anim = 0;
}
vida.prototype = Object.create(Phaser.Sprite.prototype);
vida.constructor = vida;
vida.prototype.update = function()
{
	this.anim++;
	if(this.anim > 5) this.frame = 1;
	if(this.anim > 10)
	{
		this.anim = 0;
		this.frame = 0;
	}
	this.body.velocity.y = 50;
	var cho = this.game.physics.arcade.overlap(this, prota);
	var cho2 = this.game.physics.arcade.overlap(this, prota2);
	if(cho)
	{
		if(prota.vidas < 2)
		prota.vidas++;
		this.destroy();
	}
	if(cho2)
	{
		if(prota2.vidas < 2)
		prota2.vidas++;
		this.destroy();
	}
}
var cohete = function(game, posX, posY, tipo)
{
	if(tipo == 1)Phaser.Sprite.call(this, game, posX, posY, 'coheteBooster');
	else Phaser.Sprite.call(this, game, posX, posY, 'cohete');
	game.physics.arcade.enable(this);
	this.tipo = tipo;
	this.anim = 0;
	this.anchor.set(.5, .5);
}
cohete.prototype = Object.create(Phaser.Sprite.prototype);
cohete.constructor = cohete;
cohete.prototype.update = function()
{

	this.anim++;
	if(this.anim > 5) this.frame = 1;
	if(this.anim > 10)
	{
		this.anim = 0;
		this.frame = 0;
	}
	var choq3 = this.game.physics.arcade.overlap(this, prota);
    var choq4 = this.game.physics.arcade.overlap(this, prota2);
	if(this.tipo == 1)
	{
		this.body.velocity.y = 50;
	}
    else
	{
		this.body.velocity.y = -300;
	}
	if(choq3)
	{
		if(this.tipo == 1)
		{
		prota.cohete = true;
		this.destroy();
		}
		else
		{
			score1-=2;
			musicExpl.play();
			musicGlob.play();
			prota.vidas--;
			prota.body.velocity.y = -400;
			this.destroy();
		}
	}
	else if(choq4)
	{
		if(this.tipo == 1)
		{
		prota2.cohete = true;
		this.destroy();
		}
		else
		{
			score2-=2;
			musicExpl.play();
			musicGlob.play();
			prota2.vidas--;
			prota2.body.velocity.y = -400;
			this.destroy();
		}
	}
}
var ray = function(game, sprite, posX, posY)
{
	Phaser.Sprite.call(this, game, posX, posY, sprite);
	game.physics.arcade.enable(this);
	this.height = game.height+150;
	this.width = 500;
	this.anchor.set(.5, .5);
	this.retardo = 0;
	this.duracion = 50;



}
ray.prototype = Object.create(Phaser.Sprite.prototype);
ray.constructor = rayo;
ray.prototype.update = function()
{
	this.body.setSize(25, this.body.height, 150-this.body.width/4, 0);
	this.frame = this.retardo/4;
	this.retardo++;
	if(this.frame >=15 && this.frame < 29)
	{
		var choq = this.game.physics.arcade.overlap(this, prota);
		var choq2 = this.game.physics.arcade.overlap(this, prota2);
		if(choq && !prota.esInven)
		{
			score1-=2;
			musicGlob.play();
			prota.vidas--;
			prota.esInven = true;
			prota.auxInvencible = 0;
			if(prota.position.x < this.position.x) prota.body.velocity.x = -250;
			else prota.body.velocity.x = 250;
		}
		if(choq2 && !prota2.esInven)
		{
			score2-=2;
			musicGlob.play();
			prota2.vidas--;
			prota2.esInven = true;
			prota2.auxInvencible = 0;
			if(prota2.position.x < this.position.x) prota2.body.velocity.x = -250;
			else prota2.body.velocity.x = 250;
		}
	}
    if(this.frame >= 31) this.destroy();
}

//los enemigos al morir lo que hacen es desaparecer y generar un sprite de enemigo en caida
var muere = function(game, sprite, posX, posY, escala)
{
	Phaser.Sprite.call(this, game, posX, posY, sprite);

	//ajustes del enemigo en caida
  	game.physics.arcade.enable(this);
	this.anchor.set(.5,.5);
	this.vel = 5;
	this.scale = escala;
	this.anim = 5;
	this.velAnim = 0;
	this.puede= true;

	
}

muere.prototype = Object.create(Phaser.Sprite.prototype);
muere.constructor = muere;
muere.prototype.update = function()
{
	this.body.velocity.y += this.vel;
	this.body.checkCollision.right = false;
	this.body.checkCollision.left = false;
	var choque5 = this.game.physics.arcade.collide(this, sueloNormal);
	var choque6 = this.game.physics.arcade.collide(this, sueloNormal2);
	var choque7 = this.game.physics.arcade.collide(this, sueloNormal3);
	if(choque5 || choque6 || choque7)
	{
		if(this.puede)
		{
		musicExpl.play();
		this.puede = false;
		}
		this.frame = 1;
		this.velAnim+=1;
		if(this.velAnim > this.anim)
		{
			this.alpha = 0;
		}
	}
}

//clase movible, permite que un objeto se mueva
var Movible = function(game, spriteObj, posX, posY, play)
	{
		Phaser.Sprite.call(this, game, posX, posY, spriteObj);
		game.physics.arcade.enable(this);
		this.anchor.set(.5,0);
		this.vidas = 2;
		this.invencible = 75;
		this.auxInvencible = 0;
		this.esInven = false;
		this.frame = 0;
		this.velAnim = 6;
		this.auxAnim = 0;
		this.flipFlop = false;
		var flipFlop2 = false;
		this.player = play;
		this.cohete = true;
	}
	Movible.prototype = Object.create(Phaser.Sprite.prototype);
	Movible.constructor = Movible;
	Movible.prototype.update = function()
	{
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player == 1 && this.cohete == true)
		{
            this.cohete = false;
			this.game.world.addChild(new cohete(this.game, this.position.x, this.position.y-50, 2));
		}
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.L) && this.player == 2 && this.cohete == true)
		{
			this.cohete = false;
			this.game.world.addChild(new cohete(this.game, this.position.x, this.position.y-50, 2));
		}
			
		
    this.auxAnim += 1;
	if(this.auxAnim > this.velAnim)
	{
		if(this.vidas == 2)this.frame = 6;
		else this.frame = 2;
	}
	var choque = this.game.physics.arcade.collide(this, sueloNormal);
	var choque2 = this.game.physics.arcade.collide(this, sueloNormal2);
	var choque3 = this.game.physics.arcade.collide(this, sueloNormal3);
	
	if(this.player == 1)var choquePlayer = this.game.physics.arcade.overlap(this, prota2);
	
	if(choquePlayer)
	{
		if(this.player == 1)
		{
			if(!this.esInven && this.position.y-20 > prota2.position.y)
			{
				score1-=5;
				score2+=6;
				musicGlob.play();
				prota2.body.velocity.y = -250;
				this.vidas--;
				this.esInven = true;
				this.auxInvencible = 0;
			}
			else if(!prota2.esInven && prota2.position.y-20 > this.position.y)
			{
				score2-=5;
				score1+=6;
				musicGlob.play();
				this.body.velocity.y = -250;
				prota2.vidas--;
				prota2.auxInvencible = 0;
				prota2.esInven = true;
			}
		}
	}

	if(choque || choque2 || choque3)
	  {
		this.flipFlop2 = true;
	  }
      else
	  {
		  this.flipFlop2 = false;
	  }
	  if(this.flipFlop2)
	  {
		if(this.body.velocity.x > 0)
		  this.body.velocity.x -= 5;
	    else if(this.body.velocity.x <0)
		  this.body.velocity.x += 5;
	  }
	  if(this.body.velocity.y > 0)
	  {
	   if(this.vidas == 2)this.frame = 0;
	   else this.frame = 1;
	  }
	  if(this.body.velocity.y >= 150)
	{

		this.body.velocity.y = 150;
	}
	if(this.position.y < this.game.world.position.y)
	{
		this.position.y = this.game.world.position.y;
		this.body.velocity.y = 150;
	}
	if(this.position.x > this.game.width)
	{
		this.position.x = 0;
	}
	else if(this.position.x < 0)
	{
		this.position.x = this.game.width;
	}
	

	else if(!this.flipFlop2)
	{
		this.body.velocity.y += velCaida;
	}
	if(this.player == 2)
	{
		if(teclas.up.isDown)
		{
			musicImp.play();
			this.flipFlop2 = false;
			if(!this.flipFlop)
			{
				if(this.vidas == 2)this.frame = 4;
				else this.frame = 5;
				this.auxAnim = 0;
				this.body.velocity.y = 0;
				this.body.velocity.y -= fuerzaEmpuje;
				this.flipFlop = true;
			}
		}
		if(teclas.up.isUp)
		{
			this.flipFlop = false;

		}
		if(teclas.left.isDown && this.body.velocity.x > -200)
		{
			this.body.velocity.x -= velocidadProta;
			this.scale.setTo(-1, 1);
		}
		if(teclas.right.isDown && this.body.velocity.x < 200)
		{
			this.body.velocity.x += velocidadProta;
			this.scale.setTo(1, 1);
		}
	}
	else if(this.player == 1)
	{
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.W))
		{
			musicImp.play();
			this.flipFlop2 = false;
			if(!this.flipFlop)
			{
				if(this.vidas == 2)this.frame = 4;
				else this.frame = 5;
				this.auxAnim = 0;
				this.body.velocity.y = 0;
				this.body.velocity.y -= fuerzaEmpuje;
				this.flipFlop = true;
			}
		}
		if(!this.game.input.keyboard.isDown(Phaser.Keyboard.W))
		{
			this.flipFlop = false;

		}
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.A) && this.body.velocity.x > -200)
		{
			this.body.velocity.x -= velocidadProta;
			this.scale.setTo(-1, 1);
		}
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.D) && this.body.velocity.x < 200)
		{
			this.body.velocity.x += velocidadProta;
			this.scale.setTo(1, 1);
		}
	}
		if(this.game.physics.arcade.overlap(this, rayo))
	{
		if(this.player == 1) score1-=2;
	    else score2-=2;
		musicGlob.play();
		this.destroy();
		this.vidas = 0;
	}
		this.muerte();
		if(this.esInven)
		this.invencibilidad();
		this.muerte();
		if(this.esInven)
		this.invencibilidad();
	}
	Movible.prototype.muerte = function()
	{
		if(this.vidas <= 0)
		{
			this.destroy();
		}
	}
	Movible.prototype.invencibilidad = function()
	{
		this.auxInvencible += 1;
		if(this.auxInvencible<this.invencible/6)
		{
		this.alpha = 0.2;
		}
		if(this.auxInvencible>this.invencible/6 && this.auxInvencible < this.invencible/4)
		{
			this.alpha = 1;
		}
		else if(this.auxInvencible > this.invencible/4 && this.auxInvencible < this.invencible/2)
		{
			this.alpha = 0.2;
		}
		else if(this.auxInvencible > this.invencible/2 && this.auxInvencible<this.invencible)
		{
			this.alpha = 1;
		}
		else if(this.auxInvencible >= this.invencible)
		{			
	       this.esInven = false;
		}
	}
var Enemigo = function (game, sprite, posX, posY)
{
	Phaser.Sprite.call(this, game, posX, posY, sprite);
	game.physics.arcade.enable(this);
	this.anchor.set(.5, .5);
	this.scale.y = this.scale.x = 0.9;
	this.frame = 0;
	this.cabeza = true;
	var destruido = false;
	var dirEnemigo = false;
	this.anim = 6;
	this.auxAnim = 0;
	this.baja = 50;

	
}
Enemigo.prototype = Object.create(Phaser.Sprite.prototype);
Enemigo.constructor = Enemigo;
Enemigo.prototype.update = function()
{
	if(this.baja > 0)
	{	
     this.baja--;
	 this.body.velocity.y = 100;
	}
	else
	{
	this.auxAnim += 1;
	if(this.auxAnim > this.anim)
	{
		this.frame = 0;
	}
	if(!this.cabeza)
	{
		this.frame = 2;
	}
	if(this.body.velocity.x > 0)
	{
		this.scale.x = -1;
	}
	else
	{
		this.scale.x = 1;
	}
	this.game.physics.arcade.collide(this, sueloNormal);
	this.game.physics.arcade.collide(this, sueloNormal2);
	this.game.physics.arcade.collide(this, sueloNormal3);
	
	var choque = this.game.physics.arcade.overlap(this, prota);
	var choque2 = this.game.physics.arcade.overlap(this, prota2);

	if(!this.destruido && choque)
	{
		if(this.position.y-85 > prota.position.y)
		{
	    score1+=10;
		musicGlob.play();
		prota.body.velocity.y = -250;
		this.cabeza = false;
		this.destruido = true;
		this.alpha = 0;
		this.game.world.addChild(new muere(this.game, 'enemigoMuere',this.position.x, this.position.y, this.scale));
		}
		else if(!prota.esInven)
		{
			score2-=2;
			musicGlob.play();
			prota.vidas--;
			prota.body.velocity.x = -(this.position.x -prota.position.x)*2;
		    this.body.velocity.x = (this.position.x -prota.position.x)*2;
			prota.auxInvencible = 0;
			prota.esInven = true;
		}
	}
	if(!this.destruido && choque2)
	{
		if(this.position.y-85 > prota2.position.y)
		{
		score2+=10;
		musicGlob.play();
		prota2.body.velocity.y = -250;
		this.cabeza = false;
		this.destruido = true;
		this.alpha = 0;
		this.game.world.addChild(new muere(this.game, 'enemigoMuere',this.position.x, this.position.y, this.scale));
		}
		else if(!prota2.esInven)
		{
			score2-=2;
			musicGlob.play();
			prota2.vidas--;
			prota2.body.velocity.x = -(this.position.x -prota2.position.x)*2;
		    this.body.velocity.x = (this.position.x -prota2.position.x)*2;
			prota2.auxInvencible = 0;
			prota2.esInven = true;
		}
	}

	  
	saltoEnemigo ++;
	if(this.body.velocity.y >= 150)
	{
		this.body.velocity.y = 150;
	}
	else if(this.position.y <= this.game.height-100)
	{
		this.body.velocity.y += velCaida;
	}
	if(this.position.x > this.game.width)
	{
		this.position.x = 0;
	}
	else if(this.position.x < 0)
	{
		this.position.x = this.game.width;
	}
	if(this.position.y <= this.game.world.position.y+75)
	{
		this.body.velocity.y = 150;
	}
	if(this.position.y >= this.game.height-100 && !flipFlop3)
	{
		this.frame = 1;
		this.auxAnim = 0;
		this.body.velocity.y -= fuerzaEmpuje;
		flipFlop3 = true;
	}
	else
	{
		flipFlop3 = false;
		if(this.position.y >= this.game.height-100)
		saltoEnemigo = 0;
	}
	if(this.body.velocity.x < 150 && !this.dirEnemigo)
	{
		this.body.velocity.x+=5;
	}
	else if(this.body.velocity.x > -150 && this.dirEnemigo)
	{
		this.body.velocity.x-=5;
	}
	if(this.body.velocity.x >= 150 && this.game.rnd.integerInRange(0, 200) <= 1)
	{
		this.dirEnemigo = true;
	}
	else if(this.body.velocity.x <= -150 && this.game.rnd.integerInRange(0, 200) <= 1)
	{
		this.dirEnemigo = false;
	}
	
	if(saltoEnemigo >= 35 && !flipFlop3 && this.game.rnd.integerInRange(0, 100) <= 7)
	{
		this.frame = 1;
		this.auxAnim = 0;
		this.body.velocity.y -= fuerzaEmpuje;
		flipFlop3 = true;
		saltoEnemigo = 0;
	}		
}
}
var PlayScene = 
{
	preload: function()
	{
	var logo = this.game.add.sprite(
    this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
	logo.destroy();
	musicImp = this.game.add.audio('Impulso');
	musicExpl = this.game.add.audio('Explosion');
	musicGlob = this.game.add.audio('Globo');
	},
	
  create: function () 
  {  
  score1 = score2 = 0;
    fin = false;
    musicFondo = this.game.add.audio('FondoVersus');
	musicFondo.loopFull();
    background = this.game.add.tileSprite(0, 0, 1000, 600, 'background');
    teclas = this.game.input.keyboard.createCursorKeys();
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    background = this.game.add.tileSprite(0, 0, 1000, 600, 'background');
	
	rayo = this.game.world.addChild(this.game.add.sprite(this.game.width/2-190, this.game.height-70, 'rayo'));
	this.game.physics.arcade.enable(rayo);
	rayo.width = 380;
	rayo.height = rayo.height*(38/30); 
	rayo.frame = 6;

	this.teclas = this.game.input.keyboard.createCursorKeys();

	this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width/2, -75));
	prota2 = this.game.world.addChild(new Movible(this.game, 'prota2', this.game.width/2+200, this.game.height-600, 2));
	prota = this.game.world.addChild(new Movible(this.game,'prota', this.game.width/2-200, this.game.height-600, 1));

	sueloNormal = this.game.add.sprite(-15, this.game.height-100, 'suelo2');
	sueloNormal.width = 250; sueloNormal.height = 100;
	this.game.physics.arcade.enable(sueloNormal);
	sueloNormal.body.immovable = true;
	
	sueloNormal2 = this.game.add.sprite(this.game.width-235, this.game.height-100, 'suelo2');
	sueloNormal2.width = 250; sueloNormal2.height = 100;
	this.game.physics.arcade.enable(sueloNormal2);
	sueloNormal2.body.immovable = true;
	
	sueloNormal3 = this.game.add.sprite(this.game.width/2-125, this.game.height/2-20, 'suelo');
	sueloNormal3.width = 250; sueloNormal3.height = 50;
	this.game.physics.arcade.enable(sueloNormal3);
	sueloNormal3.body.immovable = true;
	randomBooster = this.game.rnd.integerInRange(300, 400);
	gameOver = this.game.world.addChild(this.game.add.sprite(this.game.width/2, this.game.height/2, 'GameOver'));
	gameOver.anchor.set(.5, .5);
	gameOver.alpha = 0;
	score1Text = this.game.add.text(0, 0, 'Score1: ');
	score1Text.font = 'Arial Black';
    score1Text.fontSize = 30;
	score1Text.strokeThickness = 7;
	score1Text.stroke = '#ffffff';
	score2Text = this.game.add.text(this.game.width-250, 0, 'Score2: ');
	score2Text.font = 'Arial Black';
    score2Text.fontSize = 30;
	score2Text.strokeThickness = 7;
	score2Text.stroke = '#ffffff';
	
  },
  
  update: function()
  {
	  score1Text.text = 'Score1:  '+score1;
	  score2Text.text = 'Score2:  '+score2;
	  if((prota.vidas <= 0 || prota2.vidas <= 0) && !fin)
	  {
			fin = true;
			ganador = this.game.add.text(this.game.width/2, this.game.height/2+150, 'Ganador: Player');
			ganador.font = 'Arial Black';
			ganador.fontSize = 24;
			ganador.strokeThickness = 7;
			ganador.stroke = '#ffffff';
			ganador.anchor.set(.5);
		  if(prota.vidas > prota2.vidas)
		  {
			  ganador.text = 'Ganador: Player 1';
		  }
		  else if(prota.vidas == prota2.vidas)
		  {
			  ganador.text = 'Empate';
		  }
		  else
		  {
			  ganador.text = 'Ganador: Player 2';
		  }
		  gameOver.alpha = 1;
	  }
	  if(fin)
	  {

		if(this.game.input.keyboard.isDown(Phaser.Keyboard.R))
		{
		  this.game.state.start('Versus');
		  musicFondo.stop();
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.M))
		{
			this.game.state.start('menu');
			musicFondo.stop();
		}
	  }
	contador++;
	if(contador >= randomBooster)
	{
		randomBooster = this.game.rnd.integerInRange(50, this.game.width-50);
	    this.game.world.addChild(new Enemigo(this.game, 'enemigo', randomBooster, -75));
		randomBooster = this.game.rnd.integerInRange(300, 600);
		contador = 0;
		booster = this.game.rnd.integerInRange(1, 3);
		if(booster == 1)
		{
		var rand = this.game.rnd.integerInRange(50, this.game.width-50);
		this.game.world.addChild(new ray(this.game, 'ray', rand, this.game.height/2));
		}
		else if(booster == 2)
		{
			var rand = this.game.rnd.integerInRange(50, this.game.width-50);
			this.game.world.addChild(new cohete(this.game, rand, 0, 1));
		}
		else if(booster == 3)
		{
			var rand = this.game.rnd.integerInRange(50, this.game.width-50);
			this.game.world.addChild(new vida(this.game, rand, 0));
		}
	}
	auxRayo++;
	if(auxRayo>animRayo)
	{
		auxRayo = 0;
		rayo.frame --;
		if(rayo.frame== 0)
		{
			rayo.frame = 6;
		}

	}
	
	 background.tilePosition.x += 0.5;
	 background.anchor.set(.5, .5);
	 background.width = background.height = 3000;
	 background.position.x = this.game.width/2;
	 background.position.y = this.game.height/2;
	 background.rotation += 0.0005;
  },
};

module.exports = PlayScene;
//comentario final
},{}],2:[function(require,module,exports){
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
	this.game.load.spritesheet('cohete', 'images/Cohete.png', 32, 32);
	this.game.load.spritesheet('coheteBooster', 'images/CoheteBooster.png', 32, 32);
	this.game.load.spritesheet('vida', 'images/VidaBooster.png', 50, 50);
	this.game.load.audio('MenuMusic', 'musica/MenuMusic.mp3');
	this.game.load.audio('Impulso', 'musica/Impuslo.wav');
	this.game.load.audio('Explosion', 'musica/Expolsion.wav');
	this.game.load.audio('Globo', 'musica/Gloob.wav');
	this.game.load.audio('FondoArcade', 'musica/Arcade.mp3');
	this.game.load.audio('FondoVersus', 'musica/Versus.mp3');
	this.game.load.image('GameOver', 'images/GameOver.png');
	
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

},{"./Versus.js":1,"./menu.js":3,"./play_scene.js":4}],3:[function(require,module,exports){
'use strict';


var teclas;
var foto;
var anim = 10;
var auxAnim = 0;
var seleccion = 1;
var flipFlop1 = false;
var flipFlop2 = false;
var flecha;
var music;

var Menu = 
{
	
	preload: function()
	{
		
	},
	
  create: function () 
  {  
    music = this.game.add.audio('MenuMusic');
	music.loopFull();

    teclas = this.game.input.keyboard.createCursorKeys();
	this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    foto = this.game.add.sprite(0, 0, 'menu');
	foto.width = this.game.width;
	foto.height = this.game.height-100;
	foto.position.y = this.game.height/2-foto.height/2.5;
	flecha = this.game.add.sprite(180, 0, 'flecha');
  },
  
  update: function()
  {  
	  auxAnim ++;
	  if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && seleccion == 1)
	  {
		  music.stop();
		  this.game.state.start('play');
	  }
	  else if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	  {
		  music.stop();
		  this.game.state.start('Versus');
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
},{}],4:[function(require,module,exports){
'use strict';

//Declaración de variables
var vidasTotales = 2;
var prota;
var enemigo;
var sueloNormal;
var sueloNormal2;
var sueloNormal3;
var velCaida = 10;
var nivel = 1;
var numEnem;
var pasado = false;
var posXinic, posYinic;

//randomizado de objetos
var randomBooster;
var contador = 0;
var booster;

//Musica
var musicFondo;
var musicImp;
var musicExpl;
var musicGlob;

//HUD
var score = 0;
var textVidas;
var textScore;
var textNivel;


//entrada de teclado
var teclas;
var gameOver;
var finText;
var fin;

var fuerzaEmpuje = 250;
var velocidadProta = 10;

//auxiliares para el salto y choques
var flipFlop = false;
var flipFlop2 = false;
var auxSueloY = 0;
var auxSueloX = 0;
var flipFlop3 = false;
var saltoEnemigo = 0;

//el fondo
var background;

//variables empleadas en los rayos
var rayo;
var rayo2;
var animRayo = 3;
var auxRayo = 0;

var ray = function(game, sprite, posX, posY)
{
	Phaser.Sprite.call(this, game, posX, posY, sprite);
	game.physics.arcade.enable(this);
	this.height = game.height+150;
	this.width = 500;
	this.anchor.set(.5, .5);
	this.retardo = 0;
	this.duracion = 50;
}
ray.prototype = Object.create(Phaser.Sprite.prototype);
ray.constructor = rayo;
ray.prototype.update = function()
{
	this.body.setSize(25, this.body.height, 150-this.body.width/4, 0);
	this.frame = this.retardo/4;
	this.retardo++;
	if(this.frame >=15 && this.frame < 29)
	{
		var choq = this.game.physics.arcade.overlap(this, prota);
		//var choq2 = this.game.physics.arcade.overlap(this, prota2);
		if(choq && !prota.esInven)
		{
			musicGlob.play();
			score-=5;
			prota.vidas--;
			prota.esInven = true;
			prota.auxInvencible = 0;
			if(prota.position.x < this.position.x) prota.body.velocity.x = -250;
			else prota.body.velocity.x = 250;
		}

	}
    if(this.frame >= 31) this.destroy();
}
//los enemigos al morir lo que hacen es desaparecer y generar un sprite de enemigo en caida
var muere = function(game, sprite, posX, posY, escala)
{
	Phaser.Sprite.call(this, game, posX, posY, sprite);

	//ajustes del enemigo en caida
  	game.physics.arcade.enable(this);
	this.anchor.set(.5,.5);
	this.vel = 5;
	this.scale = escala;
	this.anim = 5;
	this.velAnim = 0;
	this.puede = true;

	
}

muere.prototype = Object.create(Phaser.Sprite.prototype);
muere.constructor = muere;

muere.prototype.update = function()
{
	this.body.velocity.y += this.vel;
	this.body.checkCollision.right = false;
	this.body.checkCollision.left = false;
	var choque5 = this.game.physics.arcade.collide(this, sueloNormal);
	var choque6 = this.game.physics.arcade.collide(this, sueloNormal2);
	var choque7 = this.game.physics.arcade.collide(this, sueloNormal3);
	var choque8 = this.game.physics.arcade.collide(this, rayo);
	var choque9 = this.game.physics.arcade.collide(this, rayo2);
	if(choque5 || choque6 || choque7 || choque8|| choque9)
	{

		if(this.puede)
		{
		numEnem--;
		musicExpl.play();
		this.puede = false;
		score += 10;
		}
		this.frame = 1;
		this.velAnim+=1;
		if(this.velAnim > this.anim)
		{
			this.alpha = 0;
		}
	}
}

//clase movible, permite que un objeto se mueva
var Movible = function(game, spriteObj, posX, posY)
	{
		Phaser.Sprite.call(this, game, posX, posY, spriteObj);
		game.physics.arcade.enable(this);
		this.anchor.set(.5,0);
		this.vidas = 2;
		this.invencible = 100;
		this.auxInvencible = 0;
		this.esInven = false;
		this.frame = 0;
		this.velAnim = 6;
		this.auxAnim = 0;
	}
	Movible.prototype = Object.create(Phaser.Sprite.prototype);
	Movible.constructor = Movible;
	Movible.prototype.update = function()
	{
    this.auxAnim += 1;
	if(this.auxAnim > this.velAnim)
	{
		if(prota.vidas == 2)
		{
		this.frame = 6;
		}
		else
		{
			this.frame = 2;
		}
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
	  if(prota.body.velocity.y > 0)
	  {
		if(prota.vidas == 2)
		{
		 prota.frame = 0;
		}
		else
		{
			prota.frame = 1;
		}
	  }
	  if(prota.body.velocity.y >= 150)
	{

		prota.body.velocity.y = 150;
	}
	if(prota.position.y < this.game.world.position.y)
	{
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
		musicImp.play();
		flipFlop2 = false;
		if(!flipFlop)
		{
			if(prota.vidas == 2)
			{
			prota.frame = 4;
			}
			else
			{
				prota.frame = 5;
			}
		    this.auxAnim = 0;
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
		if(this.game.physics.arcade.overlap(this, rayo) || this.game.physics.arcade.overlap(this, rayo2))
	{
		if(this.vidas == 1)
		score-=5;
	    else if(this.vidas == 2)
		score -= 10;
		this.vidas = 0;
	}
	this.muerte();
	if(this.esInven)
	this.invencibilidad();
	this.muerte();
	if(this.esInven)
	this.invencibilidad();
	}
	Movible.prototype.muerte = function()
	{
		if(this.vidas <= 0)
		{
			this.vidas = 2;
			vidasTotales--;
			if(vidasTotales <= 0)
			{
			this.destroy();
		    textVidas.text = 'Muerto';
			}
			else
			{

			 this.position.x = posXinic;
			 this.position.y = posYinic;
			 this.esInven = true;
			 this.auxInvencible = 0;
			 this.body.velocity.x = 0;
			 this.body.velocity.y = 0;
			}
			
		}
	}
	Movible.prototype.invencibilidad = function()
	{
		this.auxInvencible += 1;
		if(this.auxInvencible<this.invencible/6)
		{
		prota.alpha = 0.2;
		}
		if(this.auxInvencible>this.invencible/6 && this.auxInvencible < this.invencible/4)
		{
			prota.alpha = 1;
		}
		else if(this.auxInvencible > this.invencible/4 && this.auxInvencible < this.invencible/2)
		{
			prota.alpha = 0.2;
		}
		else if(this.auxInvencible > this.invencible/2 && this.auxInvencible<this.invencible)
		{
			prota.alpha = 1;
		}
		else if(this.auxInvencible >= this.invencible)
		{			
	       this.esInven = false;
		}
	}
var Enemigo = function (game, sprite, posX, posY)
{
	Phaser.Sprite.call(this, game, posX, posY, sprite);
	game.physics.arcade.enable(this);
	this.anchor.set(.5, .5);
	this.scale.y = this.scale.x = 0.9;
	this.frame = 0;
	this.cabeza = true;
	var destruido = false;
	var dirEnemigo = false;
	this.anim = 6;
	this.auxAnim = 0;

	
}
Enemigo.prototype = Object.create(Phaser.Sprite.prototype);
Enemigo.constructor = Enemigo;
Enemigo.prototype.update = function()
{
	this.auxAnim += 1;
	if(this.auxAnim > this.anim)
	{
		this.frame = 0;
	}
	if(!this.cabeza)
	{
		this.frame = 2;
	}
	if(this.body.velocity.x > 0)
	{
		this.scale.x = -1;
	}
	else
	{
		this.scale.x = 1;
	}
	this.game.physics.arcade.collide(this, sueloNormal);
	this.game.physics.arcade.collide(this, sueloNormal2);
	this.game.physics.arcade.collide(this, sueloNormal3);
	
	var choque = this.game.physics.arcade.overlap(this, prota);
	if(!this.destruido && choque)
	{
		if(this.position.y-85 > prota.position.y)
		{
		musicGlob.play();
		prota.body.velocity.y = -250;
		this.cabeza = false;
		this.destruido = true;
		this.alpha = 0;
		this.game.world.addChild(new muere(this.game, 'enemigoMuere',this.position.x, this.position.y, this.scale));
		}
		else if(!prota.esInven)
		{
			musicGlob.play();
			score-=5;
			prota.vidas--;
			prota.body.velocity.x = -(this.position.x -prota.position.x)*2;
		    this.body.velocity.x = (this.position.x -prota.position.x)*2;
			prota.auxInvencible = 0;
			prota.esInven = true;
		}
	}

	  
	saltoEnemigo ++;
	if(this.body.velocity.y >= 150)
	{
		this.body.velocity.y = 150;
	}
	else if(this.position.y <= this.game.height-100)
	{
		this.body.velocity.y += velCaida;
	}
	if(this.position.x > this.game.width)
	{
		this.position.x = 0;
	}
	else if(this.position.x < 0)
	{
		this.position.x = this.game.width;
	}
	if(this.position.y <= this.game.world.position.y+75)
	{
		this.body.velocity.y = 150;
	}
	if(this.position.y >= this.game.height-100 && !flipFlop3)
	{
		this.frame = 1;
		this.auxAnim = 0;
		this.body.velocity.y -= fuerzaEmpuje;
		flipFlop3 = true;
	}
	else
	{
		flipFlop3 = false;
		if(this.position.y >= this.game.height-100)
		saltoEnemigo = 0;
	}
	if(this.body.velocity.x < 150 && !this.dirEnemigo)
	{
		this.body.velocity.x+=5;
	}
	else if(this.body.velocity.x > -150 && this.dirEnemigo)
	{
		this.body.velocity.x-=5;
	}
	if(this.body.velocity.x >= 150 && this.game.rnd.integerInRange(0, 200) <= 1)
	{
		this.dirEnemigo = true;
	}
	else if(this.body.velocity.x <= -150 && this.game.rnd.integerInRange(0, 200) <= 1)
	{
		this.dirEnemigo = false;
	}
	
	if(saltoEnemigo >= 35 && !flipFlop3 && this.game.rnd.integerInRange(0, 100) <= 7)
	{
		this.frame = 1;
		this.auxAnim = 0;
		this.body.velocity.y -= fuerzaEmpuje;
		flipFlop3 = true;
		saltoEnemigo = 0;
	}		
}
var PlayScene = 
{
	
	preload: function()
	{
	var logo = this.game.add.sprite(
    this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
	logo.destroy();
	musicImp = this.game.add.audio('Impulso');
	musicExpl = this.game.add.audio('Explosion');
	musicGlob = this.game.add.audio('Globo');

	},
	
  create: function () 
  {  
    fin = false;
    vidasTotales = 2;
	nivel = 1;
	score = 0;
    musicFondo = this.game.add.audio('FondoArcade');
	musicFondo.loopFull();
    background = this.game.add.tileSprite(0, 0, 1000, 600, 'background');
    teclas = this.game.input.keyboard.createCursorKeys();
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    background = this.game.add.tileSprite(0, 0, 1000, 600, 'background');
	

	//Boosters
	randomBooster = this.game.rnd.integerInRange(300, 400);
	this.teclas = this.game.input.keyboard.createCursorKeys();
	
	//Canvas
	textVidas = this.game.add.text(0, 0, 'Vidas: ');
	textVidas.font = 'Arial Black';
	textVidas.fontSize = 30;
	textVidas.strokeThickness = 7;
	textVidas.stroke = '#ffffff';
	
	textScore = this.game.add.text(this.game.width/2, 0, 'Score: 0');
	textScore.font = 'Arial Black';
	textScore.fontSize = 30;
	textScore.strokeThickness = 7;
	textScore.stroke = '#ffffff';
	textScore.align = 'upperCenter';
	textScore.anchor.set(.5, 0);
	
	textNivel = this.game.add.text(this.game.width-200, 0, 'Nivel: 1');
	textNivel.font = 'Arial Black';
	textNivel.fontSize = 30;
	textNivel.strokeThickness = 7;
	textNivel.stroke = '#ffffff';

	
	
	//Niveles
	if(nivel == 1)
	{
		numEnem = 3;
		//Enemigos
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-200, 200));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-400, 200));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-600, 200));
		prota = this.game.world.addChild(new Movible(this.game,'prota', this.game.width/2-50, this.game.height-600));
		posXinic = prota.position.x;
		posYinic = prota.position.y;
		//Rayos
		rayo = this.game.world.addChild(this.game.add.sprite(this.game.width/2-190, this.game.height-70, 'rayo'));
		this.game.physics.arcade.enable(rayo);
		rayo.body.immovable = true;
		rayo.width = 380;
		rayo.height = 70; 
		rayo.frame = 6;
		rayo2 = this.game.world.addChild(this.game.add.sprite(this.game.width+1000, this.game.height-70, 'rayo'));
		this.game.physics.arcade.enable(rayo2);
		rayo2.body.immovable = true;
	    //Suelos
		sueloNormal = this.game.add.sprite(-15, this.game.height-100, 'suelo2');
		sueloNormal.width = 250; sueloNormal.height = 100;
		this.game.physics.arcade.enable(sueloNormal);
		sueloNormal.body.immovable = true;
		sueloNormal2 = this.game.add.sprite(this.game.width-235, this.game.height-100, 'suelo2');
		sueloNormal2.width = 250; sueloNormal2.height = 100;
		this.game.physics.arcade.enable(sueloNormal2);
		sueloNormal2.body.immovable = true;
		sueloNormal3 = this.game.add.sprite(this.game.width/2-125, this.game.height/2-20, 'suelo');
		sueloNormal3.width = 250; sueloNormal3.height = 50;
		this.game.physics.arcade.enable(sueloNormal3);
		sueloNormal3.body.immovable = true;

	}
	gameOver = this.game.world.addChild(this.game.add.sprite(this.game.width/2, this.game.height/2, 'GameOver'));
	gameOver.anchor.set(.5, .5);
	gameOver.alpha = 0;

	
	
  },
  
  update: function()
  {
	  if (nivel > 3 && !fin)
	  {
		  nivel = 3;
		  gameOver.alpha = 1;
		  finText = this.game.add.text(this.game.width/2, this.game.height/2+150, '¡Has Ganado!');
		  finText.font = 'Arial Black';
		  finText.fontSize = 30;
		  finText.strokeThickness = 7;
		  finText.stroke = '#ffffff';
		  finText.anchor.set(.5);
		  fin = true;
	  }
	  if(fin)
	  {
		  		  if(this.game.input.keyboard.isDown(Phaser.Keyboard.R))
	  {
		  this.game.state.start('play');
		  musicFondo.stop();
	  }
	  else if(this.game.input.keyboard.isDown(Phaser.Keyboard.M))
	  {
		  this.game.state.start('menu');
		  musicFondo.stop();
	  }
	  }
	  if(vidasTotales > 0)
	  textVidas.text = 'Vidas: '+(vidasTotales-1);
	else
	{
	  gameOver.alpha = 1;
	  if(this.game.input.keyboard.isDown(Phaser.Keyboard.R))
	  {
		  this.game.state.start('play');
		  musicFondo.stop();
	  }
	  else if(this.game.input.keyboard.isDown(Phaser.Keyboard.M))
	  {
		  this.game.state.start('menu');
		  musicFondo.stop();
	  }
	}
      textScore.text = 'Score: '+score;
	  textNivel.text = 'Nivel: '+nivel;
	//Paso de nivel
	if(numEnem <= 0)
	{
		if(nivel <4)
		{
		nivel++;
		pasado = false;
		}
	}
	
	contador++;
	if(contador >= randomBooster)
	{
		randomBooster = this.game.rnd.integerInRange(300, 600);
		contador = 0;
		booster = this.game.rnd.integerInRange(1, 1);
		if(booster == 1)
		{
		var rand = this.game.rnd.integerInRange(50, this.game.width-50);
		this.game.world.addChild(new ray(this.game, 'ray', rand, this.game.height/2));
		}
	}
	auxRayo++;
	if(auxRayo>animRayo)
	{
		auxRayo = 0;
		rayo.frame --;
		rayo2.frame--;
		if(rayo.frame== 0)
		{
			rayo.frame = 6;
			rayo2.frame = 6;
		}

	}
	
	 background.tilePosition.x += 0.5;
	 background.anchor.set(.5, .5);
	 background.width = background.height = 3000;
	 background.position.x = this.game.width/2;
	 background.position.y = this.game.height/2;
	 background.rotation += 0.0005;
	 //Niveles
	if(nivel == 2 && !pasado)
	{
		pasado = true;
		numEnem = 3;
		prota.position.x = this.game.width/2;
		prota.position.y = 100;
		prota.body.velocity.x = 0;
		prota.body.velocity.y = 0;
		posXinic = prota.position.x;
		posYinic = prota.position.y;
		//Enemigos
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', 10, 50));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-10, 50));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width/2, this.game.height-100));
		//Rayos
		rayo.position.x = -70;
		rayo.position.y = this.game.height-100;
		rayo.height = 50;
		rayo2.width = 380;
		rayo2.height = 50;
		rayo2.position.x = this.game.width-rayo2.width+70;
		rayo2.position.y = this.game.height-100;
		//Suelos
		sueloNormal.position.x = -15;
		sueloNormal.position.y =  this.game.height-400;
		sueloNormal.width = 250; sueloNormal.height = 80;
		this.game.physics.arcade.enable(sueloNormal);
		sueloNormal.body.immovable = true;
		sueloNormal2.position.x = this.game.width-235;
		sueloNormal2.position.y = this.game.height-400;
		sueloNormal2.width = 250; sueloNormal2.height = 80;
		this.game.physics.arcade.enable(sueloNormal2);
		sueloNormal2.body.immovable = true;
		sueloNormal3.position.x = this.game.width/2-125; 
		sueloNormal3.position.y = this.game.height-100;
		sueloNormal3.width = 250; sueloNormal3.height = 50;
		this.game.physics.arcade.enable(sueloNormal3);
		sueloNormal3.body.immovable = true;
	}
	else if(nivel == 3 && !pasado)
	{
		pasado = true;
		numEnem = 6;
		prota.position.x = this.game.width/2;
		prota.position.y = 100;
		prota.body.velocity.x = 0;
		prota.body.velocity.y = 0;
		posXinic = prota.position.x;
		posYinic = prota.position.y;
		//Enemigos
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', 10, 50));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', 10, 150));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', 10, 250));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-100, 50));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-100, 150));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-100, 250));
		//Rayos
		rayo.destroy();
		rayo2.destroy();
		//Suelos
		sueloNormal.position.x = -15;
		sueloNormal.position.y =  this.game.height-100;
		sueloNormal.width = 250; sueloNormal.height = 80;
		this.game.physics.arcade.enable(sueloNormal);
		sueloNormal.body.immovable = true;
		sueloNormal2.position.x = this.game.width-235;
		sueloNormal2.position.y = this.game.height-100;
		sueloNormal2.width = 250; sueloNormal2.height = 80;
		this.game.physics.arcade.enable(sueloNormal2);
		sueloNormal2.body.immovable = true;
		sueloNormal3.position.x = this.game.width/2-165; 
		sueloNormal3.position.y = this.game.height-100;
		sueloNormal3.width = 330; sueloNormal3.height = 80;
		this.game.physics.arcade.enable(sueloNormal3);
		sueloNormal3.body.immovable = true;
	}
  },
};

module.exports = PlayScene;
//comentario final
},{}]},{},[2]);
