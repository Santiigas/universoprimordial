import kaboom from "kaboom"

//npm run dev

kaboom()

//carregando imagen do personagem 
loadSprite("bean", "sprites/bean.png")

//conceitos de cena. O que vai acontecer se algo acontecer
//se bateu na arvore é game over
//essa cena se chama game, pois e o jogo rodando, com o personagem vivo
scene("game", () => {
	//gravidade do jogo
	setGravity(1600)


	//"add" adiciona coisas na tela podendo ser uma variavel
	const bean = add([
		//pegando a imagem e joga na teal
		sprite("bean"),
		//posicao na tela
		pos(80, 180),
		//area de colisao
		area(),
		//significa que é um corpo fisico e que responde a uma gravidade
		body(),
	])


	// .jump() when "space" key is pressed //metodo pre definido para pular
	onKeyPress("space", () => {
		//verifica se o personagem está no chao, ou seja, ele so pula se estiver
		if (bean.isGrounded()) {
			bean.jump();
		}
	});


	// adiciona uma plataforma(chão)
	const chao = add([
		//cria uma retangulo
		rect(width(), 48),
		//posicao do retangulo
		pos(0, height() - 48),
		//sombra/contorno
		outline(4),
		//pode ocorrer colisoes nele
		area(),
		//responde a uma gravidade e "isStattic: true" nao pode se mover
		body({ isStatic: true }),
		color(127, 200, 255),
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

