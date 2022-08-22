window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 1300
  canvas.height = 720

  const fullScreenButton = document.getElementById('fullScreenButton')
  //存放敌人
  let enemies = []
  //显示分数
  let score = 0
  //游戏结束
  let gameOver = false
  //创建类
  //定义玩家操作
  class InputHandler {
    constructor() {
      //存放用户的按键
      this.keys = []
      //移动端 
      this.touchY = ''
      this.touchTreshold = 30
      window.addEventListener('keydown', e => {
        if (
          (e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight') && this.keys.indexOf(e.key) === -1) {
          this.keys.push(e.key)
        } else if (e.key === 'Enter' && gameOver) restartGame()
      })
      window.addEventListener('keyup', e => {
        if (
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight') {
          this.keys.splice(this.keys.indexOf(e.key), 1)
        }
      })
      window.addEventListener('touchstart', e => {
        this.touchY = e.changedTouches[0].pageY

      })
      window.addEventListener('touchmove', e => {
        const swiperDistance = e.changedTouches[0].pageY - this.touchY
        if (swiperDistance > -this.touchTreshold &&
          this.keys.indexOf('swiper up') === -1
        ) this.keys.push('swiper up')
        else if (swiperDistance > this.touchTreshold && this.keys.indexOf('swiper down') === -1) {
          this.keys.push('swiper down')
          if (gameOver) restartGame()
        }
      })
      window.addEventListener('touchend', e => {
        console.log(this.keys)
        this.keys.splice(this.keys.indexOf('swiper up'), 1)
        this.keys.splice(this.keys.indexOf('swiper down'), 1)
      })
    }
  }

  // 玩家控制的角色
  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.width = 200
      this.height = 200
      this.x = 0
      this.y = this.gameHeight - this.height
      this.image = playerImage
      this.frameX = 0
      this.maxFrame = 8
      this.frameY = 0
      this.fps = 20
      this.frameTimer = 0
      this.frameInterval = 1000 / this.fps
      this.speed = 0
      //设置跳跃高度
      this.vy = 0
      //设置重力
      this.weight = 1
    }
    restart () {
      this.x = 0
      this.y = this.gameHeight - this.height
      this.maxFrame = 8
      this.frameY = 0
    }
    draw (context) {
      //创建测试白块
      /* context.fillStyle = 'white'
      context.fillRect(this.x, this.y, this.width, this.height) */
      //
      /*       context.strokeStyle = 'white'
            context.strokeRect(this.x, this.y, this.width, this.height)
            //创建空心圆
            context.beginPath()
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2)
            context.stroke()
            context.strokeStyle = 'blue'
            context.beginPath()
            context.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2)
            context.stroke() */
      context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    update (input, deltaTime, enemies) {
      enemies.forEach(enemy => {
        const dx = (enemy.x + enemy.width / 2 - 20) - (this.x + this.width / 2)
        const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2 + 20)
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < enemy.width / 3 + this.width / 3) {
          gameOver = true
        }
      })

      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0
        else this.frameX++
        this.frameTimer = 0
      } else {
        this.frameTimer += deltaTime
      }

      if (input.keys.indexOf('ArrowRight') > -1) {
        console.log(4)
        this.speed = 5
      } else if (input.keys.indexOf('ArrowLeft') > -1) {
        console.log(3)
        this.speed = -5
      }
      else if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swiper up') > -1) && this.onGround()) {
        console.log(2)
        this.vy -= 32
      }
      else {
        console.log(1)
        this.speed = 0
      }
      this.x += this.speed

      if (this.x < 0) this.x = 0
      else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width
      //防止玩家跳的太高飞出去
      this.y += this.vy
      if (!this.onGround()) {
        this.vy += this.weight
        this.maxFrame = 5
        this.frameY = 1
      } else {
        this.vy = 0
        this.maxFrame = 8
        this.frameY = 0
      }
      if (this.y > this.gameHeight - this.height) {
        this.y = this.gameHeight - this.height
      }
    }

    //设置重力
    onGround () {
      return this.y >= this.gameHeight - this.height
    }
  }
  // 背景
  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.image = backgroundImage
      this.x = 0
      this.y = 0
      this.width = 2400
      this.height = 720
      this.speed = 7
    }

    draw (context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height)
      context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
    }
    update () {
      this.x -= this.speed
      if (this.x < 0 - this.width) this.x = 0
    }
    restart () {
      this.x = 0
    }
  }
  //敌人
  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.width = 160
      this.height = 119
      this.image = enemyImage
      this.x = this.gameWidth
      this.y = this.gameHeight - this.height
      this.frameX = 0
      this.maxFrame = 5
      this.fps = 20
      this.frameTimer = 0
      this.frameInterval = 1000 / this.fps
      this.speed = 5
      //删除敌人
      this.markedForDeletion = false
    }
    draw (context) {
      //设置空心盒子 检测碰撞
      /*  context.strokeStyle = 'white'
       context.strokeRect(this.x, this.y, this.width, this.height)
       context.beginPath()
       context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2)
       context.stroke()
       context.strokeStyle = 'blue'
       context.beginPath()
       context.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2)
       context.stroke() */
      context.drawImage(this.image, this.frameX * this.width, 0,
        this.width, this.height, this.x, this.y, this.width, this.height)

    }
    update (deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) this.frameX = 0
        else this.frameX++
        this.frameTimer = 0
      } else {
        this.frameTimer += deltaTime
      }
      this.x -= this.speed
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true
        score++
      }
    }
  }
  // 控制敌人 

  function handleEnemies (deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height))
      enemyTimer = 0
    } else {
      enemyTimer += deltaTime
    }
    enemies.forEach(enemy => {
      enemy.draw(ctx)
      enemy.update(deltaTime)
    })
    enemies = enemies.filter(enemy => !enemy.markedForDeletion)
  }
  //控制分数数据
  function displayStatusText (context) {
    context.textAlign = 'left'
    context.font = '40px Helvetica'
    context.fillStyle = 'black'
    context.fillText('score' + score, 20, 50)
    context.fillStyle = 'white'
    context.fillText('score' + score, 22, 52)
    if (gameOver) {
      context.textAlign = 'center'
      context.fillStyle = 'black'
      context.fillText('GAME OVER,摁回车或向下滑继续!', canvas.width / 2, 200)
      context.fillStyle = 'white'
      context.fillText('GAME OVER,摁回车或向下滑继续!', canvas.width / 2 + 2, 202)
    }
  }
  //重启游戏
  function restartGame () {
    player.restart()
    background.restart()
    //存放敌人
    enemies = []
    //显示分数
    score = 0
    //游戏结束
    gameOver = false
    animate(0)
  }

  //全屏模式
  function toFullScreenButton () {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch(
        err => {
          alert(`不能全屏${err.message}`)
        })
    } else {
      document.exitFullscreen()
    }
  }
  fullScreenButton.addEventListener('click', toFullScreenButton)


  const input = new InputHandler()
  const player = new Player(canvas.width, canvas.height)
  const background = new Background(canvas.width, canvas.height)
  //创建时间戳
  let lastTime = 0
  let enemyTimer = 0
  //生成敌人的间隔时间
  let enemyInterval = 1000
  //敌人的生成更加随机
  let randomEnemyInterval = Math.random() * 500 + 500

  //整个游戏的动画
  function animate (timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    //删除残影
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //启动绘画
    background.draw(ctx)
    background.update()
    player.draw(ctx)
    //启动动作
    player.update(input, deltaTime, enemies)
    handleEnemies(deltaTime)
    displayStatusText(ctx)
    //跟随浏览器刷新进行动画
    if (!gameOver) requestAnimationFrame(animate)
  }
  animate(0)
})
