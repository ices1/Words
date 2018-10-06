
// let stroe = require ('./saveToLocalStore.js')

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
let render
let active

// let store = localStorage.getItem('words') || []

active = {
    'search-btn': getData,
    'to-forgot': removeItem.bind(null, 'to-forgot'),
    'to-a-little': removeItem.bind(null, 'to-a-little'),
    'to-remember': removeItem.bind(null, 'to-remember'),
}

// 监听全局点击事件
words.addEventListener('click', e => {
    // debugger
    console.log(e.target)
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

    console.log(url)

    jsonp(url, data => {
        let words

        // 过滤 数字、空格等  
        // res = filterWords(data)

        words = Object.keys(data).sort((a, b) => data[b] - data[a])

        frequency = words.map(x => data[x])

        console.log([words, frequency])
        appendDom([words, frequency])
    })

}

// 动态生成 dom 加入 url
function appendDom(dict) {
    let s = ''

    for(let i = 0, len = dict[0].length ; i < len; i++) {

        // if (dict[0][i] in store) continue
            
        s +=  `<li class="list-group-item d-flex justify-content-between align-items-center">
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
    debugger
    console.log('moving...')

    if(oper == 'to-forgot') {
        [leftOne, rightOne, toEl, leftCls, rightCls] = 
        ['L', 'R', listForgot, 'to-a-little', 'to-remember']
        
        // leftOne = 'L'
        // rightOne = 'R'
        // leftCls = 'to-a-little'
        
        // toEl = listForgot
    } else if(oper == 'to-a-little') {
        [leftOne, rightOne, toEl, leftCls, rightCls] = 
        ['F', 'R', listALittle, 'to-forgot', 'to-remember']

        // leftOne = 'L'
        // rightOne = 'R'
        // toEl = listALittle
    } else if(oper == 'to-remember') {
        [leftOne, rightOne, toEl, leftCls, rightCls] = 
        ['F', 'L', listRemember, 'to-forgot', 'to-a-little']

        // leftOne = 'L'
        // rightOne = 'R'
        // toEl = listRemember
    }

    word = el.parentNode.children[0].innerText
    el.parentNode.parentNode.removeChild(el.parentNode)

    // leftOne = oper == 'to-forgot' ? 'L' : 'F'
    // rightOne = oper == 'to-remember' ? 'L' : 'R'
    // toEl = oper == 'to-forgot' ? listForgot : toEl
    // toEl = oper == 'to-a-little' ? listALittle : toEl
    // toEl = oper == 'to-remember' ? listRemember : toEl

    s = `<li class="list-group-item d-flex justify-content-between align-items-center">
    <strong>${word}</strong>
    <span class="badge badge-primary badge-pill ${leftCls}">${leftOne}</span>
    <span class="badge badge-primary badge-pill ${rightCls}">${rightOne}</span></li>`

    toEl.innerHTML = toEl.innerHTML + s

}


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