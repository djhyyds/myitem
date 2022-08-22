//load监听所有资源加载完在开始  DOMContentLoaded只有结构加载完
window.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  canvas.width = 500
  canvas.height = 800
  //创建Game构造函数
  //存放整个游戏的东西

  class Game {
    constructor(ctx, width, height) {
      //将公有的属性变为每个类的私有属性
      this.ctx = ctx
      this.width = width
      this.height = height
      //创建数组存放敌人
      this.enemies = []
      //设置敌人出现的间隔时间
      this.enemyInterval = 10
      this.enemyTimer = 0
      ///随机敌人类型
      this.enemyTypes = ['Worm', 'Ghost', 'spider']
    }

    update (dataTime) {
      this.enemies = this.enemies.filter(object => !object.markedForDeletion)
      //到时间生成敌人，并重置时间
      if (this.enemyTimer > this.enemyInterval) {
        this.#addNewEnemy()
        this.enemyTimer = 0
        // console.log(this.enemies)
      } else {
        this.enemyTimer += dataTime
        // console.log(, dataTime,)

      }
      this.enemies.forEach(object =>
        object.update(dataTime)
      )
    }

    draw () {
      this.enemies.forEach(object =>
        object.draw(this.ctx)
      )
    }
    #addNewEnemy () {
      //将创建的敌人加到数组里
      const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]
      if (randomEnemy == 'Worm') this.enemies.push(new Worm(this))
      else if (randomEnemy == 'Ghost') this.enemies.push(new Ghost(this))
      else if (randomEnemy == 'spider') this.enemies.push(new Spider(this))
      //制造3D效果
      // this.enemies.sort(function (a, b) {
      //   return a.y - b.y
      // })
    }
  }
  //创建Enemy 来生成敌人 控制敌人样式和行为
  class Enemy {
    //每个敌人的公有属性
    constructor(game) {
      this.game = game
      // console.log(this.game)

      //判断是否移出屏幕
      this.markedForDeletion = false
      //解决帧数运动问题
      this.frameX
      this.maxFrame = 5
      this.frameInterval = 10
      this.frameTimer = 0


    }
    //规定敌人动作
    update (dataTime) {
      //让比较卡的电脑也可以合适运动
      this.x -= this.vx * dataTime
      //删除移出屏幕的敌人
      if (this.x < 0 - this.width) this.markedForDeletion = true
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrame) this.frameX++
        else this.frameX = 0
        this.frameTimer = 0
      } else {
        this.frameTimer += dataTime
      }
    }
    //绘画敌人样式
    draw (ctx) {
      //fillRect 绘画实心矩形
      // ctx.fillRect(this.x, this.y, this.width, this.height)
      //五个参数  第一个参数是绘制的图片，后面四个是开始在画布绘制的位置
      //九个参数 前四个在原图截取的大小(x轴y轴距离宽高) 后面四个是开始在画布绘制的位置


      ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
  }
  // 另一种敌人继承第一个的所有属性方法
  class Worm extends Enemy {
    constructor(game) {
      super(game)
      //定义截取一帧的大小
      this.spriteWidth = 229
      this.spriteHeight = 171
      this.width = this.spriteWidth / 2
      this.height = this.spriteHeight / 2
      this.x = this.game.width
      //让所有虫子在地上
      this.y = this.game.height - this.height
      this.image = worm
      //设定敌人移动速度
      this.vx = Math.random() * 0.1 + 0.1

    }
  }
  //创建鬼类敌人
  class Ghost extends Enemy {
    constructor(game) {
      super(game)
      //定义截取一帧的大小
      this.spriteWidth = 261
      this.spriteHeight = 209
      this.width = this.spriteWidth / 2
      this.height = this.spriteHeight / 2
      this.x = this.game.width
      //鬼魂在屏幕上60%
      this.y = Math.random() * this.game.height * 0.6
      this.image = ghost
      //设定敌人移动速度
      this.vx = Math.random() * 0.2 + 0.1
      //设置角度
      this.angle = 0
      //设置幅度
      this.curve = Math.random() * 3
    }
    update (dataTime) {
      super.update(dataTime)

      //让鬼魂抖动起来
      this.y += Math.sin(this.angle) * this.curve
      this.angle += 0.04
    }
    draw (ctx) {
      //save 后面到restore的只在这期间有效
      ctx.save()
      ctx.globalAlpha = 0.7
      super.draw(ctx)
      ctx.restore()
    }
  }
  class Spider extends Enemy {
    constructor(game) {
      super(game)
      //定义截取一帧的大小
      this.spriteWidth = 310
      this.spriteHeight = 175
      this.width = this.spriteWidth / 2
      this.height = this.spriteHeight / 2
      this.x = Math.random() * this.game.width
      this.y = 0 - this.height
      this.image = spider
      //设定敌人移动速度
      this.vx = 0
      this.vy = Math.random() * 0.1 + 0.1
      this.maxLength = Math.random() * this.game.height
    }
    update (dataTime) {
      super.update(dataTime)
      //删除蜘蛛
      if (this.y < 0 - this.height * 2) this.markedForDeletion = true

      this.y += this.vy * dataTime
      if (this.y > this.maxLength) this.vy *= -1
    }
    draw (ctx) {
      //让蜘蛛拉上蜘蛛网
      ctx.beginPath()
      ctx.moveTo(this.x + this.width / 2, 0)
      ctx.lineTo(this.x + this.width / 2, this.y + 10)
      ctx.stroke()
      super.draw(ctx)
    }
  }
  //将全局参数传进来
  const game = new Game(ctx, canvas.width, canvas.height)

  let lastTime = 1
  //定义一个动画函数 让游戏动起来
  function animate (timeStamp) {
    //计算1帧需要的时间
    const dataTime = timeStamp - lastTime
    lastTime = timeStamp
    // console.log(dataTime);
    //清除画布移动残影
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //实时清除
    game.update(dataTime)
    game.draw()
    requestAnimationFrame(animate)
  }
  animate(0)
})
