import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar.jsx';
import TestService from '../API/TestService.js';
import TestsList from '../components/TestsList.jsx';
import useFetching from '../hooks/useFetching.js';


const PendingTests = () =>
{
    const options = [{name: 'Тесты', link: '/pending_tests'}, {name: 'Результаты', link: '/results'}];
    const [tests, setTests] = useState([]);
    const [fetchTests, isLoading, error] = useFetching(async () =>
    {
        const response = await TestService.getPendingPosts();
        setTests([...tests, ...response.data]);
    });
    useEffect(() => fetchTests(), []);
    return (
        <div className="PendingTests">
            <Navbar options={options}/>

        </div>
    ); 
};

export default PendingTests;
