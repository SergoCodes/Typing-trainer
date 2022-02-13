import React, {useEffect, useRef, useState} from 'react'
import Char from './components/Char'
import {ignoredKeys} from './constants'
import {calculateWPM, getStatus} from './utils'

function App() {
  const text = 'Two before narrow not relied how except moment myself. Dejection assurance mrs led certainly. So gate at no only none open. Betrayed at properly it of graceful on.'
  const chars = [...text]
  let i = 0
  const words = text.match(/.*? |.+$/g) // words with whitespaces
  
  const [current, setCurrent] = useState(0)
  const [statuses, setStatuses] = useState([])
  const [wpm, setWpm] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [accuracy, setAccuracy] = useState(100)
  const focusDiv = useRef()
  let statInterval = useRef()
  
  useEffect(() => {
    focusDiv.current.focus()
  }, [])
  
  function startStatistics() {
    const startTime = Date.now()
    setStartTime(startTime)
    
    return setInterval(() => {
      setCurrent(current => {
        const currentTime = Date.now()
        setWpm(calculateWPM(startTime, currentTime, current))
        return current
      })
      
      setStatuses(statuses => {
        const allCount = statuses.filter(st => st.isRight !== null).length
        const rightCount = statuses.filter(st => st.isRight).length
        setAccuracy(Math.round((rightCount / allCount) * 100))
        return statuses
      })
    }, 1500)
  }
  
  function onType(ev) {
    if (!startTime) statInterval.current = startStatistics()
    if (current >= text.length - 1) clearInterval(statInterval.current)
    if (ignoredKeys.includes(ev.key)) return
    
    const status = getStatus(ev.key, current, statuses, chars)
    const newStatuses = [...statuses]
    
    if (status.isRight === null) {
      newStatuses[current - 1] = status
      setCurrent(current - 1)
    } else {
      newStatuses[current] = status
      setCurrent(current + 1)
    }
    setStatuses(newStatuses)
  }
  
  function showModal() {
  
  }
  
  return (
    
    <div className='focusDiv' ref={focusDiv} tabIndex={0} onKeyDown={onType}>
      <div className='text'>
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
        <div className="accuracy-info">Accuracy: {isNaN(accuracy)? 0 : accuracy}%</div>
      </div>
    </div>
  
  );
}

export default App;
