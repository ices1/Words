
// 初始化 store 到 Dom
let pullStore = JSON.parse(localStorage.getItem('words')) || {}

// 更新 Dom 元素 到 Store
let pushStore = (word, status) => {
    let store = JSON.parse(localStorage.getItem('words')) || {}
    store[word] = status
    localStorage.setItem('words', JSON.stringify(store))
}

export {
    pullStore,
    pushStore
}
