import React, {useEffect, useState} from 'react';
import {CContainer} from '@coreui/react';
import Cookies from 'universal-cookie';
import CustomNavbar from '../components/CustomNavbar.jsx';
import Fetching from '../API/Fetching.js';
import useFetching from '../hooks/useFetching.js';


function Account()
{
    const cookies = new Cookies();
    const [user, setUser] = useState({username: ''});

    const [getCurrentUser, isLoading, error] = useFetching(async () => 
    {
        const token = cookies.get('token');
        const response = await Fetching.getCurrentUser(token);
        const responseData = await response.data;
        setUser(await responseData);
    });

    useEffect(() => 
    {
        getCurrentUser();
    }, []);

    return (
        <div className="Account">
            <CustomNavbar noProfile/>
            {
                (isLoading && user)
                ? 
                    <p>Загрузка...</p>
                :
                    <CContainer lg style={{marginTop: 20}}>
                        <h1>{user.username}</h1>
                    </CContainer>
            }
        </div>
    )
}


export default Account;
