/* 
1 没有框架和库
2 使用颜色碰撞检测
3 使用时间戳和时间增量确保游戏时间相同
4 使用数组方法删除游戏对象
5 使用数组排序方法正确绘制游戏
6 使用更简洁的js代码
*/

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight


  const collisionCanvas = document.getElementById('collisionCanvas'),
    button = document.querySelector('button')
  const collisionCtx = collisionCanvas.getContext('2d')
  collisionCanvas.width = window.innerWidth
  collisionCanvas.height = window.innerHeight
  let timeToNextRaven = 0
  let ravenInterval = 500
  let lastTime = 0
  //速度
  let velocity = 3
  //分数
  let score = 0
  //游戏结束
  let gameOver = false
  ctx.font = '50px Impact'
  let ravens = []
  class Raven {
    constructor() {
      this.spriteWidth = 271
      this.spriteHeight = 194
      this.sizeModifier = Math.random() * 0.6 + 0.4
      this.width = this.spriteWidth * this.sizeModifier
      this.height = this.spriteHeight - this.sizeModifier
      this.x = canvas.width
      this.y = Math.random() * (canvas.height - this.height)
      this.directionX = Math.random() * 5 + velocity
      this.directionY = Math.random() * 5 - 2.5

      //删除标记
      this.markedForDeletion = false
      this.image = new Image()
      this.image.src = './raven.png'
      //控制生成速度
      this.frame = 0
      this.maxFrame = 4
      //控制动画速度
      this.timeSinceFlap = 0
      this.flapInterval = Math.random() * 50 + 50
      //设置随机盒子颜色
      this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]

      this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')'

      this.hasTrail = Math.random() > 0.5
    }
    update (deltaTime) {
      //怪物不要移出屏幕
      if (this.y < 0 || this.y > canvas.height - this.height) {
        this.directionY = this.directionY * - 1
      }
      //改变怪物移动轨迹
      this.x -= this.directionX
      this.y += this.directionY
      if (this.x < 0 - this.width) this.markedForDeletion = true
      this.timeSinceFlap += deltaTime
      if (this.timeSinceFlap > this.flapInterval) {
        if (this.frame > this.maxFrame) this.frame = 0
        else this.frame++
        this.timeSinceFlap = 0

        if (this.hasTrail) {
          for (let i = 0; i < 5; i++) {
            particles.push(new Particle(this.x, this.y, this.width, this.color))
          }

        }

      }
      if (this.x < 0 - this.width) gameOver = true
    }
    draw () {
      //每个乌鸦背景不同
      collisionCtx.fillStyle = this.color
      collisionCtx.fillRect(this.x, this.y, this.width, this.height)
      ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
  }

  //爆炸效果
  let explosions = []
  class Explosion {
    constructor(x, y, size) {
      this.size = size
      this.spriteWidth = 200
      this.spriteHeight = 179
      this.x = x
      this.y = y
      this.image = new Image()
      this.image.src = './boom.png'
      //添加音效
      this.sound = new Audio()
      this.sound.src = '../爆炸效果/boom.wav'
      this.frame = 0
      this.timeSinceLastFrame = 0
      this.frameInterval = 100
      this.markedForDeletion = false
    }
    update (deltaTime) {
      if (this.frame === 0) this.sound.play()
      this.timeSinceLastFrame += deltaTime
      if (this.timeSinceLastFrame > this.frameInterval) {
        this.frame++
        this.timeSinceLastFrame = 0
        if (this.frame > 5) this.markedForDeletion = true
      }
    }
    draw () {
      ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size)

    }
  }


  // 粒子特效
  let particles = []
  class Particle {
    constructor(x, y, size, color) {
      this.size = size
      this.x = x + this.size / 2 + Math.random() * 50 - 25
      this.y = y + this.size / 2 + Math.random() * 50 - 25

      this.radius = Math.random() * this.size / 10
      this.maxRadius = Math.random() * 20 + 35
      this.speedX = Math.random() * 1 + 0.5
      this.color = color
    }
    update () {
      this.x += this.speedX
      this.radius += 0.5
      if (this.radius > this.maxRadius - 5) this.markedForDeletion = true
    }
    draw () {
      ctx.save()
      ctx.globalAlpha = 1 - this.radius / this.maxRadius
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }


  //显示得分
  function drawScore () {
    ctx.fillStyle = 'black'
    ctx.fillText('Score: ' + score, 50, 75)
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + score, 55, 80)
  }


  //创建游戏结束画面
  function drawGameOver () {
    ctx.textAlign = 'center'
    ctx.fillStyle = 'black'
    ctx.fillText('Game Over 分数  ' + score, canvas.width / 2, canvas.height / 2)
    //添加阴影效果
    ctx.fillStyle = 'white'
    ctx.fillText('Game Over 分数  ' + score, canvas.width / 2 + 5, canvas.height / 2 + 5)
    button.style.display = 'block'
  }


  window.addEventListener('pointerdown', function (e) {
    //获取点击处的颜色
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
    console.log(detectPixelColor)
    const pc = detectPixelColor.data
    ravens.forEach(object => {
      if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
        object.markedForDeletion = true
        score++

        //添加爆炸效果音效
        explosions.push(new Explosion(object.x, object.y, object.width))
      }
    })
  })

  function animate (timestamp) {
    button.style.display = 'none'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height)
    let deltaTime = timestamp - lastTime
    lastTime = timestamp
    timeToNextRaven += deltaTime
    if (timeToNextRaven > ravenInterval) {
      ravens.push(new Raven())
      timeToNextRaven = 0
      //根据宽度排序 产生深度效果
      ravens.sort(function (a, b) {
        return a.width - b.width
      })
    }

    drawScore();
    [...particles, ...ravens, ...explosions].forEach(object => object.update(deltaTime));
    [...particles, ...ravens, ...explosions].forEach(object => object.draw())
    ravens = ravens.filter(object => !object.markedForDeletion)
    explosions = explosions.filter(object => !object.markedForDeletion)
    particles = particles.filter(object => !object.markedForDeletion)
    switch (score) {
      case 10:
        ravenInterval = 350
        break

      case 20:
        velocity = 5
        break
      case 40:
        break
      case 60:
        ravenInterval = 300
      case 100:
        velocity = 6
        break
      case 130:
        velocity = 8
        break
      case 150:
        velocity = 10
        ravenInterval = 350
        break
    }
    if (!gameOver) requestAnimationFrame(animate)
    else drawGameOver()
  }
  animate(0)
})