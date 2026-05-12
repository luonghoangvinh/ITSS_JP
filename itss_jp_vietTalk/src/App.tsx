import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Mainlayout } from './layouts/Mainlayout'
import { LogIn } from './pages/Login/LogIn'
import { SignUp } from './pages/Signup/SignUp'
import { LessonChoose } from './pages/LessonChoose/LessonChoose'

function App() {

  return (
    <div className="h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Mainlayout />}>
            <Route index element={<LessonChoose />} />
            <Route path="lessons" element={<LessonChoose />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
