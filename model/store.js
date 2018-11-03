// 测试 样本用例 store
let pullStore = (function(){
  let store, catchSt, tmp

  tmp = {You: "E", api: "E",badge: "E",bit: "E",button: "E",class: "E", crossorigin: "M",
  div: "H",js: "M",justify: "E",latest: "E",li: "M",link: "H",message: "M",meta: "M",
  msg: "E",name: "M",nodejs: "E",org: "H",script: "M",static: "M",text: "E",xl: "M"}

  catchSt = JSON.parse(localStorage.getItem('words'))

  if (!catchSt) {
    store = tmp
    localStorage.setItem('words', JSON.stringify(store))
  } else {
    store = catchSt
  }

  return store
})()


// 更新 Dom 元素 到 Store
let pushStore = (word, status) => {
  let store = JSON.parse(localStorage.getItem('words')) || {}
  store[word] = status
  localStorage.setItem('words', JSON.stringify(store))
}

// 更新 Store 删除 item 
let delStore = (word) => {
  // console.log(word)
  let store = JSON.parse(localStorage.getItem('words')) || {}
  console.log(store)
  delete store[word]
  localStorage.setItem('words', JSON.stringify(store))
  // console.log(store)
}

let pulltfOnline = () => {
  let init = localStorage.getItem('tfOnline')
  if (init) {
    return init
  } else {
    localStorage.setItem('tfOnline', 'true')
    return 'true'
  }
}


let changetfOnline = (chk) => {
    if (chk.checked) {
      localStorage.setItem('tfOnline', 'true')
      // console.log('on')
    } else {
      localStorage.setItem('tfOnline', 'false')
      // console.log('off')
    }
}


export {
    pullStore,
    pushStore,
    delStore,
    pulltfOnline,
    changetfOnline
}