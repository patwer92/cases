import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Reset from './Reset'

// Definerer ruter for hovedsider i applikasjonen
const Pages: React.FC = () => (
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
    <Route
      path='/reset'
      element={<Reset />}
    />
  </Routes>
)

export default Pages
