import React, { useContext} from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


import logo from '../../../assets/images/logos/logo-assisttu-petroleum-2.png';
import './NavbarLogo.css';

const MySwal = withReactContent(Swal);

function NavbarLogo() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1";
    const { setActivePage, setToken, token, setEmailGlobal, setIdUserGlobal, setUserName } = useContext(GlobalContext)
    const history = useHistory();

    

    
    

    return (
        <div className='navbar-logo-container'>
            <img
                className='NavbarLogo'
                src={logo}
                alt='Assisttu Logo'
            />
        </div>
    );
}

export { NavbarLogo };
