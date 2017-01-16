const formatChoices = (q) => {
  const choices = q.incorrectAnswers.map(unescapeCrap)
  choices.push(unescapeCrap(q.correctAnswer))
  return shuffleArray(choices)
}

const unescapeCrap = (string) => {
  return string
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '"')
    .replace(/&#039;/g, "'")
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

export default {
  formatChoices,
  unescapeCrap,
  shuffleArray
}
