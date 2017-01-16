const express = require('express')
const app = express()
const DataStore = require('nedb')

let amountOfQuestions = 0

const db = new DataStore({
  filename: '../data',
  autoload: true
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
  res.header('Access-Control-Expose-Headers', 'Content-Length')
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
  if (req.method === 'OPTIONS') {
    return res.send(200)
  } else {
    return next()
  }
})

const init = () => {
  console.log('Counting questions...')
  countDocumentAmount().then((count) => {
    console.log('Done. We have ' + count + ' questions.')
    amountOfQuestions = count
    app.listen(666, function () {
      console.log('Quiz API is listening on port 666.')
    })
    app.get('/get-random-question', function (req, res) {
      console.log('Getting random question...')
      getRandomQuestion().then((q) => {
        console.log('Sent!')
        res.send(q)
      })
    })
  })
}

const getRandomQuestion = () => {
  return new Promise((resolve) => {
    const index = Math.random() * amountOfQuestions
    db.findOne({}).skip(index).exec((err, doc) => {
      resolve(doc)
    })
  })
}

const countDocumentAmount = () => {
  return new Promise((resolve) => {
    amountOfQuestions = db.count({}, (err, count) => {
      resolve(count)
    })
  })
}

init()
