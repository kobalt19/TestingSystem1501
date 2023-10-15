import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar.jsx';


const PendingTests = () =>
{
    const options = 
    [
        {name: 'Тесты', link: '/pending_tests', active: false, id: 0}, 
        {name: 'Результаты', link: '/results', active: true, id: 1},
    ];
    return (
        <div className="PendingTests">
            <Navbar options={options}/>
        </div>
    ); 
};

export default PendingTests;
