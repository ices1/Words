let searchBtn = document.querySelector('#search-btn')
let words = document.querySelector('#words')
let inputUrl = document.querySelector('.input-url')
let listRes = document.querySelector('.list-res')
let listForgot = document.querySelector('.list-forgot')
let listALittle = document.querySelector('.list-a-little')
let listRemember = document.querySelector('.list-remember')
let toForgot = document.querySelector('.to-forgot')
let toALittle = document.querySelector('.to-a-little')
let toRemember = document.querySelector('.to-remember')

let searchDomain = 'https://vps.iceeweb.com:10002'
let active


// import {pullStore, pushStore} from './store.js'


// 初始化 store 到 Dom
let pullStore = JSON.parse(localStorage.getItem('words')) || {}

// 更新 Dom 元素 到 Store
let pushStore = (word, status) => {
  let store = JSON.parse(localStorage.getItem('words')) || {}
  store[word] = status
  localStorage.setItem('words', JSON.stringify(store))
}
console.log(0000, pullStore)
// console.log(pushStore)
// ---------------------//----------------

// 初始化 sotre列 dom
;(() => {
  let storeObj = storeCat()
  console.log(111111111,storeObj)
  updataStoreToDom(storeObj)
})()

// sotre 分类 函数
function storeCat() {
  let words = pullStore
  let forList = []
  let litList = []
  let remList = []
  
  for (let it in words) {
    let cat = words[it]
    if (cat === 'f') {
      forList.push(it)
    } else if (cat === 'l') {
      litList.push(it)
    } else {
      remList.push(it)
    }
  }
  return { forList, litList, remList }
}

// 调用 Store 更新到 Dom 函数
function updataStoreToDom(obj) {
  for (let kind in obj) {
    switch (kind) {
      case 'litList':
        // [leftCls, leftOne, rightCls, rightOne] = ['to-forgot', 'F', 'to-remember', 'R']
        render(listALittle, obj[kind], 'to-forgot', 'F', 'to-remember', 'R')
        break
      case 'forList':
        // [leftCls, leftOne, rightCls, rightOne] = ['to-a-little', 'L', 'to-remember', 'R']
        render(listForgot, obj[kind], 'to-a-little', 'L', 'to-remember', 'R')
        break
      case 'remList':
        // [leftCls, leftOrightOnene, rightCls, ] = ['to-forgot', 'F', 'to-a-little', 'L']
        render(listRemember, obj[kind], 'to-forgot', 'F', 'to-a-little', 'L')
        break
    }
  }
}

// render 更新 Dom 函数
function render (el, ary, leftCls, leftOne, rightCls, rightOne) {
  el.innerHTML = ary.reduce((tmp, it) => {
    return tmp + word2html(it, leftCls, leftOne, rightCls, rightOne)
  }, '')
}




active = {
  'search-btn': getData,
  'to-forgot': removeItem.bind(null, 'to-forgot'),
  'to-a-little': removeItem.bind(null, 'to-a-little'),
  'to-remember': removeItem.bind(null, 'to-remember'),
}

// 监听全局点击事件
words.addEventListener('click', e => {
  // debugger
  // console.log(e.target)
  let idName = e.target.id
  let className = e.target.classList[3]

  // debugger
  if (active[idName]) {
    active[idName](e.target)
  } else if (active[className]) {
    active[className](e.target)
  }
  // active[clsName](e.target)

})

// 点击 searchBtn 获取数据 
function getData() {
  let frequency = []
  let url = inputUrl.value

  // 测试代码
  let words
  let data = { words: 3, book: 5, eat: 1,words: 3, books: 5, ate: 1,word: 3, hi: 5, you: 1,me: 3, about: 5, and: 1, sleep: 3,sheep:8,dict:7 }
  words = Object.keys(data).sort((a, b) => data[b] - data[a])

  frequency = words.map(x => data[x])
  console.log([words, frequency])
  appendDom([words, frequency])

  // 暂时以固定 data测试代码
  // let url = inputUrl.value

  // jsonp(url, data => {
  //     let frequency = [] 
  //     let words, res

  //     // 过滤 数字、空格等  
  //     // res = filterWords(data)

  //     words = Object.keys(data).sort((a, b) => data[b] - data[a])

  //     frequency = words.map(x => data[x])

  //     console.log([words, frequency])
  //     appendDom([words, frequency])
  // })

  // 拦截 以存在 words
  filterWords(data)
}

// 获取数据后对比 本地 过滤
function filterWords(words) {
  debugger
  let reps = {f:0, l: 0, r: 0}
  for(let i in words) {
    let it = pullStore[i]
    if(it) {
      reps[it]++
    }
  }
  console.log(2222222222,reps)
}

// 动态生成 dom 加入 url
function appendDom(dict) {
  let s = ''

  for (let i = 0, len = dict[0].length; i < len; i++) {

    // if (dict[0][i] in store) continue

    s += `<li class="list-group-item d-flex justify-content-between align-items-center">
            <strong>${dict[0][i]}</strong>
            <span class="badge badge-primary badge-pill to-forgot">F</span>
            <span class="badge badge-primary badge-pill to-a-little">L</span>
            <span class="badge badge-primary badge-pill to-remember">R</span>
            <span class="badge badge-primary badge-pill">${dict[1][i]}</span></li>`
  }

  listRes.innerHTML = s

}

function removeItem(oper, el) {
  let word, leftOne, rightOne, toEl, leftCls, rightCls
  // debugger
  console.log('moving...')

  if (oper == 'to-forgot') {
    [leftOne, rightOne, toEl, leftCls, rightCls] = ['L', 'R', listForgot, 'to-a-little', 'to-remember']

    // 更新到 store
    pushStore(el.parentNode.children[0].innerText, 'f')
  } else if (oper == 'to-a-little') {
    [leftOne, rightOne, toEl, leftCls, rightCls] = ['F', 'R', listALittle, 'to-forgot', 'to-remember']

    // 更新到 store
    pushStore(el.parentNode.children[0].innerText, 'l')
  } else if (oper == 'to-remember') {
    [leftOne, rightOne, toEl, leftCls, rightCls] = ['F', 'L', listRemember, 'to-forgot', 'to-a-little']

    // 更新到 store
    pushStore(el.parentNode.children[0].innerText, 'r')
  }

  word = el.parentNode.children[0].innerText
  el.parentNode.parentNode.removeChild(el.parentNode)

  // leftOne = oper == 'to-forgot' ? 'L' : 'F'
  // rightOne = oper == 'to-remember' ? 'L' : 'R'
  // toEl = oper == 'to-forgot' ? listForgot : toEl
  // toEl = oper == 'to-a-little' ? listALittle : toEl
  // toEl = oper == 'to-remember' ? listRemember : toEl


  toEl.innerHTML += word2html(word, leftCls, leftOne, rightCls, rightOne)

}

function word2html(word, leftCls, leftOne, rightCls, rightOne) {
  return `<li class="list-group-item d-flex justify-content-between align-items-center">
    <strong>${word}</strong>
    <span class="badge badge-primary badge-pill ${leftCls}">${leftOne}</span>
    <span class="badge badge-primary badge-pill ${rightCls}">${rightOne}</span></li>`
}

// banner tips
document.getElementsByClassName('banner')[0].innerHTML = 
   ['English Opens New Career Opportunities',
  'English is the essential Language of the Internet',
  'Learning English Can Make You Smarter',
  'English Makes Your Life More Entertaining'][Date.now() % 4]


console.log(document.getElementsByClassName('banner').innerHTML)

// jsonp 封装
function jsonp(inpUrl, callback) {
  // 随机生成全局属性名
  let callbackName = '_JSONP_' + Math.random().toString(32).slice(2)

  // 配置url

  // http://vps.iceeweb.com:10001/?q=https://github.com/ices1?tab=repositories
  url = searchDomain + '/?q=' + inpUrl + '&callback=' + callbackName

  // 函数指向,删除全局变量,删除script标签
  window[callbackName] = data => {
    callback(data)
    delete window[callbackName]
    tag.parentNode.removeChild(tag)
  }

  // 创建 script 并加入body 
  let tag = document.createElement('script')
  tag.src = url
  document.body.appendChild(tag)
}