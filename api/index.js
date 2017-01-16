const express = require('express')
const app = express()
const DataStore = require('nedb')

const questionsAnsweredHashArray = []
let amountOfQuestions = 0

const db = new DataStore({
  filename: '../data',
  autoload: true
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
      if (questionsAnsweredHashArray.indexOf(doc.md5) > -1) {
        return getRandomQuestion()
      }
      questionsAnsweredHashArray.push(doc.md5)
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
