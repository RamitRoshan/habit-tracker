import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
// import './App.css'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Habits from './pages/HabitPage'
import Login from './pages/Login'
import Register from './pages/Register'

function App() { 

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar/>
      <div className="pt-4">
        <Routes>
          <Route path='/' element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }/>
          <Route path='/habits' element={<Habits/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
