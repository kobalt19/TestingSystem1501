import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router';
import {CAlert, CButton, CContainer, CForm, CFormInput, CFormLabel, CFormText} from '@coreui/react';
import {AuthContext} from '../context';
import CustomNavbar from '../components/CustomNavbar.jsx';
import Fetching from '../API/Fetching.js';
import useFetch from '../hooks/useFetch.js';

function Login()
{
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const context = useContext(AuthContext);

    async function sendForm(e)
    {
        e.preventDefault();
        try
        {
            const response = await Fetching.login(username, password);
            if (response.status === 200)
            {
                const responseData = await response.data;
                const token = await responseData['access_token'];
                context.setToken(token);
                navigate('/');
            }
        }
        catch (err)
        {
            try
            {
                setError(err.response.data.detail);
            }
            catch
            {
                setError(err.message);
            }
        }
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleUsername(event)
    {
        setUsername(event.target.value);
    }

    function handlePassword(event)
    {
        setPassword(event.target.value);
    }

    return (
        <div className="Register">
            <CustomNavbar/>
            <h1 style={{textAlign: 'center', margin: '10px auto 10px auto'}}>Вход</h1>
            {
                <CContainer lg>
                    <CForm onSubmit={sendForm}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="usernameInput">Имя пользователя</CFormLabel>
                            <CFormInput type="text" id="usernameInput" onChange={handleUsername}/>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="passwordInput">Пароль</CFormLabel>
                            <CFormInput type="password" id="passwordInput" onChange={handlePassword}/>
                        </div>
                        <CButton type="submit" className="mb-3">Войти</CButton>
                        {
                            error
                            && <CAlert color="danger">Ошибка: {error}</CAlert>
                        }
                    </CForm>
                </CContainer>
            }
        </div>
    )
}


export default Login;
