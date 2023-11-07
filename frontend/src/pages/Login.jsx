import React, {useContext, useRef,  useState} from 'react';
import {useNavigate} from 'react-router';
import {CAlert, CButton, CContainer, CForm, CFormInput, CFormLabel, CFormText} from '@coreui/react';
import {AuthContext} from '../context';
import CustomNavbar from '../components/CustomNavbar.jsx';
import Fetching from '../API/Fetching.js';
import useFetch from '../hooks/useFetch.js';

function Login()
{
    const navigate = useNavigate();

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const context = useContext(AuthContext);

    const [fetchLogin, isLoading, error] = useFetch(async (username, password) => {
        const response = await Fetching.login(username, password);
        console.log(response);
        return response;
    });

    async function sendForm(e)
    {
        e.preventDefault();
        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;
        const response = await fetchLogin(username, password);
        console.log(response);
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
                            <CFormInput type="text" id="usernameInput" ref={usernameInputRef}/>
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="passwordInput">Пароль</CFormLabel>
                            <CFormInput type="password" id="passwordInput" ref={passwordInputRef}/>
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
