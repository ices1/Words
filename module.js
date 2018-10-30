let str = 'string'
let obj = {
    name: 'Rosen'
}
let fn = () => {
    console.log('module test')
}

// 常规输出
export {
    str, obj, fn
}
// 默认输出
export default {a: 1}