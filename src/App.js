import React, {useEffect, useRef, useState} from 'react'
import Char from './components/Char'
import Word from './components/Word'
import {STATUS_CORRECTED, STATUS_DEFAULT, STATUS_RIGHT, STATUS_WRONG} from './constants'

function App() {
  const text = 'Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly. So gate at no only none open. Betrayed at properly it of graceful on.'
  const chars = [...text]
  let i = 0
  const words = text.match(/.*? |.+$/g)
  const [current, setCurrent] = useState(0)
  const [statuses, setStatuses] = useState([])
  const textArea = useRef()
  
  useEffect(() => {
    textArea.current.focus()
  }, [])
  
  function onType(ev) {
    if (ev.key === 'Shift') {
      return
    }
    const isRight = (chars[current] === ev.key)
    const newStatuses = [...statuses]
    
    if (isRight) {
      newStatuses[current] = {isRight: true, isCorrected: newStatuses[current]?.isCorrected || false}
      setCurrent(current + 1)
    } else if (ev.key !== 'Backspace') {
      newStatuses[current] = {isRight: false, isCorrected: true}
      setCurrent(current + 1)
    }
    if (ev.key === 'Backspace' && current > 0) {
      setCurrent(current - 1)
      newStatuses[current - 1] = {isRight: null, isCorrected: true}
    }
    setStatuses(newStatuses)
  }
  
  return (
    <div ref={textArea} tabIndex={0} onKeyDown={onType} className='text'>
      {
        words.map(word =>
          <Word key={i - 1000}>
            {
              [...word].map(char =>
                <Char
                  statuses={statuses}
                  key={i}
                  current={current}
                  index={i++}
                >
                  {char}
                </Char>
              )
            }
          </Word>
        )
      }
    </div>
  );
}

export default App;
