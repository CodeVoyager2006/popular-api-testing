import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ShareButton from "./assets/Share-Button.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <div>
        <h1>Yo Homies</h1>
        <ShareButton>
        </ShareButton>
      </div>
    </main>
  )
}

export default App

