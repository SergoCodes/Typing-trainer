import React, {useState} from 'react';

const Char = ({index, current, children, checks}) => {
  const rootClasses = ['char']
  if (current === index) rootClasses.push('active')
  if (checks[index]) rootClasses.push('right')
  
  return (
    <span
      className={rootClasses.join(' ')}
      key={index}
      index={index}
    >
      {children}
    </span>
  );
};

export default Char;
