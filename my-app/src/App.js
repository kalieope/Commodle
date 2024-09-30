// App.js
import { Link } from 'react-router-dom';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup.jsx';
import HomePage from './HomePage';
import AboutPage from './AboutPage';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <div>
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
      </div>

      {/* ... Routes component */}
    </BrowserRouter>
  );
};

export default App;