import { useState } from 'react'
import './App.css'
import Chatbot from './Components/ChatBot/Chatbot.jsx' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Chatbot/>
    </>
  )
}

export default App
