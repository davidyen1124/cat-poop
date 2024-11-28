import { useState } from 'react'
import './App.css'

const INTESTINE_PATH =
  'M 40,50 L 370,50 Q 400,50 400,80 Q 400,100 370,100 Q 220,100 70,100 Q 40,100 40,130 Q 40,150 70,150 Q 220,150 370,150 Q 400,150 400,180 Q 400,200 370,200 Q 220,200 70,200 Q 40,200 40,230 Q 40,250 70,250 Q 220,250 370,250 Q 400,250 400,280 Q 400,300 370,300 Q 220,300 70,300 Q 40,300 40,330 Q 40,350 70,350 Q 220,350 370,350 Q 400,350 400,380'

const DELAYS = [0, 2, 4, 6]
const EMOJIS = {
  CAT: '🐱',
  COFFEE: '☕️',
  BLUEBERRY: '🫐',
  BEAN: '🫘',
  POOP: '💩'
}

const CoffeeBean = ({ delay }) => {
  const [transitionPoint, setTransitionPoint] = useState(() =>
    (Math.random() * 0.25 + 0.5).toFixed(2)
  )
  const [turnsToPoop, setTurnsToPoop] = useState(() => Math.random() < 0.3)
  const transitionEnd = (parseFloat(transitionPoint) + 0.01).toFixed(2)

  const regenerateRandomValues = () => {
    setTransitionPoint((Math.random() * 0.25 + 0.5).toFixed(2))
    setTurnsToPoop(Math.random() < 0.3)
  }

  return (
    <g>
      <text className='svg-emoji coffee-bean' dy='5'>
        <animateMotion
          dur='8s'
          repeatCount='indefinite'
          begin={`${delay}s`}
          onRepeat={regenerateRandomValues}
        >
          <mpath href='#intestinePath' />
        </animateMotion>
        <animate
          attributeName='opacity'
          from='0'
          to='1'
          dur='0.1s'
          begin={`${delay}s`}
          fill='freeze'
        />
        <tspan>
          {EMOJIS.BLUEBERRY}
          <animate
            attributeName='opacity'
            values={`1;1;0;0`}
            keyTimes={`0;${transitionPoint};${transitionEnd};1`}
            dur='8s'
            begin={`${delay}s`}
            repeatCount='indefinite'
          />
        </tspan>
        <tspan dx='-24'>
          {turnsToPoop ? EMOJIS.POOP : EMOJIS.BEAN}
          <animate
            attributeName='opacity'
            values={`0;0;1;1`}
            keyTimes={`0;${transitionPoint};${transitionEnd};1`}
            dur='8s'
            begin={`${delay}s`}
            repeatCount='indefinite'
          />
        </tspan>
      </text>
    </g>
  )
}

function App() {
  return (
    <svg className='container' width='100%' height='100%' viewBox='0 0 440 440'>
      <defs>
        <path id='intestinePath' d={INTESTINE_PATH} />
      </defs>
      <use href='#intestinePath' className='intestine-border' />
      <use href='#intestinePath' className='intestine-path' />

      {DELAYS.map((delay, index) => (
        <CoffeeBean key={index} delay={delay} />
      ))}

      <text x='40' y='50' className='svg-emoji'>
        {EMOJIS.CAT}
      </text>
      <text x='400' y='380' className='svg-emoji'>
        {EMOJIS.COFFEE}
      </text>
    </svg>
  )
}

export default App
