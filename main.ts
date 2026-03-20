/**
 * promenljiva da proverimo da li smo već ušli u level 2
 */
/**
 * pravimo promenljive za likove
 */
// Kada vreme istekne → igra se završava i pobedio si
info.onCountdownEnd(function () {
    game.gameOver(true)
})
// Funkcija koja se pokreće kada dođeš do 20 poena (LEVEL UP)
function level_up_nach_20_punkten () {
    // game.splash("LEVEL 2!") ← OBRIŠI
    effects.confetti.startScreenEffect(2000)
    mamaDino.sayText("LEVEL 2!", 2000)
    scroller.scrollBackgroundWithSpeed(-80, 0)
    game.onUpdateInterval(700, function () {
        let fastEnemy = sprites.create(assets.image`Tourist`, SpriteKind.Enemy)
        fastEnemy.setPosition(160, randint(15, 115))
        fastEnemy.setVelocity(-90, 0)
    })
}
// Kada igrač pokupi "baby dino" (projektil)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    // brišemo baby dino
    otherSprite.destroy()
    // dodajemo 1 poen
    info.changeScoreBy(1)
    // resetujemo vreme na 15 sekundi
    info.startCountdown(15)
    // ako imamo 20 ili više poena i još nismo ušli u level 2
    if (info.score() >= 20 && !(level2)) {
        // zapamti da smo već ušli u level 2
        level2 = true
        // pokreni level up
        level_up_nach_20_punkten()
    }
})
// Ako igrač nestane (izgubi sve živote)
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    // mama kaže tužan smajli
    mamaDino.sayText(":(")
})
// Kada igrač udari u neprijatelja (turistu)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    // uništi neprijatelja
    otherSprite.destroy()
    // izgubi 1 život
    info.changeLifeBy(-1)
    // pokreni animacije (da izgleda zanimljivo)
    animation.runImageAnimation(
    mamaDino,
    assets.animation`Mama Moving`,
    100,
    true
    )
    animation.runImageAnimation(
    babyDino,
    assets.animation`Animated Baby`,
    1000,
    true
    )
    animation.runImageAnimation(
    tourist,
    assets.animation`Animated Tourist`,
    1000,
    true
    )
})
let tourist: Sprite = null
let babyDino: Sprite = null
let level2 = false
let mamaDino: Sprite = null
// postavljamo pozadinu
scene.setBackgroundImage(sprites.background.cityscape2)
// pravimo glavnog lika (mama dino)
mamaDino = sprites.create(assets.image`Mama`, SpriteKind.Player)
// kontrola kretanja (strelice na tastaturi)
controller.moveOnlyOnscreenWithArrows(mamaDino, controller.Speeds.Fast)
// pozadina se pomera ulevo (kao da trčiš napred)
scroller.scrollBackgroundWithSpeed(-50, 0)
// stalno pravimo baby dino koje treba da pokupiš
forever(function () {
    babyDino = sprites.createProjectileFromSide(assets.image`Baby`, -90, 0)
    // nasumična visina (gore-dole)
    babyDino.y = randint(15, 115)
    // pravi novi svaki 1 sekund
    pause(1000)
})
// stalno pravimo neprijatelje (turiste)
forever(function () {
    tourist = sprites.create(assets.image`Tourist`, SpriteKind.Enemy)
    // pojavi se desno
    tourist.setPosition(160, randint(15, 115))
    // ide ulevo
    tourist.setVelocity(-60, 0)
    // novi neprijatelj na svake ~2 sekunde
    pause(2100)
})
