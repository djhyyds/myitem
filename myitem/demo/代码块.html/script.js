(function () {
  
  let li = Array.from(document.querySelectorAll('.li')),
    pre = Array.from(document.querySelectorAll('pre'))
  li.forEach((item, index) => {
    item.onclick = () => {
      pre.forEach(item => item.style.display = 'none')
      li.forEach(item => item.style.background = 'rgb(62, 132, 244)')
      pre[index].style.display = 'block'
      item.style.background = 'linear-gradient(200deg, #ec77ab, #7873f5)'
    }
  })
})()