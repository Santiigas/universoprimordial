import kaboom from "kaboom"

//npm run dev

kaboom()

//carregando imagen do personagem 
loadSprite("bean", "sprites/bean.png")
loadSprite("cenario", "sprites/cenario.png")



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
		pos(100, 100),
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
		sprite("cenario"),
		scale(1),
		//posicao do retangulo
		pos(0, -100),
		//pode ocorrer colisoes nele
		area(),
		//responde a uma gravidade e "isStattic: true" nao pode se mover
		body({ isStatic: true }),
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

