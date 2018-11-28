// Stopwatch: useReducer (a la redux)
// 🐨 1. swap useState with useReducer
import React, {useEffect, useRef, useReducer} from 'react'

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200,
}

// 🐨 2. create a function called reducer
// 💰 function reducer(state, action) {}
// The contents of this function can be whatever you would like.
// but here's an example of one of the state transitions that would work well:
function reducer(state, action) {
  switch (action.type) {
    case 'RUNNING':
      return {
        ...state,
        running: action.running
      }
    case 'LAPSE': {
     return {
       ...state,
       lapse: action.lapse
     }
    }
    case 'CLEAR':
      return {
        ...state,
        running: false,
        lapse: 0,
      }
    default:
      break;
  }
}

const initialStateObject = {
  lapse: 0,
  running: false
}

function Stopwatch() {
  // 🐨 3. swap these `useState` calls with a single `useReducer` call
  const [state, dispatch] = useReducer(reducer, initialStateObject)
  // https://reactjs.org/docs/hooks-reference.html#usereducer
  // const [lapse, setLapse] = useState(0)
  // const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearInterval(timerRef.current), [])

  function handleRunClick() {
    if (state.running) {
      clearInterval(timerRef.current)
    } else {
      const startTime = Date.now() - state.lapse
      timerRef.current = setInterval(() => {
        // 🐨 4. swap this with a call to dispatch
        dispatch({ type: 'LAPSE', lapse: Date.now() - startTime})
      }, 0)
    }
    // 🐨 5. swap this with a call to dispatch
    dispatch({ type: 'RUNNING', running: !state.running})
  }

  function handleClearClick() {
    clearInterval(timerRef.current)
    // 🐨 6. swap this with a call to dispatch
    dispatch({type: 'CLEAR'})
  }

  return (
    <div style={{textAlign: 'center'}}>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {state.lapse}
        ms
      </label>
      <button onClick={handleRunClick} style={buttonStyles}>
        {state.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleClearClick} style={buttonStyles}>
        Clear
      </button>
    </div>
  )
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.

function Usage() {
  return <Stopwatch />
}
Usage.title = 'Stopwatch: useReducer (a la redux)'

export default Usage
