import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { NavbarLogo } from './NavbarLogo';
import { ProfileButton } from './ProfileButton';
import { GlobalContext } from '../../context/GlobalContext';
import imgDefaultUser from '../../assets/images/default_user.png';

import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';

function Navbar() {
    const { anchorEl } = useContext(GlobalContext);


    

    const open = Boolean(anchorEl);

   
    return (
        <React.Fragment>
            <div className='navbar'>
                <div className='left-navbar'>
                    <Link to='/user/User'>
                    <NavbarLogo />
                    </Link>
                </div>
                <div className='right-navbar'>
                   <a>Logout</a>
                </div>
            </div>
        </React.Fragment>
    );
}

export { Navbar };
