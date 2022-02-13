export function chooseMarkClass(status) {
  const {isRight, isCorrected} = status
  
  let markClass = 'default'
  if (isRight && !isCorrected) markClass = 'right'
  else if (isRight && isCorrected) markClass = 'corrected'
  else if (isRight === null) markClass = 'default'
  else if (!isRight) markClass = 'wrong'
  return markClass
}

export function calculateWPM(startTime, currentTime, current) {
  const seconds = Math.round((currentTime - startTime)/1000)
  const wpm = Math.round((current / 5) / (seconds / 60))
  return wpm
}

export function getStatus(key, current, statuses, chars) {
  let isRight = (chars[current] === key)
  let isCorrected
  if (key === 'Backspace' && current > 0) {
    isCorrected = statuses[current - 1]?.isCorrected === true
    isRight = null
  }
  else if (isRight) isCorrected = statuses[current]?.isCorrected === true
  else isCorrected = true
  
  return {isRight, isCorrected}
}
