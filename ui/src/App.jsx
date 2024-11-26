import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ServicesPage from './pages/ServicesPage'
import IncidentsPage from './pages/IncidentsPage'
import LogsPage from './pages/LogsPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<ServicesPage/>} />
            <Route path="/logs" element={<LogsPage/>} />
            <Route path="/incidents" element={<IncidentsPage/>} />
            <Route path="*" element={<h1>404 Error</h1>} />
          </Route>
          

        </Routes>
      </Router>
    </>
  )
}

export default App
