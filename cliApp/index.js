const DataStore = require('nedb')
const inquirer = require('inquirer')

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

const db = new DataStore({
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
    promptUser(q)
  })
}

const promptUser = (q) => {
  inquirer.prompt({
    type: 'list',
    name: 'userAnswer',
    message: q.question,
    choices: formatChoices(q.answers)
  }).then(function (answer) {
    console.log(answer)
  })
}

const formatChoices = (q) => {
  const choices = q.incorrectAnswers
  choices.push(q.correctAnswer)
  return choices
}

const countDocumentAmount = () => {
  return new Promise((resolve) => {
    amountOfQuestions = db.count({}, (err, count) => {
      resolve(count)
    })
  })
}

const run = () => {
  countDocumentAmount().then((count) => {
    amountOfQuestions = count
    doRound()
  })
}

run()
