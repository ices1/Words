const express = require('express')
const axios = require('axios')
const https = require('https')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const sqlite = require('sqlite')
const app = express()
const port = 10001
const port2 = 10002
let db

const dbPromise = sqlite.open(path.join(__dirname, './words.db'), { Promise })

// 批量获取单词
// async function getDb(ary) {
//   // }大小写敏感
//   // let res = await db.all(`SELECT word, translation FROM dict WHERE word in (${'"' + ary.join('","') + '"'})`);
//   let res = await db.all(`SELECT word, translation FROM dict WHERE word 
//     in (${'"' + ary.join('","') + '"'}) collate nocase`);
//   // console.log('\ngetDb:\n', res)
//   return res
// }


//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true)
    next();
});


app.use(express.static(path.join(__dirname, '../')))
app.use(bodyParser.urlencoded())

app.post('/url', async (req, res, next) => {
  // console.log(req.body)
  let url = req.body.url
    await axios.get(url)
      .then(async (response) => {
        console.log('响应成功： ', response.status)
        let comDate = await htmlSplit(response.data)
        res.send(comDate)
      })
      .catch((e) => {
        console.dir(e)
        // console.log('响应失败： ', e)
        res.send({
            status: 'failed',
            msg: 'Request server response failed, please check the link entered below'
          })
      })
})

app.get('/api/:word', async (req, res, next) => {
  let w = req.params.word
  let data = await db.get('SELECT translation FROM dict WHERE word = ? collate nocase', w)
  res.send(data)
})


// credentials 
const credentials = {
    key: fs.readFileSync('/root/.acme.sh/words.iceeweb.com/words.iceeweb.com.key'),
    cert: fs.readFileSync('/root/.acme.sh/words.iceeweb.com/words.iceeweb.com.cer')
};


 // 启动监听，读取数据库
 ;(async function() {
   db = await dbPromise
   httpsServer.listen(port2, () => console.log('server is listening on port', port2))
   app.listen(port, () => console.log('server is listening on port', port))
 }())


// transform html to word
// async function htmlSplit(html) {
function htmlSplit(html) {
  let store, desc, freq
  let obj = {}

  store = html.match(/[^\d\W]+/g)
  // store=['abc', 'abc', 'eat', 'book']

  for(let i = 0, len = store.length; i < len; i++) {
    // obj={abc: 2, eat:1, book:1}
      w = store[i].toLowerCase()
      obj[w] = obj[w] ? obj[w] + 1 : 1  
  }

  return obj

  // Frequency
  // freq = Object.keys(obj)
  // console.log('freq.length', freq.length)

  // Desc
  // desc = await getDb(freq)
  // desc = await getDb(['book','love','see','like'])
  // console.log(desc)

  // return compositeDate(obj, desc)
}

// 组合词频，词意
// function compositeDate(freq, desc) {
//   let res = {}

//   for(let i in desc) {
//     desc
//     res[i] = {f: freq[i], d: desc[i]}
//   }

//   for(let i=0, l = desc.length; i < l; i++) {
//     let w = desc[i].word

//     res[w] = {f: freq[w], d: desc[i].translation}
//   }

//   console.log('\ncompsDate:\n',res)
//   return res
// }