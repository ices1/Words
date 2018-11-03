// axios 获取 数据 
async function balloons(el, desc) {
  let cnt, isGot

  isGot = el.getAttribute('data-balloon')
  if (!isGot) {
    cnt = await axios.get('/api/' + desc)
      .then(res => res.data.translation || '@_@__')
      .catch(err => err)
      el.setAttribute('data-balloon', cnt)
      el.setAttribute('data-balloon-length', 'fit')
  } 
  return ''
}

// 删除 word-item 已加载数据
function rmWordsTfOnline() {
  document.querySelectorAll('.list-group-item').forEach(i => {
    i.removeAttribute('data-balloon')
    i.removeAttribute('data-balloon-length')
  })
}

// 通过使用 debounce 加载数据(节流)
let byDebounceGet = debounce((e) => {
  if (localStorage.getItem('tfOnline')) {
    // balloons 翻译
    let el = e.target
    if (el.classList[0] === 'word-item') {
      // console.log(e.target)
      // console.log(el)
      balloons(el.parentNode, el.innerText)
    }
  }
}, 200)

// 根据 开关状态 判断是否需要监听 words-item
function isListenerWordsItem(isTfOnline, words) {
  if (isTfOnline) {

    // console.log('add')
    words.addEventListener('mouseover', byDebounceGet)
  } else {
    // console.log('rm')
    rmWordsTfOnline()
    words.removeEventListener('mouseover', byDebounceGet)
  }
}
function debounce(fn, delay) {
  // 定时器，用来 setTimeout
  let timer
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    let context = this
    let args = arguments
    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)
    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

export{
  balloons,
  debounce,
  byDebounceGet,
  isListenerWordsItem
}
