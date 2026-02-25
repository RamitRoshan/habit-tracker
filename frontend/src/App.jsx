import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() { 

  return (
    <div>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
