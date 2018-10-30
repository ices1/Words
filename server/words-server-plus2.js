const express = require('express')
const axios = require('axios')
const https = require('https')
const fs = require('fs')

const app = express()
const port1 = 10001
const port2 = 10002

// middleware
app.use((req, res, next) => {
  const queryInfo = req.query
  // console.log(req)
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


// credentials 
const credentials = {
    key: fs.readFileSync('/root/.acme.sh/vps.iceeweb.com/vps.iceeweb.com.key'),
    cert: fs.readFileSync('/root/.acme.sh/vps.iceeweb.com/vps.iceeweb.com.cer')
};

// listen both http & https servers
const httpsServer = https.createServer(credentials, app);

app.listen(port1, () => {
    console.log('HTTP Server running on port', port1);
})

httpsServer.listen(port2, () => {
    console.log('HTTPS Server running on port', port2);
})



// transform html to word
function htmlSplit(html) {
  let store
  let obj = {}

  store = html.match(/[^\d\W]+/g)

  for(let i = 0, len = store.length; i < len; i++) {
      obj[store[i]] = obj[store[i]] ? obj[store[i]] + 1 : 1  
  }

  return obj
}