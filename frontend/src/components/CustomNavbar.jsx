import React, {useState} from 'react';
import {CCollapse, CContainer, CNavbar, CNavbarNav, CNavbarBrand, CNavbarToggler, CNavItem, CNavLink} from '@coreui/react';

function CustomNavbar()
{
    const [visible, setVisible] = useState(true);
    return (
        <CNavbar colorScheme="dark" expand="lg" style={{backgroundColor: '#404040'}}>
            <CContainer fluid>
                <CNavbarBrand href="/" style={{color: '#ffffff'}}>TestingSystem1501</CNavbarBrand>
                <CNavbarToggler onClick={() => setVisible(!visible)}/>
                <CCollapse className="navbar-collapse" visible={visible}>
                    <CNavbarNav className="ms-auto">
                        <CNavItem>
                            <CNavLink href="/register" style={{color: '#ffffff'}}>Регистрация</CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink href="/login" style={{color: '#ffffff'}}>Вход</CNavLink>
                        </CNavItem>
                    </CNavbarNav>
                </CCollapse>
            </CContainer>
        </CNavbar>
    )
}


export default CustomNavbar;
