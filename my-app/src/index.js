// index.js
import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import NavBar from './Components/Assets/NavBar.js';
import AboutPage from './Pages/AboutPage.js';
import FavoritesPage from './Pages/FavoritesPage.js';
import Map from './Pages/HomePage.js';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import ReviewPage from './Pages/ReviewPage.js';
import AccountPage from './Pages/AccountPage.js';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import "./Components/Assets/NavBar.css";

const AppLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute><Map /></ProtectedRoute>,
      },
      {
        path: "/about",
        element: <ProtectedRoute><AboutPage /></ProtectedRoute>,
      },
      {
        path: "/favorites",
        element: <ProtectedRoute><FavoritesPage /></ProtectedRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/reviews",
        element: <ProtectedRoute><ReviewPage /></ProtectedRoute>,
      },
      {
        path: "/account",
        element: <ProtectedRoute><AccountPage /></ProtectedRoute>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);