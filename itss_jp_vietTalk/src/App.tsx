import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Mainlayout } from './layouts/Mainlayout'
import { Login } from './pages/Login/LogIn'
import { SignUp } from './pages/Signup/SignUp'
import { LessonChoose } from './pages/LessonChoose/LessonChoose'
import LevelSelectPage from './pages/LevelSelectPage/LevelSelectPage'
import { ListeningPage } from './pages/LessonChoose/ListeningPage/ListeningPage'

function App() {

  return (
    <div className="h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/home" element={<Mainlayout />}>
            <Route index element={<LevelSelectPage />} />
            <Route path="lessons" element={<LessonChoose />} />
            <Route path="listening/:id" element={<ListeningPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
