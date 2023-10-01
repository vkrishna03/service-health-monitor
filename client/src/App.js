import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import LoginPage from './Components/Pages/LoginPage';
import ProfilePage from './Components/Pages/ProfilePage';
import HomePage from './Components/Pages/HomePage'
import SignUpPage from './Components/Pages/SignUpPage'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={ <ProfilePage/>} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/services" element={ <HomePage/>} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;
