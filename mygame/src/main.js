import kaboom from "kaboom"

//npm run dev

kaboom()

const SPEED = 320

scene("game", () => {
	setGravity(1600)

	const player = add([
		rect(20, 40),
		pos(940, 480),
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

	// adiciona uma plataforma(chão)
	add([
		rect(width(), 48),
		pos(0, height() - 48),
		area(),
		body({ isStatic: true }),
		color(127, 200, 255),
	])

	add([
		rect(500, 28),
		pos(0, height() - 76),
		area(),
		body({ isStatic: true }),
		color(827, 200, 255),
	])
	
	add([
		rect(350, 118),
		pos(0, height() - 194),
		area(),
		body({ isStatic: true }),
		color(827, 500, 755),
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


