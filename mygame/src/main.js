import kaboom from "kaboom"

// npm run dev

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
loadSprite("vigor", "sprites/vigor.png")
loadSprite("telainicial", "sprites/telainicial.png")
loadSprite("tutorialdojogo", "sprites/tutorial.png")
loadSprite("fimdejogo", "sprites/fimdejogo.png")
loadFont("fontegame", "sprites/fonte.ttf")
loadSound("musica1", "sound/musica1.mp3")
loadSound("efeito1", "sound/efeito1.mp3")
loadSound("efeito2", "sound/efeito2.mp3")


scene("game", () => {

	let SPEED = 400
	let PONTUACAO = 0
	let VIDAS = 3
	const JUMP_FORCE = 640

	let PONTOS = 15   
	let DROPSKILS = 75.1
	let DROPVIGOR = 30

	let VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1 = 6.5
	let VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2 = 10.5
	let VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1 = 7.5
	let VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2= 9.5

	let VELOCIDADE_INIMIGO1 = 100
	let VELOCIDADE_INIMIGO2 = 100

	let VELOCIDADE_INIMIGO_DE_CIMA = 50

	let SURGIMENTO_INIMIGO1_VALOR1 = 40
	let SURGIMENTO_INIMIGO1_VALOR2 = 30

	setGravity(1600)

	const fundo = add([
		sprite("fundo"),
		pos(0, 0),
		area(),
		z(0),
	])

	const player = add([
		sprite("player"),
		pos(923, 800),
		scale(2),
		area(),
		body(),
		z(100)
	])

	player.play("parado")

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

	const maquina1 = add([
		sprite("reator"),
		pos(920, height() - 98),
		area(),
		body({ isStatic: true }),
		z(100),
		"maquina1",
	])

	function inimigoAparece() {
		const inimigo = add([ 
			sprite("inimigo"),
			area(),
			pos(width(), height() - 490),
			anchor("botleft"),
			move(LEFT, VELOCIDADE_INIMIGO1),
			body({ isStatic: false }),
			z(50),
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
			z(50),
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
			pos(width() -990, height() - 1100),
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

	function vigorAparece() {
		const vigor = add([ 
			sprite("vigor"),
			area(),
			pos(width() - 1720, height() - 290),
			anchor("botleft"),
			body({ isStatic: false }),
			z(100),
			"vigor",
		]);
			wait(DROPVIGOR, () => {
			vigorAparece();
		}); 
	}

	vigorAparece();
	
	//COLISOES e DIFICULDADE
	player.onCollide("inimigo", (inimigo) => {
		destroy(inimigo)
		PONTUACAO += PONTOS
		SPEED -= 10

		const music = play("efeito1", {
			volume: 0.2,
		})

		if(PONTUACAO > 100 && PONTUACAO < 150){

			PONTOS = 15
		
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1 = 5.0
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2 = 7.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1 = 7.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2= 6.0
		
			VELOCIDADE_INIMIGO1 = 180
			VELOCIDADE_INIMIGO2 = 180
		
			VELOCIDADE_INIMIGO_DE_CIMA = 120
		
			SURGIMENTO_INIMIGO1_VALOR1 = 20
			SURGIMENTO_INIMIGO1_VALOR2 = 10
		
			SURGIMENTO_INIMIGO2_VALOR1 = 35
			SURGIMENTO_INIMIGO2_VALOR2 = 55

		} else if (PONTUACAO > 150 && PONTUACAO < 400){

			PONTOS = 20
		
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1 = 4.5
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2 = 7.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1 = 6.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2= 6.5
		
			VELOCIDADE_INIMIGO1 = 190
			VELOCIDADE_INIMIGO2 = 190
		
			VELOCIDADE_INIMIGO_DE_CIMA = 130
		
			SURGIMENTO_INIMIGO1_VALOR1 = 15
			SURGIMENTO_INIMIGO1_VALOR2 = 5
		
			SURGIMENTO_INIMIGO2_VALOR1 = 25
			SURGIMENTO_INIMIGO2_VALOR2 = 45

		} else if (PONTUACAO > 400 && PONTUACAO < 1000){

			PONTOS = 25
			DROPVIGOR = 25
		
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1 = 4.0
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2 = 6.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1 = 5.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2= 5.0
		
			VELOCIDADE_INIMIGO1 = 200
			VELOCIDADE_INIMIGO2 = 200
		
			VELOCIDADE_INIMIGO_DE_CIMA = 150
			DROPSKILS = 50
		
			SURGIMENTO_INIMIGO1_VALOR1 = 10
			SURGIMENTO_INIMIGO1_VALOR2 = 5
		
			SURGIMENTO_INIMIGO2_VALOR1 = 20
			SURGIMENTO_INIMIGO2_VALOR2 = 40

		} else if (PONTUACAO > 1000){
			PONTOS = 35
			DROPVIGOR = 20
		
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR1 = 3.0
			VELOCIDADE_SURGIMENTO_INIMIGO1_VALOR2 = 4.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR1 = 4.0
			VELOCIDADE_SURGIMENTO_INIMIGO2_VALOR2= 3.0
		
			VELOCIDADE_INIMIGO1 = 220
			VELOCIDADE_INIMIGO2 = 220
		
			VELOCIDADE_INIMIGO_DE_CIMA = 180
			DROPSKILS = 40
		
			SURGIMENTO_INIMIGO1_VALOR1 = 8
			SURGIMENTO_INIMIGO1_VALOR2 = 2
		
			SURGIMENTO_INIMIGO2_VALOR1 = 15
			SURGIMENTO_INIMIGO2_VALOR2 = 30
		}
	})

	maquina1.onCollide("inimigo", (inimigo) => {
		destroy(inimigo)
		VIDAS -= 1

		const music = play("efeito2", {
			volume: 0.2,
		})

		if (VIDAS === 0){
			go("end", PONTUACAO)		
		}
	})

	player.onCollide("vida", (vida) => {
		destroy(vida)
		VIDAS += 1

		const music = play("efeito1", {
			volume: 0.2,
		})

	})

	player.onCollide("vigor", (vigor) => {
		destroy(vigor)
		SPEED = 400

		const music = play("efeito1", {
			volume: 0.2,
		})
	})

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

	const textovigor = add([
		text("Velocidade:"), {
			font: "fontegame"
		},
		color(76, 23, 6),
		pos(30,70),
		z(100)
	])

	const ui3 = add([
		fixed(),
		z(100),
	])

	ui3.add([
		text("3"), {
			font: "fontegame"
		},
		pos(260,70),
		color(76, 23, 6),
		z(100),
		{ update() { this.text = SPEED } },
	])	
})

scene("end", (PONTUACAO) => {

	const fundo = add([
		sprite("fimdejogo"),
		pos(0, 0),
		area(),
		z(0),
	])

	add([
		text(PONTUACAO), {
			font: "fontegame"
		},
		pos(960,330),
		anchor("center"),
	])

	add([
		text("Pontuação:"), {
			font: "fontegame"
		},
		pos(960,280),
		anchor("center"),
	])

	onKeyPress("space", () => go("game"))
	onClick(() => go("start"))
})

scene("tutorial", () => {
	const fundo = add([
		sprite("tutorialdojogo"),
		pos(0, 0),
		area(),
		z(0),
	])

	onKeyPress("space", () => go("game"))
	onClick(() => go("start"))
})

scene("telainicial", () => {

	const music = play("musica1", {
		volume: 0.2,
	})

	add([
		sprite("telainicial"),
		pos(0, 0),
		area(),
		z(0),
	])

	onKeyPress(() => go("tutorial"))
})


go("telainicial")

