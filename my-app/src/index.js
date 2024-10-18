
// App.js
import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link, Outlet} from 'react-router-dom';
import NavBar from './Components/Assets/NavBar.js';
import AboutPage from './Pages/AboutPage.js';
import FavoritesPage from './Pages/FavoritesPage.js';
import Map from './Pages/HomePage.js';
import LoginSignup from './Pages/LoginSignup.jsx';
import ReviewPage from './Pages/ReviewPage.js';
import AccountPage from './Pages/AccountPage.js';
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
        element:<Map />
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "login/signup",
        element: <LoginSignup />,
      },
      {
        path: "reviews",
        element: <ReviewPage />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
