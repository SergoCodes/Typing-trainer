export function chooseMarkClass(status) {
  const {isRight, isCorrected} = status
  
  let markClass = 'default'
  if (isRight && !isCorrected) markClass = 'right'
  else if (isRight && isCorrected) markClass = 'corrected'
  else if (isRight === null) markClass = 'default'
  else if (!isRight) markClass = 'wrong'
  return markClass
}
