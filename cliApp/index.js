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

const db = new Datastore({
  filename: '../data',
  autoload: true
})

const getRandomQuestion = () => {

}

const run = () => {
  // ...
}

run()
