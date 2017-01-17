const saveStateToDisk = (state) => {
  window.localStorage.setItem('quizState', JSON.stringify(state))
  console.log('Saved state to localStorage')
}

const getStateFromDisk = () => {
  const onDisk = window.localStorage.getItem('quizState')
  return onDisk ? JSON.parse(onDisk) : null
}

export default {
  saveStateToDisk,
  getStateFromDisk
}
