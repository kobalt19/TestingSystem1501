import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router';
import {CAlert, CButton, CContainer, CForm, CFormInput, CFormLabel, CFormText} from '@coreui/react';
import { AuthContext } from '../context';
import CustomNavbar from '../components/CustomNavbar.jsx';
import Fetching from '../API/Fetching.js';
import useFetching from '../hooks/useFetching.js';

function Login()
{
    const [login, isLoading, error] = useFetching(async (username, password) =>
    {
        return await Fetching.login(username, password);
    });

    const navigate = useNavigate();

    const context = useContext(AuthContext);

    async function sendForm(e)
    {
        e.preventDefault();
        const response = await login(username, password);
        if (response.ok)
        {
            const responseData = await response.json();
            const token = await responseData.token;
            context.setToken(token);
            navigate('/');
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
                isLoading
                    ? <p>Загрузка...</p>
                    :
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
