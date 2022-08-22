window.addEventListener('load', function () {
  let play_pause = document.querySelector('.play-pause'),
    player_track = document.querySelector('.player-track'),
    album_cover = document.querySelector('.album-cover'),
    bg = document.querySelector('.bg'),
    album_name = document.querySelector('.album-name'),
    track_name = document.querySelector('.track-name'),
    track_time = document.querySelector('.track-time'),
    current_time = document.querySelector('.current-time'),
    total_time = document.querySelector('.total-time'),
    progress_box = document.querySelector('.progress-box'),
    hover_time = document.querySelector('.hover-time'),
    hover_bar = document.querySelector('.hover-bar'),
    progress_bar = document.querySelector('.progress-bar'),
    play_prev = document.querySelector('.play-prev'),
    play_next = document.querySelector('.play-next'),
    liList = document.querySelectorAll('li')

  let album = ['稻香', '再见莫妮卡', '天下', '小城夏天', '给你一瓶魔法药水', '发如雪']
  let track_names = ['稻香-周杰伦', '彭席彦-再见莫妮卡', '张杰-天下', '比利-小城夏天',
    '告五人-给你一瓶魔法药水', '发如雪-周杰伦']

  let progress_t,//鼠标在进度条悬停位置
    progress_loc,//鼠标在进度条悬停音频位置
    c_m,// 分钟
    ct_minutes,//播放位置分
    ct_seconds,//秒
    cur_minutes,//当前播放分
    cur_seconds,//秒
    dur_minutes,//总时长分
    dur_seconds,//秒
    play_progress//播放进度
  //当前歌曲下标
  let cur_index = -1
  //初始化
  function initPlayer () {
    audio = new Audio()
    audio.loop = false
    selectTrack(0)
    play_pause.addEventListener('click', playPause)
    progress_box.addEventListener('mousemove', function (e) {
      showHover(e)
    })
    progress_box.addEventListener('mouseout', hideHover)
    progress_box.addEventListener('click', playFromClickedPos)
    audio.addEventListener('timeupdate', updateCurTime)
    play_prev.addEventListener('click', function () {
      selectTrack(-1)
    })
    play_next.addEventListener('click', function () {
      selectTrack(1)
    })
  }


  //播放暂停
  function playPause () {
    setTimeout(function () {
      if (audio.paused) {
        player_track.classList.add('active')
        play_pause.querySelector('.fa').classList = 'fa fa-pause'
        album_cover.classList.add('active')
        audio.play()
      } else {
        player_track.classList.remove('active')
        play_pause.querySelector('.fa').classList = 'fa fa-play'
        album_cover.classList.remove('active')
        audio.pause()
      }
    }, 300)
  }

  play_pause.addEventListener('click', playPause)
  function showHover (e) {
    //计算鼠标在进度条悬停的位置
    progress_t = e.clientX - progress_box.getBoundingClientRect().left
    //audio.duration 音频总时长
    progress_loc = audio.duration * (progress_t / progress_box.
      getBoundingClientRect().width)
    //设置悬停进度条宽度
    hover_bar.style.width = progress_t + 'px'
    //将悬停位置转为分种
    c_m = progress_loc / 60
    ct_minutes = Math.floor(c_m)
    ct_seconds = Math.floor(progress_loc - ct_minutes * 60)

    if (ct_minutes < 10) {
      ct_minutes = '0' + ct_minutes
    }
    if (ct_seconds < 10) {
      ct_seconds = '0' + ct_seconds
    }
    if (isNaN(ct_minutes) || isNaN(ct_seconds)) {
      hover_time.innerText = '--:--'
    } else {
      hover_time.innerText = ct_minutes + ':' + ct_seconds
    }
    //设置悬停播放位置弹层的位置并显示
    hover_time.style.left = progress_t + 'px'
    hover_time.style.marginLeft = '-20px'
    hover_time.style.display = 'block'
  }
  function hideHover () {
    hover_bar.style.width = '0px'
    hover_time.innerText = '00:00'
    hover_time.style.left = '0px'
    hover_time.style.marginLeft = '0px'
    hover_time.style.display = 'none'
  }

  function playFromClickedPos () {
    //设置当前播放位置
    audio.currentTime = progress_loc
    //设置进度条宽度
    progress_bar.style.width = progress_t + 'px'
    hideHover()
  }



  function updateCurTime () {
    //分
    cur_minutes = Math.floor(audio.currentTime / 60)
    //当前播放时间秒
    cur_seconds = Math.floor(audio.currentTime - cur_minutes * 60)
    //分
    dur_minutes = Math.floor(audio.duration / 60)
    //音频总时长秒
    dur_seconds = Math.floor(audio.duration - dur_minutes * 60)
    //计算播放进度
    play_progress = audio.currentTime / audio.duration * 100

    if (cur_minutes < 10) {
      cur_minutes = '0' + cur_minutes
    }
    if (cur_seconds < 10) {
      cur_seconds = '0' + cur_seconds
    }
    if (dur_minutes < 10) {
      dur_minutes = '0' + dur_minutes
    }
    if (dur_seconds < 10) {
      dur_seconds = '0' + dur_seconds
    }
    //设置播放时间

    if (isNaN(cur_minutes) || isNaN(cur_seconds)) {
      current_time.innerText = '00:00'
    } else {
      current_time.innerText = cur_minutes + ':' + cur_seconds
    }

    //设置总时长
    if (isNaN(dur_minutes) || isNaN(dur_seconds)) {
      total_time.innerText = '00:00'
    } else {
      total_time.innerText = dur_minutes + ':' + dur_seconds
    }
    progress_bar.style.width = play_progress + '%'
    if (play_progress == 100) {
      play_pause.querySelector('.fa').classList = 'fa fa-play'
      progress_bar.style.width = '0px'
      current_time.innerText = '00:00'
      player_track.classList.remove('active')
      album_cover.classList.remove('active')
    }
  }
  //切换歌曲 flag 0 初始 1下一首 -1 上一首
  function selectTrack (flag) {
    if (flag == 0 || flag == 1) {
      ++cur_index
    } else {
      --cur_index
    }
    if (cur_index > -1 && cur_index < album.length) {


      if (flag == 0) {
        play_pause.querySelector('.fa').classList = 'fa fa-play'

      } else {
        play_pause.querySelector('.fa').classList = 'fa fa-pause'
      }
      progress_bar.style.width = '0px'
      current_time.innerText = '00:00'
      total_time.innerText = '00:00'
      //当前专辑名
      let cur_album = album[cur_index]
      //当前歌曲信息
      let cur_track_name = track_names[cur_index]
      //设置音频路径
      let data_src
      liList.forEach(li => {

        let Src = li.getAttribute('date-src')
        console.log(li.innerText, cur_album, '/', Src, li, li.innerText == cur_album)
        if (li.innerText == cur_album) data_src = Src
      })
      audio.src = data_src
      console.log(data_src)
      if (flag != 0) {
        //当切换歌曲时自动播放
        audio.play()
        player_track.classList.add('active')
        album_cover.classList.add('active')
      }
      //设置专辑名
      album_name.innerText = cur_album
      //设置歌曲信息
      track_name.innerText = cur_track_name
      //设置封面
      album_cover.querySelector('.active').classList.remove('active')
      album_cover.getElementsByTagName('img')[cur_index].classList.add('active')
      //将封面设置为背景大图
      bg.style.backgroundImage = 'url(' + album_cover.getElementsByTagName('img')[cur_index].
        getAttribute('src') + ')'
      console.log(bg.style.backgroundImage)
    } else {
      //
      if (flag == 0 || flag == 1) {
        --cur_index
      } else {
        ++cur_index
      }
    }

  }

  initPlayer()
})