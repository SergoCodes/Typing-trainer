import React, {useState} from 'react';

const Char = ({index, current, children, statuses}) => {
  const rootClasses = ['char']
  
  if (current === index) rootClasses.push('active')
  
  const {isRight, isCorrected} = statuses[index] || {isRight: null, isCorrected: false}
  
  let markClass = 'default'
  if (isRight && !isCorrected) markClass = 'right'
  else if (isRight && isCorrected) markClass = 'corrected'
  else if (isRight === null) markClass = 'default'
  else if (!isRight) markClass = 'wrong'
  rootClasses.push(markClass)
  
  return (
    <span
      className={rootClasses.join(' ')}
      key={index}
    >
      {children}
    </span>
  );
};

export default Char;
