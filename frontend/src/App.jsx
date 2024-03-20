import React,{ useEffect, useState } from 'react'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Web from './routes/Web'
import Navigation from './inc/Navigation'

function App() {
  
  
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Web/>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
