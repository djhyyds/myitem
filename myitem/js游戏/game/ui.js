export class UI {
  constructor(game) {
    this.game = game
    this.fontSize = 150
    this.fontFamily = 'Helvetica'
    this.livesImage = document.getElementById('lives')

  }
  draw (context) {
    context.save()
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'white'
    context.shadowBlur = 0
    context.textAlign = 'left'
    context.fillStyle = this.game.fontColor
    context.fillText('分数' + this.game.score, 20, 50)
    context.font = 100 * 0.8 + 'px' + this.fontFamily
    context.fillText('Time:' + (this.game.time * 0.001).toFixed(1), 20, 80)

    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25)

    }

    if (this.game.gameOver) {
      context.textAlign = 'center'

      if (this.game.score < 50) {
        context.font = 190 + 'px' + this.fontFamily
        context.fillText('菜', this.game.width * 0.5, this.game.height * 0.3)
      } else if (this.game.score < 100) {
        context.fillText('一般', this.game.width * 0.5, this.game.height * 0.3)
      } else {
        context.fillText('可以', this.game.width * 0.5, this.game.height * 0.3)
      }
    }
    context.restore()
  }
}