import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import MainPage from './pages/MainPage.jsx';
import PendingTests from './pages/PendingTests.jsx';
import Register from './pages/Register.jsx';
import Results from './pages/Results.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage/>
    },
    {
        path: '/pending_tests',
        element: <PendingTests/>
    },
    {
        path: '/results',
        element: <Results/>
    },
    {
        path: '/register',
        element: <Register/>,
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
); 
