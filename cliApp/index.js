const Datastore = require('nedb')
const inquirer = require('inquirer');

const state = {
  gameIsOn: true,
  secondsPlayed: 0,
  questionsAnswered: 0,
  player: {
    points: 0,
    correctAnswers: 0,
    falseAnswers: 0
  }
}

let amountOfQuestions = 0

const db = new Datastore({
  filename: '../data',
  autoload: true
})

const getRandomQuestion = () => {
  return new Promise((resolve) => {
    const index = Math.random() * amountOfQuestions
    db.findOne({}).skip(index).exec((err, doc) => {
      resolve(doc)
    })
  })
}

const doRound = () => {
  getRandomQuestion().then((q) => {
    console.log(q)
  })
}

const countDocumentAmount = () => {
  return new Promise((resolve) => {
    amountOfQuestions = db.count({}, (err, count) => {
      resolve(count)
    });
  })
}

const run = () => {
  countDocumentAmount().then((count) => {
    amountOfQuestions = count
    doRound()
  })
}

run()
