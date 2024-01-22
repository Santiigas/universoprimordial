import kaboom from "kaboom"

//npm run dev

kaboom({
	width: 1380,
    height: 820,
	background: [118, 183, 745],
	letterbox: true
})


const SPEED = 320

scene("game", () => {
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

	//Inimigos
	//funcao para colocar a arvore aparecendo em intervalos de tempos aletarorios
	function spawnTree() {
		add([ 
			rect(15, 15),
			area(),
			pos(width(), height() - 490),
			anchor("botleft"),
			color(255, 180, 255),
			move(LEFT, 140),
			body({ isStatic: false }),
			"tree",
		]);
			wait(10.4, () => {
			spawnTree();
		});

		add([ 
			rect(15, 15),
			area(),
			pos(0, height() - 490),
			anchor("botleft"),
			color(255, 180, 255),
			move(RIGHT, 140),
			body({ isStatic: false }),
			"tree",
		]);
			wait(27.0, () => {
			spawnTree();
		});
		
	}

	spawnTree();
	

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


