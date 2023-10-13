import React, {useState} from 'react';
import Navbar from '../components/Navbar.jsx';
import RegisterForm from '../components/RegisterForm.jsx';


const Register = () =>
{
    const options = 
    [
        {name: 'Тесты', link: '/pending_tests', active: true, id: 0}, 
        {name: 'Результаты', link: '/results', active: true, id: 1}
    ];
    return (
        <div className="Register">
            <Navbar options={options}/>
            <div className="content">
                <RegisterForm/>
            </div>
        </div>
    );
}


export default Register;
