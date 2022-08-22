
let wrapper = document.querySelector('.wrapper')
// step:控制当前展示哪一个  autoTimer:自动轮播定时器
let step = 0,
    autoTimer = null,
    zIndex = 0
let source = Array.from(document.querySelectorAll('.slide'))

// 数据渲染  inital=true是第一次渲染
const render = function render (inital) {
    len = source.length
    // 控制slide的样式
    let temp1 = step - 2,
        temp2 = step - 1,
        temp3 = step,
        temp4 = step + 1,
        temp5 = step + 2
    if (temp1 < 0) temp1 = len + temp1
    if (temp2 < 0) temp2 = len + temp2
    if (temp4 > len - 1) temp4 = temp4 - len
    if (temp5 > len - 1) temp5 = temp5 - len
    source.forEach((item, index) => {
        let transform = 'translate(-50%, -50%) scale(0.65)',
            className = 'slide'
        if (zIndex > 6) return
        zIndex++
        switch (index) {
            case temp3:
                transform = 'translate(-50%, -50%) scale(1)'
                zIndex = 3
                className = 'slide active'
                break
            case temp1:
                transform = 'translate(-195%, -50%) scale(0.7)'
                zIndex = 1
                break
            case temp2:
                transform = 'translate(-130%, -50%) scale(0.85)'
                zIndex = 2
                break
            case temp4:
                transform = 'translate(30%, -50%) scale(0.85)'
                zIndex = 2
                break
            case temp5:
                transform = 'translate(95%, -50%) scale(0.7)'
                zIndex = 1
                break
        }
        item.sty = `transform:${transform};z-index:${zIndex};`
        item.className = className
    })

    // 非第一次执行，修改slide样式
    if (!inital) {
        source.forEach((item, index) => {
            let cur = slides[index]
            cur.style = item.sty
            cur.className = item.className
        })
        return
    }

    // 数据绑定
    slides = wrapper.querySelectorAll('.slide')
}

// 自动轮播
const autoMove = function autoMove () {
    autoTimer = setInterval(() => {
        step++
        if (step <= 0) step = 0
        render()
    }, 1500)
}
// 数据渲染
render(true)
// 开启自动轮播
autoMove()


// 插件封装
// 1. 我么要明确需求：默认的功能、以及后续支持的所有功能
// 2. 编写API文档：配置项
//   + 可扩展、方便升级 
//   + 规则校验
//   + 默认配置项 -> 用户传递配置项（合并处理）
//   + ...
// 3. 样式/JS如何导入
// 4. 自定义扩展项:二次开发
// 5. 强大的属性和周期函数
// 6. 性能和易用性
// ......  20K+