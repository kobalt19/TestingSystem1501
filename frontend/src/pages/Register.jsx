import React, {useState} from 'react';
import {CAlert, CButton, CContainer, CForm, CFormInput, CFormLabel, CFormText} from '@coreui/react';
import CustomNavbar from '../components/CustomNavbar.jsx';
import Fetching from '../API/Fetching.js';
import useFetching from '../hooks/useFetching.js';

function Register()
{
    const [register, isLoading, error] = useFetching(async function(username, password, passwordAgain)
    {
        return await Fetching.register(username, password, passwordAgain);
    });

    function sendForm(e)
    {
        e.preventDefault();
        const response = register(username, password, passwordAgain);
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    function handleUsername(event)
    {
        setUsername(event.target.value);
    }

    function handlePassword(event)
    {
        setPassword(event.target.value);
    }

    function handlePasswordAgain(event)
    {
        setPasswordAgain(event.target.value);
    }
    return (
        <div className="Register">
            <CustomNavbar/>
            <h1 style={{textAlign: 'center', margin: '10px auto 10px auto'}}>Регистрация</h1>
            {
                isLoading
                    ? <p>Загрузка...</p>
                    :
            <CContainer lg>
                <CForm onSubmit={sendForm}>
                    <div className="mb-3">
                        <CFormLabel htmlFor="usernameInput">Имя пользователя</CFormLabel>
                        <CFormInput type="text" id="usernameInput" onChange={handleUsername}/>
                        <CFormText component="span">От 8 символов на русском языке</CFormText>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="passwordInput">Пароль</CFormLabel>
                        <CFormInput type="password" id="passwordInput" onChange={handlePassword}/>
                        <CFormText component="span">От 8 символов, цифрами и латинскими символами нижнего и верхнего регистра</CFormText>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="passwordAgainInput">Повторите пароль</CFormLabel>
                        <CFormInput type="password" id="passwordAgainInput" onChange={handlePasswordAgain}/>
                    </div>
                    <CButton type="submit" className="mb-3">Регистрация</CButton>
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


export default Register;
