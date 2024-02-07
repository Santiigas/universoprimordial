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


scene("game", () => {

	let SPEED = 380
	let PONTUACAO = 0
	let VIDAS = 3
	const JUMP_FORCE = 640

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
			// You can also register an event that runs when certain anim ends
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


	/**
	//Movimentacao
	onKeyDown("left", () => {
		player.move(-SPEED, 0)
		player.play("correndo")
	})

	onKeyDown("right", () => {
		player.move(SPEED, 0)
	})


	onKeyDown("up", () => {
		player.move(0, -SPEED)
	})

	onKeyDown("down", () => {
		player.move(0, SPEED)
	})

	// .jump() when "space" key is pressed //metodo pre definido para pular
	onKeyPress("space", () => {
		//verifica se o personagem está no chao, ou seja, ele so pula se estiver
		if (player.isGrounded()) {
			player.jump();
		}
	});
	*/

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
			pos(width(), height() - 490),
			anchor("botleft"),
			move(LEFT, 40),
			body({ isStatic: false }),
			z(100),
			"nuven1",
		]);
			wait(rand(6.5, 10.5), () => {
			nuvenAparece();
		});
	}  

	nuvenAparece();

	// Maquina --------------------------------
	const maquina = add([
		sprite("reator"),
		pos(910, height() - 98),
		area(),
		body({ isStatic: true }),
		z(100),
		"camada3",
	])

	//Inimigos ---------------------------------------
	function inimigoAparece() {
		const inimigo = add([ 
			sprite("inimigo"),
			area(),
			pos(width(), height() - 490),
			anchor("botleft"),
			move(LEFT, 100),
			body({ isStatic: false }),
			z(100),
			"inimigo",
		]);
			wait(rand(6.5, 10.5), () => {
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
			move(RIGHT, 100),
			body({ isStatic: false }),
			z(100),
			"inimigo",
		]);
			wait(rand(7.5, 9.5), () => {
			inimigoAparece2();
		});
	}

	inimigoAparece2();

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
			wait(75.1, () => {
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
			wait(75.1, () => {
			velocidadeAparece();
		});
	}

	velocidadeAparece();
	

	//COLISOES
	player.onCollide("inimigo", (inimigo) => {
		destroy(inimigo)
		PONTUACAO +=10
	})

	maquina.onCollide("inimigo", (inimigo) => {
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
		text("Pontos:"),
		pos(30,30),
		z(100)
	])

	const ui = add([
		fixed(),
		z(100),
	])

	ui.add([
		text("0"),
		pos(177,30),
		z(100),
		{ update() { this.text = PONTUACAO } },
	])


	//VIDAS
	const textovidas = add([
		text("Vidas:"),
		pos(1730,30),
		z(100)
	])

	const ui2 = add([
		fixed(),
		z(100),
	])

	ui2.add([
		text("3"),
		pos(1860,30),
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


