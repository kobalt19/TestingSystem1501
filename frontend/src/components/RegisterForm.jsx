import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './UI/input/Input.jsx';
import Button from './UI/button/Button.jsx';
import TestService from '../API/TestService.js';
import useFetching from '../hooks/useFetching.js';


const RegisterForm = (setToken) =>
{
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const passwordAgainInputRef = useRef();
    const [sendForm, isLoading, error] = useFetching(async (username, password, password_again) =>
    {
        const response = await TestService.register({
            username: username,
            password: password,
            password_again: password_again
        });
        setToken(response.data['access-token']);
    });
    var navigate = useNavigate();
    useEffect(() => {}, [error])
    return (
        <div className="RegisterForm">
            <h1 style={{textAlign: 'center'}}>Регистрация</h1>
            <div className="input-group">
                <p className="input-name">Имя</p>
                <Input
                    ref={usernameInputRef}
                    type="text" 
                    id="login"
                />
            </div>
            <div className="input-group">
                <p className="input-name">Пароль</p>
                <Input
                    ref={passwordInputRef}
                    type="password" 
                    id="password"
                />
            </div>
            <div className="input-group">
                <p className="input-name">Повторите пароль</p>
                <Input
                    ref={passwordAgainInputRef}
                    type="password" 
                    id="password-again"
                />
            </div>
            <div className="input-group">
                <Button onClick={() => 
                    {
                        sendForm(usernameInputRef.current.value, passwordInputRef.current.value, passwordAgainInputRef.current.value);
                        navigate('/pending_tests');
                    }
                }>
                    Зарегистрироваться
                </Button>
            </div>
            {
                error && <div className="error">{error}</div>
            }
        </div>
    );
}

export default RegisterForm;
