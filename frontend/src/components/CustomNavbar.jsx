import React, {useContext, useEffect, useState} from 'react';
import {CCollapse, CContainer, CNavbar, CNavbarNav, CNavbarBrand, CNavbarToggler, CNavItem, CNavLink} from '@coreui/react';
import Cookies from 'universal-cookie';
import { AuthContext } from '../context';
import Fetching from '../API/Fetching.js';
import useFetching from '../hooks/useFetching.js';


function CustomNavbar()
{
    const cookies = new Cookies();
    const context = useContext(AuthContext);
    const [visible, setVisible] = useState(true);
    const [username, setUsername] = useState('');
    const [loadUsername, isLoading, error] = useFetching(async () => 
    {
        const token = cookies.get('token');
        const response = await Fetching.get_current_user(token);
        const responseData = await response.data;
        setUsername(await responseData.username);
    })
    useEffect(() => 
    {
        loadUsername();
    }, []);
    return (
        <CNavbar colorScheme="dark" expand="lg" style={{backgroundColor: '#404040'}}>
            <CContainer fluid>
                <CNavbarBrand href="/" style={{color: '#ffffff'}}>TestingSystem1501</CNavbarBrand>
                <CNavbarToggler onClick={() => setVisible(!visible)}/>
                <CCollapse className="navbar-collapse" visible={visible}>
                    {
                        username
                        ? 
                        <CNavbarNav className="ms-auto">
                            <CNavItem>
                                <CNavLink href="#" style={{color: '#ffffff'}}>{username}</CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                        :
                        <CNavbarNav className="ms-auto">
                            <CNavItem>
                                <CNavLink href="/register" style={{color: '#ffffff'}}>Регистрация</CNavLink>
                            </CNavItem>
                            <CNavItem>
                                <CNavLink href="/login" style={{color: '#ffffff'}}>Вход</CNavLink>
                            </CNavItem>
                        </CNavbarNav>
                    }
                </CCollapse>
            </CContainer>
        </CNavbar>
    )
}


export default CustomNavbar;
