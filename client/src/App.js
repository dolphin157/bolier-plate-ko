import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

const ProtectedLandingPage = Auth(LandingPage, null);
const ProtectedLoginPage = Auth(LoginPage, false);
const ProtectedRegisterPage = Auth(RegisterPage, false);

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<ProtectedLandingPage />} />
          <Route exact path="/login" element={<ProtectedLoginPage />} />
          <Route exact path="/register" element={<ProtectedRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
