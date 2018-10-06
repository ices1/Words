const express = require('express')
const axios = require('axios')

const app = express()
const port = 10001

// 查看请求内容
app.use((req, res, next) => {
  // console.log(req)
  const queryInfo = req.query
  if (queryInfo.q) {
    try {
      // debugger
      axios.get(queryInfo.q)
        .then((response) => {
          console.log('响应成功： ', response.status)
          // console.log(response)
          res.jsonp(htmlSplit(response.data))
        })
        .catch((e) => {
          console.log('响应失败： ', e.status)
          if (e.response) {
            res.jsonp({
              status: e.response .status,
              msg: e.message
            })
          } else {
            res.jsonp({
              status: 400,
              msg: '请求服务器响应失败'
            })
          }
        })
    } catch (e) {
        res.jsonp({
          status: 400,
          msg: '请求服务器响应失败'
        })
    } finally {
      // next()
    }
  }
})

app.listen(port, () => {
  console.log('listening on port:', port)
})


function htmlSplit(html) {
  let store, words, res, rawData
  let obj = {}

  store = html.match(/[^\d\W]+/g)

  for(let i = 0, len = store.length; i < len; i++) {
      obj[store[i]] = obj[store[i]] ? obj[store[i]] + 1 : 1  
  }

  // words = Object.keys(obj).sort((a, b) => obj[b] - obj[a])

  // res = words.map(x => {
  //     let o ={}
  //     o[x] = obj[x]
  //     return o
  // })

  // console.log(res)
  // console.log('\nWords 解析完成')
  
  return obj
}