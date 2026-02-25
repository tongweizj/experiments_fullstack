import { useState } from 'react'
import { Helmet } from "react-helmet-async";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  console.log("App rendered"); 
  return (
    <>
      <Helmet>
        <title>登录｜华人黄页</title>
      </Helmet>
       <h1>App Loaded</h1>
    </>
  )
}

export default App
