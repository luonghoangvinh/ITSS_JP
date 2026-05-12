import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Mainlayout } from './layouts/Mainlayout'
import { LogIn } from './pages/Login/LogIn'

function App() {

  return (
    <div className="h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/home" element={<Mainlayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
