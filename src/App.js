import React, {useEffect, useRef, useState} from 'react'
import Char from './components/Char'

function App() {
  const chars = [...'Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly. So gate at no only none open. Betrayed at properly it of graceful on. Dinner abroad am depart ye turned hearts as me wished. Therefore allowance too perfectly gentleman supposing man his now. Families goodness all eat out bed steepest servants. Explained the incommode sir improving northward immediate eat. Man denoting received you sex possible you. Shew park own loud son door less yet.']
  const [current, setCurrent] = useState(0)
  const [checks, setChecks] = useState(new Array(chars.length).fill(false))
  const textArea = useRef()
  
  useEffect(() => {
    textArea.current.focus()
  }, [])
  
  function onType(ev) {
    const check = chars[current] === ev.key
    const newChecks = [...checks]
    
    if (check) {
      setCurrent(current + 1)
    }
  
    newChecks[current] = check
    if (ev.key === 'Backspace' && current > 0) {
      setCurrent(current - 1)
      newChecks[current - 1] = false
    }
    
    setChecks(newChecks)
  }
  
  return (
    <div ref={textArea} tabIndex={0} onKeyDown={onType} className='text'>
      {
        chars.map((char, index) =>
          <Char
            checks={checks}
            key={index}
            current={current}
            index={index}
          >
            {char}
          </Char>
        )
      }
    </div>
  );
}

export default App;

function colorLog(str, color) {
  console.log(`%c${str}`, `color:${color}; font-weight: bold`)
}
