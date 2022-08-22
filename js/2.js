let img = document.querySelector('.gensui')
let deg = 0;
let imgx = 0;
let imgy = 0;
let imgl = 0;
let imgt = 0;
let y = 0;
let index1 = 0;
let scrollTop = 0
window.addEventListener('mousemove', move)
function move(xyz) {
    imgx = xyz.x - img.offsetLeft - img.clientWidth / 2
    imgy = xyz.pageY - img.offsetTop - img.clientHeight / 2
    deg = 360 * Math.atan(imgy / imgx) / (2 * Math.PI)
    index1 = 0;
    let x = event.clientX;
    if (img.offsetLeft < x) {
        y = -180
    } else {
        y = 0;
    }
}
setInterval(() => {
    img.style.transform = "rotateZ(" + deg + "deg)rotateY(" + y + "deg)"
    index1++
    if (index1 < 50) {
        imgl += imgx / 50
        imgt += imgy / 50
    }
    img.style.left = imgl + "px";
    img.style.top = imgt + "px";
}, 30)
var IframeOnClick = {
    resolution: 200,
    iframes: [],
    interval: null,
    Iframe: function () {
        this.element = arguments[0];
        this.cb = arguments[1];
        this.hasTracked = false;
    },
    track: function (element, cb) {
        this.iframes.push(new this.Iframe(element, cb));
        if (!this.interval) {
            var _this = this;
            this.interval = setInterval(function () {
                _this.checkClick();
            }, this.resolution);
        }
    },

    checkClick: function () {
        if (document.activeElement) {
            var activeElement = document.activeElement;
            for (var i in this.iframes) {
                if (activeElement === this.iframes[i].element) { // user is in this Iframe  
                    if (this.iframes[i].hasTracked == false) {
                        this.iframes[i].cb.apply(window, []);
                        this.iframes[i].hasTracked = true;
                    }
                } else {
                    this.iframes[i].hasTracked = false;
                }
            }
        }
    }
}
IframeOnClick.track(document.getElementById("iFrame"), function () {
    // alert('a click');
    iFrame.src = "//music.163.com/outchain/player?type=2&id=5044899&auto=1&height=32"
    iFrame.className = '';
});

let b = document.querySelector('.b')
let d = document.getElementsByClassName('d')
let time
let index = 0
let a = function () {
    for (let i = 0; i < d.length; i++) {
        d[i].className = 'd'
    }
}
let aa = function () {
    a()
    d[index].className = 'd dd'
}

function ts() {
    time = setInterval(function () {
        aa()
        index++
        b.style.backgroundImage = "url(./demo/dtlb/img/d" + [index] + ".jpg)"
        if (index == 5) {
            index = 0
        }
    }, 1500)
}
for (let i = 0; i < d.length; i++) {
    d[i].onmouseover = function () {
        b.style.backgroundImage = "url(./demo/dtlb/img/d" + [i + 1] + ".jpg)"

        a()
        clearInterval(time)
        index = i + 1
        ts()
    }
}
ts()
//鼠标跟随
function offsetToBody(el) {
    let x = 0
    let y = 0
    while (el) {
        x += el.offsetLeft
        y += el.offsetTop
        el = el.offsetParent
    }
    return {
        x,
        y
    }
}
document.addEventListener('mousemove', e => {
    const item = document.querySelectorAll(".item")
    let box = document.querySelector('.shell1')
    const mouseX = e.pageX
    const mouseY = e.pageY
    item.forEach(sqr => {
        const obj = offsetToBody(sqr)
        const sqrX = obj.x
        const sqrY = obj.y
        const diffX = mouseX - sqrX
        const diffY = mouseY - sqrY
        const radians = Math.atan2(diffY, diffX)
        const angle = radians * 180 / Math.PI
        sqr.style.transform = `rotate(${angle}deg)`
    })
})