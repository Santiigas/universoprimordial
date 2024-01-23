import kaboom from "kaboom"

//npm run dev

kaboom({
	width: 1380,
    height: 820,
	background: [118, 183, 745],
	letterbox: true
})


scene("game", () => {

	let SPEED = 320
	let PONTUACAO = 0
	let VIDAS = 3

	setGravity(1600)

	const player = add([
		rect(20, 40),
		pos(700, 480),
		area(),
		body(),
		color(127, 600, 255),
	])

	//Movimentacao
	onKeyDown("left", () => {
		player.move(-SPEED, 0)
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

	//MAPA ----------------------------------------------------
	//LADO ESQUERD0
	add([
		rect(width(), 48),
		pos(0, height() - 48),
		area(),
		body({ isStatic: true }),
		color(127, 200, 255),
		"chao",
	])

	add([
		rect(350, 24),
		pos(0, height() - 72),
		area(),
		body({ isStatic: true }),
		color(827, 200, 255),
		"camada1",
	])
	
	add([
		rect(230, 118),
		pos(0, height() - 190),
		area(),
		body({ isStatic: true }),
		color(827, 500, 755),
		"camada2",
	])

	add([
		rect(140, 300),
		pos(0, height() - 490),
		area(),
		body({ isStatic: true }),
		color(827, 100, 755),
		"camada3",
	])

	//LADO ESQUERD0
	add([
		rect(350, 24),
		pos(1030, height() - 72),
		area(),
		body({ isStatic: true }),
		color(827, 200, 255),
		"camada1",
	])

	add([
		rect(230, 118),
		pos(1150, height() - 190),
		area(),
		body({ isStatic: true }),
		color(827, 500, 755),
		"camada2",
	])

	add([
		rect(140, 300),
		pos(1240, height() - 490),
		area(),
		body({ isStatic: true }),
		color(827, 100, 755),
		"camada3",
	])

	// Maquina --------------------------------
	const maquina = add([
		rect(30, 50),
		pos(694, height() - 98),
		area(),
		body({ isStatic: true }),
		color(827, 100, 755),
		"camada3",
	])

	//Inimigos ---------------------------------------
	function inimigoAparece() {
		const inimigo = add([ 
			rect(15, 15),
			area(),
			pos(width(), height() - 490),
			anchor("botleft"),
			color(255, 180, 255),
			move(LEFT, 100),
			body({ isStatic: false }),
			"inimigo",
		]);
			wait(10.1, () => {
			inimigoAparece();
		});
	}

	inimigoAparece();

	// SKILS ------------------------
	function vidaAparece() {
		const vida = add([ 
			rect(15, 15),
			area(),
			pos(width() - 180, height() - 290),
			anchor("botleft"),
			color(255, 188, 5),
			body({ isStatic: false }),
			"vida",
		]);
			wait(75.1, () => {
			vidaAparece();
		});
	}

	vidaAparece();

	function velocidadeAparece() {
		const velocidade = add([ 
			rect(15, 15),
			area(),
			pos(width() - 1200, height() - 290),
			anchor("botleft"),
			color(67, 52, 235),
			body({ isStatic: false }),
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
		SPEED += 500;

		function diminuirVelocidade(){
			SPEED -= 500
		}

		setTimeout(diminuirVelocidade, 10000)
	});

 

	//PONTACAO NA TELA
	const textopontuacao = add([
		text("Pontos:"),
		pos(30,30),
	])

	const ui = add([
		fixed(),
	])

	ui.add([
		text("0"),
		pos(177,30),
		{ update() { this.text = PONTUACAO } },
	])


	//VIDAS
	const textovidas = add([
		text("Vidas:"),
		pos(1200,30),
	])

	const ui2 = add([
		fixed(),
	])

	ui2.add([
		text("3"),
		pos(1330,30),
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


