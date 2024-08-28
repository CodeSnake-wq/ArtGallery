import React from 'react'
import Home from './components/Home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Artists from './components/Artists/Artists'
import Signup from './components/Signup'
import { Toaster } from'react-hot-toast'
import { useAuth } from './context/AuthProvider'
import Login from './components/Login'
import Symbols from './components/Symbols/Symbols'

function App() {
  const [authUser, setAuthUser] = useAuth()
  console.log(authUser)
  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={authUser?<Artists /> : <Navigate to = "/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/symbols" element={<Symbols />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
