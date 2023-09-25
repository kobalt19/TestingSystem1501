import React, {useState} from 'react';
import MyNavbar from '../components/MyNavbar.jsx';


const PendingTests = () =>
{
    const options = [{name: 'Тесты', link: '/pending_tests'}, {name: 'Результаты', link: '/results'}];
    return (
        <div className="PendingTests">
            <MyNavbar options={options}/>
        </div>
    );
};

export default PendingTests;
