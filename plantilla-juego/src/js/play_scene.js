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
var flipFlop3 = false;
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
<<<<<<< HEAD
<<<<<<< HEAD

	prota.width= 50;
	prota.height = 75;
	prota.anchor.set(.5,0);
=======
	prota.width= 50;
	prota.height = 75;
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
=======
	prota.width= 50;
	prota.height = 75;
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
	this.game.physics.arcade.enable(prota);
    prota.body.colliderWorldBounds = true;
	prota.body.checkCollision.down = true;
	
	this.teclas = this.game.input.keyboard.createCursorKeys();
	enemigo = this.game.add.sprite(this.game.width-200, 200, 'enemigo');
	enemigo.width = enemigo.height = 50;
<<<<<<< HEAD
<<<<<<< HEAD
	enemigo.anchor.set(0.5, 0.5);
	this.game.physics.arcade.enable(enemigo);
	enemigo.body.collideWorldBounds = false;
	cabeza = enemigo.addChild(this.game.add.sprite(0, -enemigo.height*7, 'cabeza'));
	cabeza.anchor.set(0.5, 0.5);
	cabeza.height = cabeza.height*0.3;
	this.game.physics.arcade.enable(cabeza);

=======
	this.game.physics.arcade.enable(enemigo);
=======
	this.game.physics.arcade.enable(enemigo);
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
	enemigo.body.colliderWorldBounds = true;
	cabeza = enemigo.addChild(this.game.add.sprite(0, -enemigo.height*3, 'cabeza'));
	cabeza.height = cabeza.height*0.3;
    this.game.physics.arcade.enable(cabeza);
	cabeza.body.colliderWorldBounds = true;
<<<<<<< HEAD
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
=======
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
	
	sueloNormal = this.game.add.sprite(0, this.game.height-100, 'suelo');
	sueloNormal.width = 250; sueloNormal.height = 100;
	this.game.physics.arcade.enable(sueloNormal);
<<<<<<< HEAD
<<<<<<< HEAD
	sueloNormal.body.immovable = true;
=======
	sueloNormal.body.inmovable = true;
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
=======
	sueloNormal.body.inmovable = true;
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
	auxSueloY = sueloNormal.position.y
	auxSueloX = sueloNormal.position.x
	
  },
  
  update: function()
  {
	  var choque = this.game.physics.arcade.collide(prota, sueloNormal);
<<<<<<< HEAD
<<<<<<< HEAD
	  var choque2 = this.game.physics.arcade.collide(enemigo, sueloNormal);
	  var damageCabeza = this.game.physics.arcade.overlap(prota, cabeza);
=======
	  var damageCabeza = this.game.physics.arcade.overlap(prota, cabeza);
	  
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
=======
	  var damageCabeza = this.game.physics.arcade.overlap(prota, cabeza);
	  
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
	  if(choque)
	  {
		flipFlop2 = true;
		prota.body.velocity.y = 0;
		sueloNormal.body.velocity.y = 0;
		sueloNormal.body.velocity.x = 0;
		sueloNormal.position.y = auxSueloY;
		sueloNormal.position.x = auxSueloX;
	  }
      else
	  {
		  flipFlop2 = false;
	  }
	  if(flipFlop2)
	  {
		if(prota.body.velocity.x > 0)
		  prota.body.velocity.x -= 5;
	    else if(prota.body.velocity.x <0)
		  prota.body.velocity.x += 5;
	  }
	  
	//Movimiento del enemigo
	if(enemigo.body.velocity.y >= 150)
	{
		enemigo.body.velocity.y = 150;
	}
	else if(enemigo.position.y <= this.game.height-100)
	{
		enemigo.body.velocity.y += velCaida;
	}
	if(enemigo.position.y >= this.game.height-100 && !flipFlop3)
	{
		enemigo.body.velocity.y -= fuerzaEmpuje;
		flipFlop3 = true;
	}
	
	else{
		flipFlop3 = false;
	}
	
<<<<<<< HEAD
<<<<<<< HEAD
	if(saltoEnemigo >= 35 && !flipFlop3 && this.game.rnd.integerInRange(0, 100) <= 4)
	{
		enemigo.body.velocity.y -= fuerzaEmpuje*1.5;
		flipFlop3 = true;
		saltoEnemigo = 0;
	}

	
=======
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
=======
>>>>>>> parent of 6afa658... Merge branch 'IA-y-comportamientos'
	//Movimiento del prota
	if(prota.body.velocity.y >= 150)
	{
		prota.body.velocity.y = 150;
	}

	if(prota.position.y < this.game.world.position.y){
		prota.position.y = this.game.world.position.y;
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
	}
  },
};

module.exports = PlayScene;
