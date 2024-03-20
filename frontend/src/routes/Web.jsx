import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from '../components/Login'
import Logout from '../components/Logout'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'


export default function Web() {
  return (
    <Routes>
        <Route exact path="/" element={
             <PublicRoute>
                  <Login />
             </PublicRoute>
        }/>
        <Route path="/sign-in" element={
             <PublicRoute>
                  <Login />
             </PublicRoute>
        }/>
       
        <Route path="/register" element={
             <PublicRoute>
               <Register />
             </PublicRoute>
        }/>
        <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
        } />
    </Routes>
  )
}
