import React, {useEffect, useRef, useState} from 'react'
import Char from './components/Char'
import Word from './components/Word'

function App() {
  const text = 'Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly. So gate at no only none open. Betrayed at properly it of graceful on.'
  const chars = [...text]
  let i = 0
  const words = text.match(/.*? |.+$/g)
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
        words.map(word =>
          <Word key={i - 1000}>
            {
              [...word].map((char, index) =>
                <Char
                  checks={checks}
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
