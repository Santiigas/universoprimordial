import kaboom from "kaboom"

//npm run dev

kaboom({
	global: true,
	fullscreen: true,
	scale: 1,
})

loadSprite("bloco", "sprites/bloco.png")

scene("game", () => {
	layer(["bg", "obj", "ui"], "obj")

	const map = [
		'                                      ',
		'                                      ',
		'                                      ',
		'                                      ',
		'                                      ',
		'                                      ',
		'                                      ',
		'                                      ',
		'                                      ',
		'======================================',
	]

	const levelCfg = {
		with: 20,
		height: 20,
		'=': [sprite('bloco'), solid()]
	}

	const gameLevel = addLevel(map, levelCfg)
})

go("game")