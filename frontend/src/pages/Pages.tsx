import React from 'react'
import Home from './Home'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const Pages: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
      </Routes>
    </div>
  )
}

export default Pages
