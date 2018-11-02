
// banner tips 随机推送
function bannerMsg() {
    let pos = Date.now() % 4
    let say = ['English Opens New Career Opportunities',
    'English is the essential Language of the Internet',
    'Learning English Can Make You Smarter',
    'English Makes Your Life More Entertaining']

    document.getElementsByClassName('banner')[0].innerHTML = say[pos]
    console.log('ererything is ok...')
}

// 发送 单词成绩
function scoreMsg(rawCount, count, h, m, e) {
  let sugTmp = ["Come on...", "Keep going...", "That's Good", "Wow, It's Great!", "That's Awsome 0_0 "]
  let paseRate = 100 * count / rawCount

  document.getElementsByClassName('raw-words')[0].innerText = rawCount
  document.getElementsByClassName('total-words')[0].innerText = count
  document.getElementsByClassName('forgot-words')[0].innerText = h
  document.getElementsByClassName('a-bit-words')[0].innerText = m
  document.getElementsByClassName('remember-words')[0].innerText = e
  document.getElementsByClassName('total-rate')[0].innerText = paseRate.toFixed(2)
  document.getElementsByClassName('msg-sug')[0].innerText = sugTmp[(paseRate / 20.01 |0)]
  document.getElementsByClassName('message')[0].classList.add('message-show')
}
// 发送 单词获取失败时 信息
function netWorkError() {
  let msg = 'Request server response failed, please check the link entered below'

  document.getElementsByClassName('message')[0].classList.add('message-show')
  document.getElementsByClassName('message')[0].innerText = msg
  document.getElementsByClassName('message')[0].style.color = 'red'
}
// 常规输出
export {
    bannerMsg,
    scoreMsg,
    netWorkError
}