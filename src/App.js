import React, {useEffect, useRef, useState} from 'react'
import Char from './components/Char'
import Word from './components/Word'

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
    const ignoredKeys = ['Shift', 'Tab']
    if (ignoredKeys.includes(ev.key)) {
      return
    }
    const newStatuses = [...statuses]
    const isRight = chars[current] === ev.key
    let isCorrected
    if (ev.key === 'Backspace' && current > 0) {
      isCorrected = newStatuses[current - 1]?.isCorrected === true
      newStatuses[current - 1] = {isRight: null, isCorrected}
      setCurrent(current - 1)
    }
    else if (isRight) {
      isCorrected = newStatuses[current]?.isCorrected === true
      newStatuses[current] = {isRight, isCorrected}
      setCurrent(current + 1)
    }
    else {
      newStatuses[current] = {isRight, isCorrected: true}
      setCurrent(current + 1)
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
