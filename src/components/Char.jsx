import React from 'react';
import {chooseMarkClass} from '../utils'
import {defaultStatus} from '../constants'

const Char = ({index, current, children, statuses}) => {
  const rootClasses = current === index ? ['active', 'char'] : ['char']
  const status = statuses[index] || defaultStatus
  rootClasses.push(chooseMarkClass(status))
  
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

