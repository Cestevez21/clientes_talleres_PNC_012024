import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './home'
import Login from './login'
import SingUp from './singUp'
import './App.css'
import { useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [identifier, setId] = useState('')
  const [singUp,setSingUp] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home identifier={identifier} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setId={setId} singUp={singUp}/>} />
          <Route path="/singup" element={<SingUp setSingUp={setSingUp}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App