
//轮播图
(function () {
  const container = document.querySelector('.container'),
    wrapper = container.querySelector('.wrapper'),
    slideList = wrapper.querySelectorAll('.slide'),
    paginationList = Array.from(container.querySelectorAll('.pagination span')),
    [btnPrev, btnNext] = Array.from(container.querySelectorAll('.btn'))
  let distance = container.clientWidth,
    //获取container 宽度 每次切换要运动的距离
    step = 2,//当前展示slide索引
    count = slideList.length, //记录slide数量 包含克隆的那张 最大索引count-1
    autoTimer = null, //存储自动轮播的定时器
    interval = 1000 //自动轮播定义的时间
  wrapper.style.left = `${-step * distance}px`
  wrapper.style.transitionDuration = `0s`
  //让wrapper处于初始索引这一张

  //切换下一张
  const moveNext = function moveNext () {
    if (step === count - 1) {
      step = 0
      wrapper.style.transitionDuration = `0s`
      wrapper.style.left = `0px`
      let temp = wrapper.offsetWidth //刷新渲染队列
    }
    //当前已经是最后一张，没有办法再+
    step++
    wrapper.style.transitionDuration = `0.3s`
    wrapper.style.left = `${-step * distance}px`
    paginationFocus()
  }

  /* 控制分页器的选中状态 */
  const paginationFocus = function paginationFocus () {
    let temp = step
    if (step === count - 1) temp = 0
    paginationList.forEach((item, index) => {
      item.className = index === temp ? 'active' : ''
    })
  }
  paginationFocus()//让分页器选中项处于初始索引这一张
  //轮播图切换到上一张
  const movePrev = function movePrev () {
    if (step === 0) {
      step = count - 1
      wrapper.style.transitionDuration = `0s`
      wrapper.style.left = `${-step * distance}px`
      let temp = wrapper.offsetWidth //刷新渲染队列
    }
    //当前已经是最后一张，没有办法再+
    step--
    wrapper.style.transitionDuration = `0.3s`
    wrapper.style.left = `${-step * distance}px`
    paginationFocus()
  }

  //控制轮播
  //自动轮播
  autoTimer = setInterval(moveNext, interval)
  //鼠标进入和离开 ，控制自动轮播暂停和开始
  container.onmouseenter = function () {
    clearInterval(autoTimer)
    autoTimer = null
  }
  container.onmouseleave = function () {
    if (!autoTimer) autoTimer = setInterval(moveNext, interval)
  }
  //离开当前页卡，和重新进入，也要控制定时器暂停和开始
  document.onvisibilitychange = function () {
    if (document.hidden) {
      clearInterval(autoTimer)
      autoTimer = null
      return
    }
    if (!autoTimer) autoTimer = setInterval(moveNext, interval)
  }
  //点击左右按钮
  btnPrev.onclick = utils.throttle(movePrev, 500)
  btnNext.onclick = utils.throttle(moveNext, 500)
  //点击每个分页器实现切换
  paginationList.forEach((item, index) => {
    item.onclick = function () {
      if (step === index) return
      step = index
      wrapper.style.transitionDuration = `0.3s`
      wrapper.style.left = `${-step * distance}px`
      paginationFocus()
    }
  })
})()
  //其他效果
  ;
(() => {
  // 懒加载
  let footed = document.querySelector('.footed')
  let html = document.documentElement,
    body = document.body
  let count = 0
  let str = ` <div class="contioner2">
    <div class="Box">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b2a3468c474addf9140a21cc77a87d5c.jpeg?thumb=1&w=1379&h=135&f=webp&q=90"
            alt="">
    </div>

    <div class="box">
        <div class="f1">
            <h2 class="h1">手机</h2>
            <a class="h2" href="https://www.mi.com/p/1915.html">查看更多<i class="iconfont icon-youjiantou"></i> </a>
        </div>
        <img class="da" style="width:234px;height: 607px; "
            src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ac5cafc68c10ce4471869d378f594b52.png?thumb=1&w=322&h=844&f=webp&q=90"
            alt="">
        <div class="box1"> <img
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                alt="">
            <p>xiao mi civi 4s </p>
            <p class="c">超级旗舰级</p>
            <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
        </div>
        <div class="box1"> <img
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                alt="">
            <p>xiao mi civi 4s </p>
            <p class="c">超级旗舰级</p>
            <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
        </div>
        <div class="box1"> <img
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                alt="">
            <p>xiao mi civi 4s </p>
            <p class="c">超级旗舰级</p>
            <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
        </div>
        <div class="box1"> <img
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                alt="">
            <p>xiao mi civi 4s </p>
            <p class="c">超级旗舰级</p>
            <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
        </div>
        <div class="box1"> <img
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                alt="">
            <p>xiao mi civi 4s </p>
            <p class="c">超级旗舰级</p>
            <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
        </div>
        <div class="box1"> <img
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                alt="">
            <p>xiao mi civi 4s </p>
            <p class="c">超级旗舰级</p>
            <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
        </div>
        <div class="box1"> <img
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                alt="">
            <p>xiao mi civi 4s </p>
            <p class="c">超级旗舰级</p>
            <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
        </div>
        <div class="box1"> <img
                src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                alt="">
            <p>xiao mi civi 4s </p>
            <p class="c">超级旗舰级</p>
            <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
        </div>
    </div>
    <div class="title">
        <h2>智能穿戴</h2>
        <ul class="more">
            <li>热门</li>
            <li>穿戴</li>
        </ul>
    </div>
    <div class="row">
        <img class="da" style="width:234px;height: 607px; "
            src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9895c56a7b792fb9053e3085fc261072.jpg?thumb=1&w=293&h=768&f=webp&q=90"
            alt="">
        <div class="brick">


            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="brick-item">
                <i class="bi bi-arrow-right-circle"></i>
                <a href="#">
                    浏览更多<br>
                    <span>热门</span>
                </a>
            </div>
        </div>
    </div>
    <div class="title">
        <h2>笔记本 | 平板</h2>
        <ul class="more">
            <li>热门</li>

        </ul>
    </div>
    <div class="row">
        <img class="da" style="width:234px;height: 607px; "
            src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9895c56a7b792fb9053e3085fc261072.jpg?thumb=1&w=293&h=768&f=webp&q=90"
            alt="">
        <div class="brick">


            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="birck">
                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e870129c5c374088bf7cc46be0b7ace2.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                    alt="">
                <p>xiao mi civi 4s </p>
                <p class="c">超级旗舰级</p>
                <p class="d">1799起<span style="color:#b0b0b0"><s> 2000元</s></span></p>
            </div>
            <div class="brick2">
                <div class="brick-item">
                    <a class="b" href="#">
                        Redmi显示器2.38英寸<br>
                        <span class="sb">599元</span>
                    </a>
                    <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7c37478d8b3b553ba0a50adaec2fc775.png?thumb=1&w=125&h=125&f=webp&q=90"
                        alt="">
                </div>
                <div class="brick-item">
                    <a href="#">
                        浏览更多<br>
                        <span>热门</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>`
  let str2 = `  <div class="title">
  <h2>视频</h2>
  <ul class="more">
      
      <li>查看更多</li>
  </ul>
</div>
  <ul class="watch">
<div class="mask"></div>
<li class="box">
  <img
    src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e74c4ff741bcdfc5b28a48a43e4edc6d.jpg?thumb=1&w=370&h=225&f=webp&q=90"
    alt="">
  <h3>2021年春季新品发布会</h3>
  <button data-src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/812358b69886e576c66a01f1f00affe9.mp4">播放</button>
</li>
<li class="box">
  <img
    src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/96563e75833ba4563bd469dd28203b09.jpg?thumb=1&w=370&h=225&f=webp&q=90"
    alt="">
  <h3>
    Redmi 10X系列发布会
  </h3>
  <button data-src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/11c70c96529b6e6938567ec1aa0910e0.mp4">播放</button>
</li>
<li class="box">
  <img
    src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/101b19aca4bb489bcef0f503e44ec866.jpg?thumb=1&w=370&h=225&f=webp&q=90"
    alt="">
  <h3>
    小米10 青春版 发布会
  </h3>
  <button data-src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cdabcaa763392c86b944eaf4e68d6a3.mp4">播放</button>
</li>
<li class="box">
  <img
    src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/2fd26bb99b723337a2f8eaba84f7d5bb.jpg?thumb=1&w=370&h=225&f=webp&q=90"
    alt="">
  <h3>
    小米10 8K手机拍大片
  </h3>
  <button data-src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e25d81c4922fca5ebe51877717ef9b76.mp4">播放</button>
</li>
<div class="video">
  <h3>2021年春季新品发布会</h3>
  <video src="" poster="" controls autoplay></video>
  <span class="close">X</span>
</div>
</ul>`
  let expand = document.createElement('div'),
    expand2 = document.createElement('div')
  expand2.innerHTML = str2
  expand.innerHTML = str
  const loadmore = function loadmore () {
    let allh = html.scrollHeight//整个页面可以滚动的高度
    //视窗滚动过去的高度+视窗的高度
    let h = html.scrollTop + html.clientHeight
    if (h + 1000 >= allh) {
      count++
      if (count >= 2) {//加载到三屏的时候，停止加载更多
        footed.appendChild(expand2)
        product()
        return
      }
      footed.appendChild(expand)
    }
    //回到顶部
    let top = function top () {
      let ce = document.querySelector('.cebian'),
        top = ce.querySelector('.item1'),
        slide = ce.querySelector('.slide')
      if (html.scrollTop > html.clientHeight) {
        slide.style.top = '15%'
        top.style.opacity = '1'
      }
      if (html.scrollTop < html.clientHeight) {
        slide.style.top = '30%'
        top.style.opacity = '0'
      }
    }
    top()

  }
  window.onscroll = loadmore

  let ce = document.querySelector('.cebian'),
    A = ce.querySelectorAll('img')
  A.forEach((item, index) => {
    item.onmouseenter = function () {
      switch (item.getAttribute('data-id')) {
        case '0':
          A[index].src = 'https://i8.mifile.cn/b2c-mimall-media/74c4fcb4475af8308e9a670db9c01fdf.png'
          break
        case '1':
          A[index].src = 'https://i8.mifile.cn/b2c-mimall-media/41f858550f42eb1770b97faf219ae215.png'
          break
        case '2':
          A[index].src = 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/95fbf0081a06eec7be4d35e277faeca0.png'
          break
        case '3':
          A[index].src = 'https://i8.mifile.cn/b2c-mimall-media/5e9f2b1b0da09ac3b3961378284ef2d4.png'
          break
        case '4':
          A[index].src = 'https://i8.mifile.cn/b2c-mimall-media/692a6c3b0a93a24f74a29c0f9d68ec71.png'
          break
        case '5':
          A[index].src = '//i1.mifile.cn/f/i/2018/home/totop_hover.png'
          break

      }
    }
    item.onmouseleave = function () {
      switch (item.getAttribute('data-id')) {
        case '0':
          A[index].src = 'https://i8.mifile.cn/b2c-mimall-media/98a23aae70f25798192693f21c4d4039.png'
          break
        case '1':
          A[index].src = 'https://i8.mifile.cn/b2c-mimall-media/55cad219421bee03a801775e7309b920.png'
          break
        case '2':
          A[index].src = 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/12eb0965ab33dc8e05870911b90f3f13.png'
          break
        case '3':
          A[index].src = 'https://i8.mifile.cn/b2c-mimall-media/4f036ae4d45002b2a6fb6756cedebf02.png'
          break
        case '4':
          A[index].src = 'https://i8.mifile.cn/b2c-mimall-media/d7db56d1d850113f016c95e289e36efa.png'
          break
        case '5':
          A[index].src = 'https://i1.mifile.cn/f/i/2018/home/totop.png'
          break

      }
    }
  })
})()

const product = function product () {
  let btn = Array.from(document.querySelectorAll('button')),
    mask = document.querySelector('.mask'),
    video = document.querySelector('.video'),
    close = video.querySelector('.close'),
    h3 = video.querySelector('h3'),
    dataSrc = null,
    H3 = null
  src = video.querySelector('video')
  btn.forEach((item => item.onclick = function () {
    dataSrc = this.getAttribute('data-src')
    H3 = this.previousElementSibling.innerText
    h3.innerHTML = H3
    video.style.display = 'flex'
    mask.style.display = 'block'
    src.src = `${dataSrc}`
  }))

  close.onclick = function () {
    video.style.display = 'none'
    mask.style.display = 'none'
    src.src = ``
  }
}


