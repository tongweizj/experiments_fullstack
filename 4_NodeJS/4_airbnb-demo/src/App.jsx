import { useState } from 'react'
import Bananer from './components/Bananer'
import Navbar from './components/Navbar'
import Main from './components/Main'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Bananer/>
    <Main/>

    </>
  )
}

export default App
