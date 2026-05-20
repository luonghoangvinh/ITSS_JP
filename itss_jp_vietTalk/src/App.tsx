import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Mainlayout } from './layouts/Mainlayout'
import { Login } from './pages/Login/LogIn'
import { SignUp } from './pages/Signup/SignUp'
import { LessonChoose } from './pages/LessonChoose/LessonChoose'
import LevelSelectPage from './pages/LevelSelectPage/LevelSelectPage'
import DictionaryScreen from './pages/DictionaryScreen/DictionaryScreen'
import ShadowingScreen from './pages/Shadowing/Shadowing'
import { Listening } from './pages/LessonChoose/ListeningPage/Listening'

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
            <Route path="levelselect" element={<LevelSelectPage />} />
            <Route path="dictionary" element={<DictionaryScreen />} />
            <Route path="shadowing" element={<ShadowingScreen />} />
            <Route path="lessons" element={<LessonChoose />} />
            <Route path="lessons/:urlLevel" element={<LessonChoose />} />
            <Route path="listening" element={<Listening />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
