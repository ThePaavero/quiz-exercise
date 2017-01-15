const md5Hex = require('md5-hex')
const axios = require('axios')
const Datastore = require('nedb')

const store = new Datastore({
  filename: '../data',
  autoload: true
})
const apiUrl = 'https://opentdb.com/api.php?amount=1500&type=multiple'
let runCount = 0
const runsToMake = 1

const run = () => {
  runApiCall()
}

const getHashOfQuestion = (questionString) => {
  return md5Hex(questionString)
}

const runApiCall = () => {
  axios.get(apiUrl).then((response) => {
    const questionsArray = response.data
    questionsArray.results.forEach((q) => {
      saveQuestion(q).then(() => {
        runCount++
        if (runCount < runsToMake) {
          runApiCall()
        }
      })
    })
  })
}

const saveQuestion = (data) => {
  const md5 = getHashOfQuestion(data.question)
  const answers = {
    correctAnswer: data.correct_answer,
    incorrectAnswers: data.incorrect_answers
  }
  const row = {
    md5,
    question: data.question,
    category: data.category,
    difficulty: data.difficulty,
    answers
  }
  return new Promise((resolve) => {
    store.insert(row, (err, newDocument) => {
      resolve(newDocument)
    })
  })
}

run()
