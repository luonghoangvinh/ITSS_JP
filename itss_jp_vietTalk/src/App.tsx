import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Mainlayout } from './layouts/Mainlayout'
import { SignUp } from './components/SignUp'
import { LessonChoose } from './pages/LessonChoose/LessonChoose'

function App() {

  return (
    <div className="h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUp/>}/>
          <Route path="/home" element={<Mainlayout/>}/>
          <Route path="/lessons" element={<Mainlayout/>}>
            <Route index element={<LessonChoose/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
