import React, {useEffect, useMemo, useRef, useState} from 'react'
import Char from './components/Char'
import {defaultStatus} from './constants'
import {calculateWPM} from './utils'

function App() {
  const text = 'Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly. So gate at no only none open. Betrayed at properly it of graceful on.'
  const chars = [...text]
  let i = 0
  const words = text.match(/.*? |.+$/g)
  const [current, setCurrent] = useState(0)
  const [statuses, setStatuses] = useState([])
  const focusDiv = useRef()
  const [wpm, setWpm] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [accuracy, setAccuracy] = useState(100)
  let interval = useRef(null)
  
  useEffect(() => {
    focusDiv.current.focus()
  },[])
  
  function startCalcTime() {
    const localStartTime = Date.now()
    if (!startTime) setStartTime(localStartTime)
    const interval = setInterval(() => {
      setCurrent(current => {
        const currentTime = Date.now()
        console.log({localStartTime, currentTime, current})
        setWpm(calculateWPM(localStartTime, currentTime, current))
        
        // const count =statuses.filter(elem => elem.isRight).length
        // console.log(count)
        return current
      })
    }, 1000)
    return interval
  }
  
  function onType(ev) {
    if (!startTime) interval.current = startCalcTime()
    if (current >= 20) clearInterval(interval.current)
    
    const ignoredKeys = ['Shift', 'Tab']
    if (ignoredKeys.includes(ev.key)) return
    
    const newStatuses = [...statuses]
    const status = getStatus(ev.key, current)
    
    if (status.isRight === null) {
      newStatuses[current - 1] = status
      setCurrent(current - 1)
    } else {
      newStatuses[current] = status
      setCurrent(current + 1)
    }
    
    setStatuses(newStatuses)
  }
  
  function getStatus(key, current) {
    let isRight = (chars[current] === key)
    let isCorrected
    if (key === 'Backspace' && current > 0) {
      isCorrected = statuses[current - 1]?.isCorrected === true
      isRight = null
    }
    else if (isRight) isCorrected = statuses[current]?.isCorrected === true
    else isCorrected = true
    
    return {isRight, isCorrected}
  }
  
  return (
    
    <div className='focusDiv' ref={focusDiv} tabIndex={0} onKeyDown={onType}>
      <div  className='text'>
        {
          words.map(word =>
            <span className='word' key={i - 1000}>
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
            </span>
          )
        }
      </div>
      
      <div className='info'>
        <div className="speed-info">Speed(wpm): {wpm}</div>
        <div className="accuracy-info">Accuracy: {accuracy}%</div>
      </div>
    </div>
    
  );
}

export default App;
