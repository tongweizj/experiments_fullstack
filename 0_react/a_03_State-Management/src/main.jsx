import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// Guide
// uncomment the imports below one at a time


// import App from './App.jsx' // vite生成的app文件


// import App from './state/LiftStateUp1'
// import App from './state/LiftStateUp2'
// import App from './state/LiftStateUp3'

// useState
// import App from './useState/SetGoals'
// import App from './useState/StateTernary'
import App from './useState/FunctionalClock'
// UseReducer
// import App from './useReducer/ReducerContextPage'
// import App from './useReducer/UseReducerExample'
// import App from './useReducer/UseReducerExample2'
// import App from './useReducer/MultiStepForm'

// UseEffect
// import App from './UseEffect/UseEffectExample'
// import App from './UseEffect/UseEffectExample2'


// import App from './Context/ContextExample'
// import App from './Context/PropsDrillingTest'
// import App from './Context/SportContextApp'
// import App from './Context/useContextExample'
// import App from './Context/ProviderExample'

// import App from './Components/FunctionalLoginControl';
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App description = "Emerging Tech is a very techy course" />
  </React.StrictMode>,
)
