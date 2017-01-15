const Datastore = require('nedb')
const inquirer = require('inquirer');

const state = {
  gameIsOn: true,
  secondsPlayed: 0,
  questionsAnsweredCount: 0,
  questionsAnsweredHashArray: [],
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
      if (state.questionsAnsweredHashArray.indexOf(doc.md5) > -1) {
        return getRandomQuestion()
      }
      state.questionsAnsweredHashArray.push(doc.md5)
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
