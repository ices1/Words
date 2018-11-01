const express = require('express')
const axios = require('axios')
// const http = require('http')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const port = 10001

//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    // res.header("Access-Control-Allow-Methods","POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");

    // 设置前端携带可访问 cookies
    // res.header("Access-Control-Allow-Origin", 'http://localhost:8080')
    // res.header("Access-Control-Allow-Origin", 'http://localhost:8080; http://127.0.0.1:8080; http://bbs2.iceeweb.com')
    res.header("Access-Control-Allow-Credentials", true)
    next();
});


app.use(express.static(path.join(__dirname, '../')))
app.use(bodyParser.urlencoded())

app.post('/url', async (req, res, next) => {
  // console.log(req.body)
  let url = req.body.url
    // debugger
    await axios.get(url)
      .then((response) => {
        console.log('响应成功： ', response.status)
        // console.log(response)
        res.jsonp(htmlSplit(response.data))
      })
      .catch((e) => {
        console.log('响应失败： ', e.response)
        res.send({

            status: 'failed',
            msg: 'Request server response failed, please check the link entered below'
          })
      })
})


// credentials 
const credentials = {
    // key: fs.readFileSync('/root/.acme.sh/vps.iceeweb.com/vps.iceeweb.com.key'),
    // cert: fs.readFileSync('/root/.acme.sh/vps.iceeweb.com/vps.iceeweb.com.cer')
};

// const httpServer = http.createServer(credentials, app);


// httpServer.listen(port, () => {
//     console.log('HTTP Server running on port', port);
// })

app.listen(port, () => {console.log('listening on port: ', port)})

// transform html to word
function htmlSplit(html) {
  let store
  let obj = {}

  store = html.match(/[^\d\W]+/g)
  // store=['abc', 'abc', 'eat', 'book']

  for(let i = 0, len = store.length; i < len; i++) {

    // obj={abc: 2, eat:1, book:1}
      obj[store[i]] = obj[store[i]] ? obj[store[i]] + 1 : 1  
  }

  return obj
}