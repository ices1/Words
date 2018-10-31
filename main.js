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
let tipsWrap = document.querySelector('.tips-wrap')

// let searchDomain = 'https://vps.iceeweb.com:10002'
let searchDomain = 'http://vps.iceeweb.com:10001'
let active


// import {pullStore, pushStore} from './store.js'


// 初始化 store 到 Dom
// let pullStore = JSON.parse(localStorage.getItem('words')) || {}

// 测试 样本用例 store
let pullStore = JSON.parse(localStorage.getItem('words')) || {You: "r",
api: "r",badge: "r",bit: "r",button: "r",class: "r",content: "r",crossorigin: "l",
div: "f",js: "l",justify: "r",latest: "r",li: "l",link: "f",message: "l",meta: "l",
msg: "r",name: "l",nodejs: "r",org: "f",script: "l",static: "l",text: "r",xl: "l"}


// 更新 Dom 元素 到 Store
let pushStore = (word, status) => {
  let store = JSON.parse(localStorage.getItem('words')) || {}
  store[word] = status
  localStorage.setItem('words', JSON.stringify(store))
}
let delStore = (word) => {
  console.log(word)
  let store = JSON.parse(localStorage.getItem('words')) || {}
  console.log(store)
  delete store[word]
  localStorage.setItem('words', JSON.stringify(store))
  console.log(store)
}
console.log(0000, pullStore)
// console.log(pushStore)
// ---------------------//----------------

// 初始化 sotre列 dom
;(() => {
  let storeObj = storeCat()
  console.log(111111111,storeObj)
  updataStoreToDom(storeObj)
  document.querySelector('.tips-cnt').classList.add('tips-cnt-show')
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
  'to-forgot': removeItem.bind(null, 'to-forgot'),
  'to-a-little': removeItem.bind(null, 'to-a-little'),
  'to-remember': removeItem.bind(null, 'to-remember'),
}

// 监听全局点击事件
words.addEventListener('click', e => {
  let className = e.target.classList[0]

  // debugger
  if (active[className]) {
    active[className](e.target)
  }
})

searchBtn.addEventListener('click', e => {
  getData()
})
inputUrl.addEventListener('keyup', e => {
  // console.log(e.keyCode)
  if (e.keyCode === 13) {
    getData()
  }
})
tipsWrap.addEventListener('click', e => {
  
  let flag = document.querySelector('.tips-cnt-show')
  console.log(flag)
  if (!flag) {
    document.querySelector('.tips-cnt').classList.add('tips-cnt-show')
  } else {
    document.querySelector('.tips-cnt').classList.remove('tips-cnt-show')
  }
})


words.addEventListener('dblclick', e => {
  let item = e.target
  // console.log(e.target)

  if (item.className === 'word-item') {
    // 双击删除 item，添加样式动画
    item.parentNode.classList.add('remove-item')
    delStore(item.innerText)
    setTimeout(() => {
      item.parentNode.parentNode.removeChild(item.parentNode)
    }, 200);
  }
})

// 点击 searchBtn 获取数据 
async function  getData() {
  let frequency = []
  let url = inputUrl.value
  let words, data
  console.log(searchDomain + '/?q=' + url)

  // await axios.get('http://localhost:10001/?q=' + 'http://localhost:8080/')
  await axios.get(searchDomain + '/?q=' + url)
    .then((res) => {
      if (res.data.status === 'failed') {
        console.log(res)
        document.getElementsByClassName('message')[0].classList.add('message-show')
        document.getElementsByClassName('message')[0].innerText = res.data.msg
        document.getElementsByClassName('message')[0].style.color = 'red'
      } else {
        console.log(res)
        wordSort(res.data)
      }
    })
    .catch(err => {
      console.log(err)
    })

  // 测试代码
  // let data = { words: 3, book: 5, eat: 1,words: 3, books: 5, ate: 1,word: 3, hi: 5, you: 1,me: 3, about: 5, and: 1, sleep: 3,sheep:8,dict:7 }
}

function wordSort(data) {

  // 拦截 以 过滤 存在 words
  let pureWords = filterWords(data)
  
  words = Object.keys(pureWords).sort((a, b) => pureWords[b] - pureWords[a])
  frequency = words.map(x => pureWords[x])

  console.log([words, frequency])
  appendDom([words, frequency])
}

// 获取数据后对比 本地 过滤
function filterWords(words) {
  // debugger
  // 对照记录
  let reps = {f:0, l: 0, r: 0}
  let count = 0
  let rawCount = 0
  let obj ={}
  for(let i in words) {
    rawCount++
    let it = pullStore[i]
    if(it) {
      reps[it]++
      count++
    } else {
      obj[i] = words[i]
    }
  }

  let = sugTmp = ["Come on...", "Keep going...", "That's Good", "Wow, It's Great!", "That's Awsome 0_0 "]
  let rate = 100 * count / rawCount
  console.log(2222222222,reps)
  document.getElementsByClassName('')
  document.getElementsByClassName('raw-words')[0].innerText = rawCount
  document.getElementsByClassName('total-words')[0].innerText = count
  document.getElementsByClassName('forgot-words')[0].innerText = reps.f
  document.getElementsByClassName('a-bit-words')[0].innerText = reps.l
  document.getElementsByClassName('remember-words')[0].innerText = reps.r
  document.getElementsByClassName('total-rate')[0].innerText = rate.toFixed(2)
  document.getElementsByClassName('msg-sug')[0].innerText = sugTmp[(rate / 20.01 |0)]
  document.getElementsByClassName('message')[0].classList.add('message-show')

  // console.log('objjjjjjjjj',obj)
  return obj
}

// 动态生成 dom 加入 url
function appendDom(dict) {
  let s = ''

  for (let i = 0, len = dict[0].length; i < len; i++) {

    // if (dict[0][i] in store) continue

    s += `<li class="list-group-item d-flex justify-content-between align-items-center">
            <strong class='word-item'>${dict[0][i]}</strong>
            <span class="to-forgot cat-word rpos3">F</span>
            <span class="to-a-little cat-word rpos2">L</span>
            <span class="to-remember cat-word rpos1">R</span>
            <span class="badge badge-primary badge-pill">${dict[1][i]}</span></li>`
          }
          // <span class="badge badge-primary badge-pill to-forgot cat-word">F</span>
          
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
  el.parentNode.classList.add('remove-item')
  setTimeout(() => {
    el.parentNode.parentNode.removeChild(el.parentNode)
  }, 200);

  // leftOne = oper == 'to-forgot' ? 'L' : 'F'
  // rightOne = oper == 'to-remember' ? 'L' : 'R'
  // toEl = oper == 'to-forgot' ? listForgot : toEl
  // toEl = oper == 'to-a-little' ? listALittle : toEl
  // toEl = oper == 'to-remember' ? listRemember : toEl


  toEl.innerHTML += word2html(word, leftCls, leftOne, rightCls, rightOne)

}

function word2html(word, leftCls, leftOne, rightCls, rightOne) {
  return `<li class="list-group-item d-flex justify-content-between align-items-center">
    <strong class='word-item'>${word}</strong>
    <span class="${leftCls} cat-word pos2 ">${leftOne}</span>
    <span class="${rightCls} cat-word pos1">${rightOne}</span></li>`
  }
  // <span class="badge badge-primary badge-pill ${leftCls} cat-word">${leftOne}</span>
  // <span class="badge badge-primary badge-pill ${rightCls} cat-word">${rightOne}</span></li>`

// banner tips
document.getElementsByClassName('banner')[0].innerHTML = 
   ['English Opens New Career Opportunities',
  'English is the essential Language of the Internet',
  'Learning English Can Make You Smarter',
  'English Makes Your Life More Entertaining'][Date.now() % 4]
