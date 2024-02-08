import kaboom from "kaboom"

//npm run dev

kaboom({
	width: 1920,
    height: 1080,
	background: [118, 183, 745],
	letterbox: true
})

loadSprite("player", "sprites/player.png",{
	sliceX: 4,

	anims:{
		"parado": 0,

		"pulando": 1,

		"correndo":{
			from: 2,
			to: 3,
			speed: 7,
			loop: true,
		},
	},
})

loadSprite("fundo", "sprites/fundo.png")
loadSprite("nuven1", "sprites/nuven1.png")
loadSprite("nuven2", "sprites/nuven2.png")
loadSprite("vida", "sprites/vida.png")
loadSprite("velocidade", "sprites/velocidade.png")
loadSprite("inimigo", "sprites/inimigo.png")
loadSprite("reator", "sprites/reator.png")

loadFont("fontegame", "sprites/fonte.ttf")


scene("game", () => {

	//VARIAVEIS ESTATICAS
	let SPEED = 380
	let PONTUACAO = 0
	let VIDAS = 3
	const JUMP_FORCE = 640

	//VARIAVEIS QUE MUDAM
	let PONTOS = 10
	let DROPSKILS = 75.1

	let VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1 = 6.5
	let VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2 = 10.5
	let VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1 = 7.5
	let VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2= 9.5

	let VELOCIDADE_INIMIGO1 = 100
	let VELOCIDADE_INIMIGO2 = 100

	let VELOCIDADE_INIMIGO_DE_CIMA = 50

	let SURGIMENTO_INIMIGO1_VALOR1 = 40
	let SURGIMENTO_INIMIGO1_VALOR2 = 30

	let SURGIMENTO_INIMIGO2_VALOR1 = 35
	let SURGIMENTO_INIMIGO2_VALOR2 = 45

	setGravity(1600)

	const fundo = add([
		sprite("fundo"),
		pos(0, 0),
		area(),
		z(50),
	])

	const player = add([
		sprite("player"),
		pos(912, 800),
		scale(2),
		area(),
		body(),
		z(100)
	])

	player.play("parado")

	// Switch to "idle" or "run" animation when player hits ground
	player.onGround(() => {
	if (!isKeyDown("left") && !isKeyDown("right")) {
		player.play("parado")
	} else {
		player.play("correndo")
	}
	})

	player.onAnimEnd((anim) => {
		if (anim === "parado") {
		}
	})

	onKeyPress("space", () => {
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
			player.play("pulando")
		}
	})

	onKeyDown("left", () => {
		player.move(-SPEED, 0)
		player.flipX = true
		// .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
		if (player.isGrounded() && player.curAnim() !== "correndo") {
			player.play("correndo")
		}
	})

	onKeyDown("right", () => {
		player.move(SPEED, 0)
		player.flipX = false
		if (player.isGrounded() && player.curAnim() !== "correndo") {
			player.play("correndo")
		}
	})

	;["left", "right"].forEach((key) => {
		onKeyRelease(key, () => {
		// Only reset to "idle" if player is not holding any of these keys
			if (player.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
				player.play("parado")
			}
		})
	})

	//MAPA ----------------------------------------------------
	//LADO ESQUERD0
	add([
		rect(width(), 48),
		pos(0, height() - 48),
		area(),
		body({ isStatic: true }),
		color(56, 15, 2),
		z(100),
		"chao",
	])

	add([
		rect(450, 24),
		pos(0, height() - 72),
		area(),
		body({ isStatic: true }),
		color(76, 23, 6),
		z(100),
		"camada1",
	])
	
	add([
		rect(300, 118),
		pos(0, height() - 190),
		area(),
		body({ isStatic: true }),
		color(76, 23, 6),
		z(100),
		"camada2",
	])

	add([
		rect(180, 300),
		pos(0, height() - 490),
		area(),
		body({ isStatic: true }),
		color(76, 23, 6),
		z(100),
		"camada3",
	])

	//LADO ESQUERD0
	add([
		rect(450, 24),
		pos(1470, height() - 72),
		area(),
		body({ isStatic: true }),
		color(76, 23, 6),
		z(100),
		"camada1",
	])

	add([
		rect(300, 118),
		pos(1629, height() - 190),
		area(),
		body({ isStatic: true }),
		color(76, 23, 6),
		z(100),
		"camada2",
	])

	add([
		rect(180, 300),
		pos(1740, height() - 490),
		area(),
		body({ isStatic: true }),
		color(76, 23, 6),
		z(100),
		"camada3",
	])

	// Nuvens --------------------------------

	function nuvenAparece() {
		const nuven1 = add([ 
			sprite("nuven1"),
			area(),
			pos(width() -2200, height() - 870),
			anchor("botleft"),
			move(RIGHT, 20),
			body({ isStatic: true }),
			z(100),
			"nuven1",
		]);
			wait(rand(110.2, 130.5), () => {
			nuvenAparece();
		});
	}  

	nuvenAparece();

	function nuvenAparece2() {
		const nuven2 = add([ 
			sprite("nuven2"),
			area(),
			pos(width() -2900, height() - 730),
			anchor("botleft"),
			move(RIGHT, 20),
			body({ isStatic: true }),
			z(100),
			"nuven2",
		]);
			wait(rand(80.5, 99.5), () => {
			nuvenAparece2();
		});
	}  

	nuvenAparece2();


	// Maquina --------------------------------
	const maquina1 = add([
		sprite("reator"),
		pos(1110, height() - 98),
		area(),
		body({ isStatic: true }),
		z(100),
		"maquina1",
	])

	const maquina2 = add([
		sprite("reator"),
		pos(750, height() - 98),
		area(),
		body({ isStatic: true }),
		z(100),
		"maquina2",
	])

	//Inimigos ---------------------------------------
	function inimigoAparece() {
		const inimigo = add([ 
			sprite("inimigo"),
			area(),
			pos(width(), height() - 490),
			anchor("botleft"),
			move(LEFT, VELOCIDADE_INIMIGO1),
			body({ isStatic: false }),
			z(100),
			"inimigo",
		]);
			wait(rand(VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1, VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2), () => {
			inimigoAparece();
		});
	}  

	inimigoAparece();

	function inimigoAparece2() {
		const inimigo2 = add([ 
			sprite("inimigo"),
			area(), 
			pos(width() -1930, height() - 500),
			anchor("botleft"),
			move(RIGHT, VELOCIDADE_INIMIGO2),
			body({ isStatic: false }),
			z(100),
			"inimigo",
		]);
			wait(rand(VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1, VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2), () => {
			inimigoAparece2();
		});
	}

	inimigoAparece2();

	function inimigoAparece3() {
		const inimigo3 = add([ 
			sprite("inimigo"),
			area(),
			pos(width() -801, height() - 1100),
			anchor("botleft"),
			move(DOWN, VELOCIDADE_INIMIGO_DE_CIMA),
			z(100),
			"inimigo",
		]);
			wait(rand(SURGIMENTO_INIMIGO1_VALOR1, SURGIMENTO_INIMIGO1_VALOR2), () => {
			inimigoAparece3();
		});
	}

	inimigoAparece3();

	function inimigoAparece4() {
		const inimigo3 = add([ 
			sprite("inimigo"),
			area(),
			pos(width() -1162, height() - 1100),
			anchor("botleft"),
			move(DOWN, VELOCIDADE_INIMIGO_DE_CIMA),
			z(100),
			"inimigo",
		]);
			wait(rand(SURGIMENTO_INIMIGO2_VALOR1, SURGIMENTO_INIMIGO2_VALOR2), () => {
			inimigoAparece4();
		});
	}

	inimigoAparece4();

	// SKILS ------------------------
	function vidaAparece() {
		const vida = add([ 
			sprite("vida"),
			area(),
			pos(width() - 230 , height() - 290),
			anchor("botleft"),
			body({ isStatic: false }),
			z(100),
			"vida",
		]);
			wait(DROPSKILS, () => {
			vidaAparece();
		});
	}

	vidaAparece();

	function velocidadeAparece() {
		const velocidade = add([ 
			sprite("velocidade"),
			area(),
			pos(width() - 1720, height() - 290),
			anchor("botleft"),
			body({ isStatic: false }),
			z(100),
			"velocidade",
		]);
			wait(DROPSKILS, () => {
			velocidadeAparece();
		});
	}

	velocidadeAparece();
	

	//COLISOES e DIFICULDADE
	player.onCollide("inimigo", (inimigo) => {
		destroy(inimigo)
		PONTUACAO += PONTOS
		if(PONTUACAO > 100 && PONTUACAO < 300){

			PONTOS = 15
			DROPSKILS = 65.1

			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1 = 6.5
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2 = 10.5
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1 = 7.5
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2= 9.5

			VELOCIDADE_INIMIGO1 = 140
			VELOCIDADE_INIMIGO2 = 140

		} else if (PONTUACAO > 300 && PONTUACAO < 600){

			PONTOS = 20
			DROPSKILS = 55.1

			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1 = 6.0
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2 = 10.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1 = 7.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2= 9.0

			VELOCIDADE_INIMIGO1 = 160
			VELOCIDADE_INIMIGO2 = 160

		} else if (PONTUACAO > 600 && PONTUACAO < 1000){

			PONTOS = 25
			DROPSKILS = 45.1

			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1 = 6.0
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2 = 10.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1 = 7.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2= 9.0

			VELOCIDADE_INIMIGO1 = 180
			VELOCIDADE_INIMIGO2 = 180
		}
	})

	maquina1.onCollide("inimigo", (inimigo) => {
		destroy(inimigo)
		VIDAS -= 1
	})

	maquina2.onCollide("inimigo", (inimigo) => {
		destroy(inimigo)
		VIDAS -= 1
	})

	player.onCollide("vida", (vida) => {
		destroy(vida)
		VIDAS += 1
	})

	player.onCollide("velocidade", (velocidade) => {
		destroy(velocidade)
		SPEED += 300;

		const addIconeDeVelocidade = add([
			rect(15, 15),
			area(),
			pos(1000, 54),
			anchor("botleft"),
			color(165, 19, 209),
			body({ isStatic: true }),
			z(100),
			"iconeVelocidade",
		])

		function diminuirVelocidade(){
			SPEED -= 300
		}

		function removeIconeDeVelocidade(){
			destroy(iconeVelocidade)
		}

		setTimeout(diminuirVelocidade, 10000)
		setTimeout(removeIconeDeVelocidade, 10000)

	});


	//PONTACAO NA TELA
	const textopontuacao = add([
		text("Pontos:"), {
			font: "fontegame"
		},
		color(76, 23, 6),
		pos(30,30),
		z(100)
	])

	const ui = add([
		fixed(),
		z(100),
	])

	ui.add([
		text("0"), {
			font: "fontegame"
		},
		pos(185,30),
		color(76, 23, 6),
		z(100),
		{ update() { this.text = PONTUACAO } },
	])


	//VIDAS
	const textovidas = add([
		text("Vidas:"), {
			font: "fontegame"
		},
		color(76, 23, 6),
		pos(1730,30),
		z(100)
	])

	const ui2 = add([
		fixed(),
		z(100),
	])

	ui2.add([
		text("3"), {
			font: "fontegame"
		},
		pos(1860,30),
		color(76, 23, 6),
		z(100),
		{ update() { this.text = VIDAS } },
	])	

})

scene("lose", () => {
	add([
		//add um texto game over
		text("Game Over"),
		//no centro da dela
		pos(center()),
		anchor("center"),
	])
})

go("game")


