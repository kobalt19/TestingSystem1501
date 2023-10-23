import * as React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { AuthContext } from './context';
import Login from './pages/Login.jsx';
import Main from './pages/Main.jsx';
import Register from './pages/Register.jsx';

function App()
{
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Main/>
        },
        {
            path: '/register',
            element: <Register/>
        },
        {
            path: '/login',
            element: <Login/>
        }
    ]);

    const [isAuth, setIsAuth] = React.useState(false);
    const [token, setToken] = React.useState('');
    return (
        <AuthContext.Provider value={
            {
                isAuth,
                setIsAuth,
                token,
                setToken
            }
        }>
            <React.StrictMode>
                <RouterProvider router={router}/>
            </React.StrictMode>
        </AuthContext.Provider>
    );
}


export default App;
