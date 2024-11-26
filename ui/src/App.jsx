import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ServicesPage from './pages/ServicesPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<ServicesPage/>} />
            <Route path="/logs" element={<h1>Logs</h1>} />
            <Route path="/incidents" element={<h1>Incidents</h1>} />
            <Route path="*" element={<h1>404 Error</h1>} />
          </Route>
          

        </Routes>
      </Router>
    </>
  )
}

export default App
