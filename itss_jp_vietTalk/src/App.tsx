import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Mainlayout } from './layouts/Mainlayout'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Mainlayout/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
