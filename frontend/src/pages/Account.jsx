import React, {useEffect, useState} from 'react';
import * as CoreUI from '@coreui/react';
import Cookies from 'universal-cookie';
import CustomNavbar from '../components/CustomNavbar.jsx';
import Fetching from '../API/Fetching.js';
import useFetching from '../hooks/useFetching.js';
import TestsList from '../components/TestsList.jsx';


const Account = () =>
{
    const renderComponent = (name) =>
    {
        switch (name)
        {
            case 'pending_tests':
                return <TestsList tests={tests}/>;
            // case 'Results':
            //     return <Results/>
            default:
                return <p>Ошибка</p>
        }
    }

    const [tests, setTests] = useState([]);
    const [component, setComponent] = useState('pending_tests');
    const cookies = new Cookies();
    const [user, setUser] = useState({});

    const handleChange = (event) =>
    {
        event.preventDefault();
        setComponent(event.current.id);
    }

    const [getTests, isLoading2, error2] = useFetching(async () =>
    {
        const token = cookies.get('token');
        const response = await Fetching.getTests(token);
        const responseData = await response.data;
        return responseData.tests;
    })

    const [getCurrentUser, isLoading1, error1] = useFetching(async () => 
    {
        const token = cookies.get('token');
        const response = await Fetching.getCurrentUser(token);
        const responseData = await response.data;
        setUser(await responseData);
    });

    useEffect(() => 
    {
        const doFetch = async () =>
        {
            const _tests = await getTests();
            setTests(await _tests);
        };

        doFetch();
        getCurrentUser();
    }, []);

    if (Object.keys(user).length === 0)
    {
        return (
            <div className="Account">
                <CustomNavbar/>
                {
                    (isLoading1 || isLoading2)
                    ? 
                        <p>Загрузка...</p>
                    :
                    <CoreUI.CContainer style={{marginTop: '5%', marginBottom: '5%'}} lg>
                        <CoreUI.CAlert color="danger">
                            Авторизуйтесь, чтобы посмотреть информацию своего аккаунта!
                        </CoreUI.CAlert>
                    </CoreUI.CContainer>
                }
            </div>
        )
    }

    return (
        <div className="Account">
            <CustomNavbar noProfile/>
            {
                (isLoading1 || isLoading2)
                ? 
                    <p>Загрузка...</p>
                :
                    <CoreUI.CContainer lg>
                        <h1 style={{marginTop: '5%', marginBottom: '5%'}}>{user.username}</h1>
                        <CoreUI.CNav>
                            <CoreUI.CNavItem>
                                <CoreUI.CNavLink onClick={handleChange} id="pending_tests">
                                    Открытые тесты
                                </CoreUI.CNavLink>
                            </CoreUI.CNavItem>
                            <CoreUI.CNavItem>
                                <CoreUI.CNavLink onClick={handleChange} id="results">
                                    Результаты тестов
                                </CoreUI.CNavLink>
                            </CoreUI.CNavItem>
                        </CoreUI.CNav>
                        {
                            renderComponent(component)
                        }
                    </CoreUI.CContainer>
            }
        </div>
    )
}


export default Account;
