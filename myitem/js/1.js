
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
            b.style.backgroundImage = "url(./dtlb/img/d" + [index] + ".jpg)"
            if (index == 5) {
                index = 0
            }
        }, 1500)
    }
    for (let i = 0; i < d.length; i++) {
        d[i].onmouseover = function () {
            b.style.backgroundImage = "url(./dtlb/img/d" + [i + 1] + ".jpg)"

            a()
            clearInterval(time)
            index = i + 1
            ts()
        }
    }
    ts()
