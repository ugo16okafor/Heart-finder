import { useState } from 'react'
import Game from '../compoments/game'
import Header from '../compoments/header'
import './index.css';
import { Analytics } from "@vercel/analytics/react"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div><Header /></div>
      <div><Game /></div>
    </div>
  )
}

export default App
