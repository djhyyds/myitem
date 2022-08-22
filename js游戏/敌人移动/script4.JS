(function () {
  /** @type{HTMLCanvasElement} */
  const canvas = document.getElementById('canvas4')
  const ctx = canvas.getContext('2d')
  CANVAS_WIDTH = canvas.width = 500
  CANVAS_HEIGHT = canvas.height = 1000
  //敌人数量
  const numberOfEnemies = 1000
  const enemiesArray = []
  //插入图片
  /* const enemyImage = new Image()
  enemyImage.src = './image/enemy1.png' */

  //控制动画快慢
  let gameFrame = 0


  /* enemy1 ={
    x:0,
    y:0,
    width:200,
    height:200
  } */
  class Enemy {
    constructor() {
      //动态插入图片
      this.image = new Image()
      this.image.src = './image/enemy4.png'
      //敌人随机位置


      //设定速度
      this.speed = Math.random() * 4 + 1
      //裁剪宽高
      this.spriteWidth = 213
      this.spriteHeight = 213
      //设置图像宽高
      this.width = this.spriteWidth / 2.5
      this.height = this.spriteHeight / 2.5
      //显示第几帧
      this.frame = 0
      //让每一个速度不一样
      this.flapSpeed = Math.random() * 3 + 1
      //设置出现的随机位置 都在画布内
      this.x = Math.random() * (canvas.width - this.width)
      this.y = Math.random() * (canvas.height - this.height)
      this.newX = Math.random() * (canvas.width - this.width)
      this.newY = Math.random() * (canvas.height - this.height)
      //设置重置 每个运动频率不同
      this.interval = Math.random() * 200 + 50
    }
    update () {
      if (gameFrame % Math.floor(this.interval) === 0) {
        this.newX = Math.random() * (canvas.width - this.width)
        this.newY = Math.random() * (canvas.height - this.height)
      }
      let dx = this.x - this.newX
      let dy = this.y - this.newY
      this.x -= dx / 20
      this.y -= dy / 20
      //让敌人水平循环
      if (this.x + this.width < 0) this.x = canvas.width
      //让图片动起来
      //控制速度
      if (gameFrame % Math.floor(this.flapSpeed) === 0) {
        this.frame > 4 ? this.frame = 0 : this.frame++
      }

    }
    draw () {
      //生成图像
      // ctx.strokeRect(this.x, this.y, this.width, this.height)
      //前四个参数相对于原图裁剪
      //后四个在画布的位置
      ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
  }
  // const enemy1 = new Enemy()
  //生成敌人
  for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy())
  }


  function animate () {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    /*  enemy1.update()
     enemy1.draw() */
    enemiesArray.forEach(enemy => {
      enemy.update()
      enemy.draw()
    })
    gameFrame++
    requestAnimationFrame(animate)
  }
  animate()
})()