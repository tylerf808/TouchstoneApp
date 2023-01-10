import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './App';
import CostsPage from './routes/CostsPage';
import ViewJobs from './routes/ViewJobs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import AddJob from './routes/AddJob';
import LogIn from './routes/LogIn';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);