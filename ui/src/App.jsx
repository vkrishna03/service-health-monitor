import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/hello" element={<h1>Hello World</h1>} />

          <Route path="*" element={<h1>404 Error</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
