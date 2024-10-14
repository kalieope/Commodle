// App.js
import { Link } from 'react-router-dom';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup.jsx';
import HomePage from './Pages/HomePage.js';
import AboutPage from './Pages/AboutPage.js';
import FavoritesPage from  './Pages/FavoritesPage.js';
import ReviewPage from './Pages/ReviewPage.js';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
      </Routes>
      <div>
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to ="/reviews">Reviews</Link>
      </div>

      {/* ... Routes component */}
    </BrowserRouter>
  );
};

export default App;