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
	add([
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


	//funcao para colocar a arvore aparecendo em intervalos de tempos aletarorios
	function spawnTree() {
		// adiciona arvore
		add([
			//cria um retangulo com as seguintes dimensoes
			//rand dizendo que a altura pode varias de 24 a 64
			rect(48, rand(24, 64)),
			//area de colisao(para nao bater nas coisas)
			area(),
			outline(4),
			pos(width(), height() - 48),
			//ponto de origem
			anchor("botleft"),
			//ancorado do lado esquerdo
			color(255, 180, 255),
			//ele vai se mover para a esquerva a 240 px por segundo
			move(LEFT, 240),
			//definindo um nome/tag para o elemento
			"tree",
		]);
			wait(rand(0.5, 1.5), () => {
			spawnTree();
		});
	}

	spawnTree();

	//contador de pontos
	let score = 0;
	const scoreLabel = add([
    	text(score),
    	pos(24, 24)
	])

	// a cada frame que passar ele add um a pontuacao
	onUpdate(() => {
    	score++;
    	scoreLabel.text = score;
	});

	//quando o bean colidir com a arvore(tree) vai add alguma coisa
	bean.onCollide("tree", () => {
		addKaboom(bean.pos);
		//faz a tela tremer
		//ali ja pode colocar uma variavel que toda vez que um inimigo bater nele perde uma vida
		shake();
		//quando o bee colidir vai mudar de cena
		go("lose"); // go to "lose" scene here
	});


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

