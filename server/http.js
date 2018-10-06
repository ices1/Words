let https = require('https')

let baseUrl = 'https://cnodejs.org'
let store = []

let searchUrl, callbk

// let querystring = require('querystring')

let port = 8088

let server = https.createServer()

let express = require('express')

let app = new express()

// function getData() {
//     https
//         .get(searchUrl, (res) => {
//             rawData = '' 
            
//             res.on('data', data => rawData += data)
            
//             // res.on('end', () => store = console.log(rawData))
            
//         })
//         .on('error', (error) => console.log('出错了。。。\n', error))
// }

function filterWords(html) {
    let store, words, res, rawData
    let obj = {}

    store = html.match(/[^\d\W]+/g)
    for(let i = 0, len = store.length; i < len; i++) {
        // let it = obj[store[i]]
        obj[store[i]] = obj[store[i]] ? obj[store[i]] + 1 : 1  
    }

    // words = Object.keys(obj).sort((a, b) => obj[b] - obj[a])

    
    // res = words.map(x => {
    //     let o ={}
    //     o[x] = obj[x]
    //     return o
    // })

    console.log(obj)
    console.log('\nWords 解析完成')
    
    return callbk ? `${callbk}(${JSON.stringify(obj)})` : obj
}

debugger
app.get('/', (req, resData) => {
    debugger
    searchUrl = req.query.q
    callbk = req.query.callback
    console.log('callback: ', callbk || '-')
    console.log('searchUrl: ', searchUrl)
    
    https
        .get(searchUrl, (res) => {
            rawData = '' 
            res.on('data', data => rawData += data)
            console.log('rawData 获取完成...')
            // console.log(rawData)
            
            // res.on('end', () => store = console.log(rawData))
            
        })
        .on('error', (error) => console.log('链接解析失败。。。\n', error))
        

    return setTimeout(() => {
        try {
            console.log('Run......')
            return resData.send(filterWords(rawData))
        }catch(TypeError) {
            return resData.send('Html解析失败，如 http://localhost:3000/?q=abc')
        }

        
    }, 1000);
})




app.listen(3009, () => console.log('App is listening at port 3009'))

