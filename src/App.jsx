import './App.css'

const INTESTINE_PATH =
  'M 20,30 L 350,30 Q 380,30 380,60 Q 380,80 350,80 Q 200,80 50,80 Q 20,80 20,110 Q 20,130 50,130 Q 200,130 350,130 Q 380,130 380,160 Q 380,180 350,180 Q 200,180 50,180 Q 20,180 20,210 Q 20,230 50,230 Q 200,230 350,230 Q 380,230 380,260 Q 380,280 350,280 Q 200,280 50,280 Q 20,280 20,310 Q 20,330 50,330 Q 200,330 350,330 Q 380,330 380,360'

const DELAYS = [0, 2, 4, 6]
const EMOJIS = {
  CAT: '🐱',
  COFFEE: '☕️',
  BLUEBERRY: '🫐',
  BEAN: '🫘'
}

const CoffeeBean = ({ delay, transitionPoint }) => {
  const transitionEnd = (parseFloat(transitionPoint) + 0.01).toFixed(2)

  return (
    <g>
      <text className='svg-emoji coffee-bean' dy='5'>
        <animateMotion
          dur='8s'
          repeatCount='indefinite'
          begin={`${delay}s`}
          path={INTESTINE_PATH}
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
        <tspan className='cherry'>
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
        <tspan className='bean' dx='-24'>
          {EMOJIS.BEAN}
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
  const transitionPoints = DELAYS.map(() =>
    (Math.random() * 0.25 + 0.5).toFixed(2)
  )

  return (
    <div className='container'>
      <div className='digestive-system'>
        <div className='small-intestine'>
          <svg width='100%' height='100%' viewBox='-20 -20 440 440'>
            <defs>
              <path id='intestinePath' d={INTESTINE_PATH} />
            </defs>
            <use href='#intestinePath' className='intestine-border' />
            <use href='#intestinePath' className='intestine-path' />

            {DELAYS.map((delay, index) => (
              <CoffeeBean
                key={index}
                delay={delay}
                transitionPoint={transitionPoints[index]}
              />
            ))}

            <text x='20' y='30' className='svg-emoji'>
              {EMOJIS.CAT}
            </text>
            <text x='380' y='360' className='svg-emoji'>
              {EMOJIS.COFFEE}
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App
