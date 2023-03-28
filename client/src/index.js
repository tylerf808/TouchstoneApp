import React from 'react';
import ReactDOM from 'react-dom/client';
import CostsPage from './routes/CostsPage'
import {
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddJob from './routes/AddJob';
import App from './App'
import './index.css'
import LogIn from './routes/LogIn';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);