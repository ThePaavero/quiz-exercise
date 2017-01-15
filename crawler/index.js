const md5Hex = require('md5-hex')
const axios = require('axios')
const Datastore = require('nedb')

const db = new Datastore({
  filename: '../data',
  autoload: true
})
const apiUrl = 'https://opentdb.com/api.php?amount=1500&type=multiple'
let runCount = 0
const runsToMake = 10

const run = () => {
  runApiCall()
}

const getHashOfQuestion = (questionString) => {
  return md5Hex(questionString)
}

const runApiCall = () => {
  console.log('Running API call...')
  axios.get(apiUrl).then((response) => {
    const questionsArray = response.data
    questionsArray.results.forEach((q) => {
      if (questionExists(q)) {
        console.log('Duplicate found, skipping')
        return
      }
      console.log('Saving...')
      saveQuestion(q).then(() => {
        runCount++
        console.log('Saved.')
        if (runCount < runsToMake) {
          console.log('Running new API call in 1 second...')
          setTimeout(runApiCall, 1000)
        }
      })
    })
  })
}

const questionExists = (q) => {
  db.find({
    md5: q.md5
  }, (err, docs) => {
    return !!docs
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
    db.insert(row, (err, newDocument) => {
      resolve(newDocument)
    })
  })
}

run()
