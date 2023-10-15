import React from 'react';
import Userfront from '@userfront/core';
import Alert from '../';


class SignupForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordAgain: '',
            alertMessage: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);
    }

    handleInputChange(event)
    {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.setAlertMessage();
        if (this.state.password !== this.state.passwordAgain) 
        {
            return this.setAlertMessage('пароли должны совпадать');
        }
        Userfront.signup({
            method: 'password',
            username: this.state.username,
            password: this.state.password
        }).catch(error => this.setAlertMessage(error.message));
    }

    setAlertMessage(message)
    {
        this.setState({alertMessage: message})
    }

    render()
    {
        return (
            <div>
                <Alert message={this.state.alertMessage}/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Имя
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <label>
                        Пароль
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <label>
                        Повторите пароль
                        <input
                            name="passwordAgain"
                            type="password"
                            value={this.state.passwordAgain}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        );
    }
}
