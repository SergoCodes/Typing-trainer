import React, {useState} from 'react';
import classes from './Char.module.css'

const Char = ({index, current, children, checks}) => {
  const rootClasses = [classes['char']]
  if (current === index) rootClasses.push(classes.active)
  if (checks[index]) rootClasses.push(classes.right)
  
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
