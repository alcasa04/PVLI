'use strict';

//Declaración de variables
var prota;
var enemigo;
var sueloNormal;
var sueloNormal2;
var sueloNormal3;
var velCaida = 10;
var nivel = 1;
var numEnem;
var pasado = false;

//randomizado de objetos
var randomBooster;
var contador = 0;
var booster;

//Musica
var musicImp;
var musicExpl;
var musicGlob;


//entrada de teclado
var teclas;

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
		this.destroy();
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
    background = this.game.add.tileSprite(0, 0, 1000, 600, 'background');
    teclas = this.game.input.keyboard.createCursorKeys();
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    background = this.game.add.tileSprite(0, 0, 1000, 600, 'background');
	

	//Boosters
	randomBooster = this.game.rnd.integerInRange(300, 400);

	this.teclas = this.game.input.keyboard.createCursorKeys();
	
	//Niveles
	if(nivel == 1)
	{
		numEnem = 3;
		//Enemigos
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-200, 200));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-400, 200));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-600, 200));
		prota = this.game.world.addChild(new Movible(this.game,'prota', this.game.width/2-50, this.game.height-600));
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

	
	
  },
  
  update: function()
  {
	//Paso de nivel
	if(numEnem <= 0)
	{
		nivel++;
		pasado = false;
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
		//Enemigos
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', 10, 50));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width-10, 50));
		this.game.world.addChild(new Enemigo(this.game, 'enemigo', this.game.width/2, this.game.height-100));
		//Rayos
		rayo.position.x = -70;
		rayo.position.y = this.game.height-110;
		rayo2.width = 380;
		rayo2.height = 70;
		rayo2.position.x = this.game.width-rayo2.width+70;
		rayo2.position.y = this.game.height-110;
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
  },
};

module.exports = PlayScene;
//comentario final