import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Mainlayout } from './layouts/Mainlayout'
import { SignUp } from './components/SignUp'

function App() {

  return (
    <div className="h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUp/>}/>
          <Route path="/home" element={<Mainlayout/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
