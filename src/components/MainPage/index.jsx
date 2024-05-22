import React, { useContext, useEffect, useState, useRef } from 'react';


import { Sidebar } from '../sidebar';
import { Navbar } from '../Navbar';

import { CustomizedSnackbar } from '../Shared/Snackbar';
import { GlobalContext } from '../../context/GlobalContext';
import { mainOptions } from '../../constants/mainOptions';

import { useParams } from "react-router-dom";

import './MainPage.css';

function MainPage() {

    const { setActivePage, activeBlur, setActiveBlur } = useContext(GlobalContext)
    const { component } = useParams();

    useEffect(()=>{
        setActiveBlur(false);
    },[])

    const options = [...mainOptions];

    const SnackbarRef = useRef();



    return (
        <div className="main-page">
            <CustomizedSnackbar
                open={SnackbarRef.open}
                severity={SnackbarRef.snackbarType}
                message={SnackbarRef.snackbarMessage}
                handleClose={SnackbarRef.handleClose}
                ref={SnackbarRef}
            />
            <Navbar />
            <div className="content-wrapper">
                <Sidebar
                    mainOptions={mainOptions}
                    onLogoutClick={() => console.log('loggedout')}
                />
                {options.map(
                    option => option.name === component
                        ? <div className={`main-content ${option.name} ${ activeBlur && "blur-class" }`} key={option.name}>{option.component}</div>
                        : null
                )
                }
            </div>
        </div>
    );
}

export { MainPage };