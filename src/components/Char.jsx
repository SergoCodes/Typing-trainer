import React, {useState} from 'react';

const Char = ({index, current, children, statuses}) => {
  // console.log('aboba')
  const rootClasses = ['char']
  if (current === index) rootClasses.push('active')
  console.log(statuses[index])
  const {isRight, isCorrected} = statuses[index] || {isRight: null, isCorrected: false}
  let markClass = 'null'
  if (isRight && !isCorrected) markClass = 'right'
  else if (isRight && isCorrected) markClass = 'corrected'
  else if (isRight === null) markClass = 'default'
  else if (!isRight) markClass = 'wrong'
  rootClasses.push(markClass)
  
  return (
    <span
      className={rootClasses.join(' ')}
      key={index}
      index={index}
      status={statuses[index]}
    >
      {children}
    </span>
  );
};

export default Char;
