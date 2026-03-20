function level_up_nach_20_punkten () {
	
}
info.onCountdownEnd(function () {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    info.startCountdown(15)
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    mamaDino.sayText(":(")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
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
let mamaDino: Sprite = null
scene.setBackgroundImage(sprites.background.cityscape2)
mamaDino = sprites.create(assets.image`Mama`, SpriteKind.Player)
controller.moveOnlyOnscreenWithArrows(mamaDino, controller.Speeds.Fast)
scroller.scrollBackgroundWithSpeed(-50, 0)
forever(function () {
    babyDino = sprites.createProjectileFromSide(assets.image`Baby`, -90, 0)
    babyDino.y = randint(15, 115)
    pause(1000)
})
forever(function () {
    tourist = sprites.createProjectileFromSide(assets.image`Tourist`, -40, 40)
    tourist.setKind(SpriteKind.Enemy)
    pause(2100)
    tourist.y = randint(15, 115)
})
