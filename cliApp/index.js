const DataStore = require('nedb')
const inquirer = require('inquirer')
const colors = require('colors')

const state = {
  gameIsOn: true,
  secondsPlayed: 0,
  questionsAnsweredCount: 0,
  questionsAnsweredHashArray: [],
  player: {
    points: 0,
    correctAnswers: 0,
    incorrectAnswers: 0
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
    processUserAnswer(q, q.answers.correctAnswer, answer.userAnswer)
  })
}

const processUserAnswer = (q, correctAnswer, userAnswer) => {
  if (correctAnswer === userAnswer) {
    doOnCorrectAnswer(q)
  } else {
    doOnIncorrectAnswer(q)
  }
  console.log('\n************\n')
}

const doOnCorrectAnswer = (q) => {
  state.player.points++
  state.player.correctAnswers++
  console.log('Correct!'.bgGreen)
  doRound()
}

const doOnIncorrectAnswer = (q) => {
  state.player.points--
  state.player.incorrectAnswers++
  const msg = 'Wrong! The correct answer would\'ve been "' + q.answers.correctAnswer + '"'
  console.log(msg.red.bold)
  doRound()
}

const formatChoices = (q) => {
  const choices = q.incorrectAnswers
  choices.push(q.correctAnswer)
  return shuffleArray(choices)
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

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

run()
